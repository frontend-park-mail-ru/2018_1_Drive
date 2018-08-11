import {BaseComponent} from '../../../blocks/baseComponent';
import {events} from './events';
import {GameCore} from './index';
import * as busSingleton from '../../bus';
import {Timer} from './timer';
import GameSettings from '../game-settings';
import {ClickManager} from '../../clickManager';
import {ProgressBar} from './ProgressBar';
import {Popup} from '../../../blocks/popup/popup';


//обрезанная версия для offline игры
const questionsSet = {
    'CSS': {
        questions: ['Как выбрать четные элементы списка в nth-of-type?',
            'Как совместить в одном выражении разные единицы(px и % например)',
            'Как выбрать все div одним селектором?'],
        answers: [['2i', '2n', '2j+1', '2i+1'],
            ['add()', 'eval()', 'apply()', 'calc()'],
            ['div', ':div', '.div', 'all:div']],
        correctAnswers: ['2n', 'calc()', 'div']
    },
    'JAVA': {
        questions: ['Сколько ключевых слов в Java?',
            'Какой метод не принадлежит классу Object?',
            'Сколько примитивов в Java'],
        answers: [['20', '30', '50', '37'],
            ['toString()', 'final()', 'notifyAll()', 'wait()'],
            ['6', '7', '8', '9']],
        correctAnswers: ['50', 'final()', '8']
    },
    'JS': {
        questions: ['let obj = {"0":1, 0:2}; \nalert(obj["0"]+obj[0]);',
            'for (let k in {1:0, 0:0}) \n{ alert(key); }',
            'Огурец стоит 1.15, помидор 2.30. Сколько стоит салат с точки зрения JS?'],
        answers: [['2', '3', '4', '12'],
            ['0, затем 1', '1, затем 0', 'В коде ошибка', 'Зависит от браузера'],
            ['345', '3.45', '3.43', 'Другой ответ']],
        correctAnswers: ['4', '0, затем 1', 'Другой ответ']
    },
    'SQL': {
        questions: ['Какого вида JOIN нет в SQL?',
            'Для какого типа данных недопустимо использовать SUM()?',
            'Назовите аббревиатуру команд определения структур данных'],
        answers: [['CROSS', 'FULL', 'OUTER', 'CONFLUX'],
            ['bit', 'double', 'tinyint', 'money'],
            ['DML', 'DDL', 'TCL', 'DCL']],
        correctAnswers: ['CONFLUX', 'bit', 'DDL']
    }
};


export class OfflineGame extends GameCore {//SET IS A THREE ROUNDS AND ROUND IS THREE QUESTIONS
    constructor() {
        super();
        this.bus = busSingleton.getInstance();
        this.themeBlock = new BaseComponent(document.querySelector('.js-themes'));
        this.questionsBlock = new BaseComponent(document.querySelector('.js-questions'));

        this.progressBar = new ProgressBar(document.querySelector('.progress-bar__inside'));
        this.clickManager = new ClickManager(document.querySelector('.main.game-main'));

        this.question = document.querySelector('.js-main-question');
        this.answerButtons = document.querySelectorAll('.js-answer-button');
        this.themeButtons = document.querySelectorAll('.js-theme-button');

        this.headerOpponent = document.querySelector('.header__opponent');
        this.headerOpponent.innerHTML = 'Singleplayer';
        this.headerRound = document.querySelector('.header__round');
        this.headerTheme = document.querySelector('.header__theme');
        this.headerHyphen = document.querySelector('.header__hyphen');

        this.resultPopup = new Popup(document.querySelector('.game-popup'), document.querySelector('.game-popup__inner'));
        this.endButton = document.querySelector('.js-end-game');
        this.againButton = document.querySelector('.js-again-button');

        this.timerDiv = document.querySelector('.header__timer');
        this.infoDiv = document.querySelector('.header__waiting-block');
        this.roundTime = GameSettings.roundTime;
        this.timer = this.initTimer(this.timerDiv, this.infoDiv);

        this.questionsBlock.hide();
        this.themeBlock.hide();

        this.againButton.addEventListener('click', () => {
            this.progressBar.setToZero();
            this.questionsBlock.hide();
            this.bus.emit(events.START_GAME);
            this.resultPopup.closePopup();
        });
        this.endButton.addEventListener('click', () => {
            this.bus.emit(events.FINISH_GAME);
            this.questionsBlock.hide();
            this.resultPopup.closePopup();
            this.bus.emit(events.START_GAME);
        });

        for (let answerButton of this.answerButtons) {
            answerButton.addEventListener('click', () => {
                this.bus.emit(events.ANSWER_SELECTED, answerButton.innerHTML);
            });
        }
        for (let themeButton of this.themeButtons) {
            themeButton.addEventListener('click', () => {
                this.bus.emit(events.THEME_SELECTED, themeButton.innerHTML);
            });
        }
        this.state = {};
    }

    initTimer(timerDiv, infoDiv) {
        const onStart = () => {
            timerDiv.innerHTML = `${this.roundTime}\'\'`;
            infoDiv.innerHTML = 'Time left';
        };
        const onEnd = () => {
            //this.bus.emit(events['TIME_OVER']);
        };
        return new Timer(timerDiv, onStart, onEnd);
    }

    start() {
        super.start();
        this.state = {
            theme: {},
            answers: [],
            sets: [],
            currentRound: 1,
            currentTheme: ''
        };
        this.headerRound.innerHTML = 'Choose theme';
        this.headerHyphen.innerHTML = '';
        this.headerTheme.innerHTML = '';
        this.bus.emit(events.START_GAME);
    }

    onGameStarted(evt) {
        this.state = {
            theme: {},
            answers: [],
            sets: [],
            currentRound: 1,
            questionInSet: 0
        };
        this.headerRound.innerHTML = 'Choose theme';
        this.headerHyphen.innerHTML = '';
        this.headerTheme.innerHTML = '';
        this.themeBlock.show();
        this.progressBar.setToZero();
    }

    onSetStarted(evt) {
        this.state = {};
        this.bus.emit(events.ROUND_STARTED);
    }

    onRoundStarted(evt) {
        this.state.answers = [];
        this.progressBar.setToZero();
        this.state.correctAnswersInRound = 0;
        this.headerRound.innerHTML = 'Choose theme';
        this.headerHyphen.innerHTML = '';
        this.headerTheme.innerHTML = '';
        this.themeBlock.show();
    }

    onThemeSelected(evt) {
        this.state.theme = evt;
        this.state.currentTheme = evt;
        this.themeBlock.hide();
        this.questionsBlock.show();
        this.progressBar.setToFirst();
        this.headerTheme.innerHTML = evt;
        this.headerHyphen.innerHTML = '-';
        this.headerRound.innerHTML = `Round ${this.state.currentRound}/${GameSettings.numberOfSets}`;
        //TODO: method requestSet(theme) -> question_set
        this.bus.emit(events.GAME_STATE_CHANGED, this.state);
    }

    onTimeOver(evt){
        this.onAnswerSelected(-1);
    }

    onGameStateChanged(evt) {
        let i = this.state.answers.length;
        if (i === GameSettings.numberOfSets) {
            this.timer.stop();
            this.clickManager.turnOnClicks();
            this.state.questionInSet = 0;
            this.bus.emit(events.ROUND_FINISHED);
        } else {
            this.timer.start(this.roundTime);
            this.question.innerHTML = questionsSet[this.state.currentTheme].questions[i];
            let j = 0;
            for (let answerButton of this.answerButtons) {
                answerButton.innerHTML = questionsSet[this.state.currentTheme].answers[i][j];
                j++;
            }
            this.state.questionInSet++;
            this.clickManager.turnOnClicks();
        }
    }

    async onAnswerSelected(evt) {
        this.state.answers.push(evt);
        this.timer.stop();
        this.progressBar.update();
        this.clickManager.turnOffCLicks();
        let answers = {
            myAnswer: evt,
            correctAnswer: questionsSet[this.state.currentTheme].correctAnswers[this.state.questionInSet - 1]
        };

        await this.resolveAfterXSeconds(1500, answers);
        this.takeOffAnimation();
        this.bus.emit(events.GAME_STATE_CHANGED);
    }

    resolveAfterXSeconds(x, answers) {
        this.animateAnswers(answers);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, x);
        });
    }

    animateAnswers(answers) {
        for (let answerButton of this.answerButtons) {
            if (answerButton.innerHTML === answers.correctAnswer) {
                answerButton.classList.add('correct-answer');
            }
            if (answerButton.innerHTML === answers.myAnswer && (answers.myAnswer !== answers.correctAnswer)) {
                answerButton.classList.add('wrong-answer');
            }
        }
    }

    takeOffAnimation() {
        for (let answerButton of this.answerButtons) {
            if (answerButton.classList.contains('correct-answer')) {
                answerButton.classList.remove('correct-answer');
            }
            if (answerButton.classList.contains('wrong-answer')) {
                answerButton.classList.remove('wrong-answer');
            }
            if (answerButton.classList.contains('scale-animation')) {
                answerButton.removeChild(answerButton.firstChild);
            }
        }
    }

    onRoundFinished(evt) {
        this.timerDiv.innerHTML = '';
        this.infoDiv.innerHTML = '';
        let result = 0;
        for (let answer in this.state.answers) {
            if (this.state.answers[answer] === questionsSet[this.state.currentTheme].correctAnswers[answer]) {
                result++;
            }
        }
        this.state.sets.push(result > 1);
        if (this.state.sets.length === GameSettings.numberOfSets) {
            this.bus.emit(events.SET_FINISHED);
        } else {
            this.questionsBlock.hide();
            this.state.currentRound++;
            this.bus.emit(events.ROUND_STARTED);
        }
    }

    onSetFinished(evt) {
        let result = this.state.sets.reduce(function (count, value) {
            return count + (value === true);
        }, 0);
        this.resultPopup.inner.querySelector('.game-popup__result').innerHTML = 'Your result is ' + result + ' / 3';
        this.resultPopup.openPopup();
    }

    onGameFinished(evt) {
        this.bus.emit('home');
    }

}