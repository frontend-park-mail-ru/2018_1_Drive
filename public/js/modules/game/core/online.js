import {BaseComponent} from '../../../blocks/baseComponent';
import {events} from './events';
import {GameCore} from './index';
import * as busSingleton from '../../bus';
import {Timer} from '../../../modules/game/core/timer';
import GameSettings from '../game-settings';
import GameHttp from '../game-http';
import {multiPlayerEvents} from '../multiplayer/events';


let questionsAndAnswers = {};

export class OnlineGame extends GameCore {
    constructor() {
        super();
        this.bus = busSingleton.getInstance();
        this.themeBlock = new BaseComponent(document.querySelector('.js-themes'));
        this.questionsBlock = new BaseComponent(document.querySelector('.js-questions'));
        //this.resultMenu = new BaseComponent(document.querySelector('.result'));
        //this.gameProgressBar = document.querySelector('.progress-theme_js');
        //this.roundProgressBar  = document.querySelector('.progress-question_js');

        this.question = document.querySelector('.js-main-question');
        this.answerButtons = document.querySelectorAll('.js-answer-button');
        this.themeButtons = document.querySelectorAll('.js-theme-button');

        this.headerOpponent = document.querySelector('.header__opponent');
        this.headerOpponent.innerHTML = 'Singleplayer';

        this.headerRound = document.querySelector('.header__round');
        this.headerTheme = document.querySelector('.header__theme');
        this.headerHyphen = document.querySelector('.header__hyphen');

        //this.resultButton = document.querySelector('.center-block-singleplayer');
        //this.endButton = document.querySelector('.endGame_js');
        //this.againButton = document.querySelector('.again_js');
        this.timerDiv = document.querySelector('.header__timer');
        this.infoDiv = document.querySelector('.header__waiting-block');
        this.roundTime = 13;
        this.timer = this.initTimer(this.timerDiv, this.infoDiv);

        this.questionsBlock.hide();
        this.themeBlock.hide();
        // this.resultMenu.hide();

        // this.againButton.addEventListener('click', () => {
        //     this.bus.emit(events.START_GAME);
        // });
        // this.endButton.addEventListener('click', () => {
        //     this.bus.emit(events.FINISH_GAME);
        // });

        let buttonNum = 1;
        for (let answerButton of this.answerButtons) {
            answerButton.buttonNum = buttonNum;
            answerButton.addEventListener('click', () => {
                this.bus.emit(events.ANSWER_SELECTED, answerButton.num);
            });
            buttonNum++;
        }
        for (let themeButton of this.themeButtons) {
            themeButton.addEventListener('click', () => {
                this.bus.emit(events.THEME_SELECTED, themeButton.innerHTML);
            });
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/appCache.js').then(function (registration) {
                console.log('ServiceWorker registration', registration);
            }).catch(function (err) {
                throw new Error('ServiceWorker error: ' + err);
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
        //в answers храним нули и единицы
        this.state = {
            theme: {},
            answers: [],
            currentRound: 1,
            currentQuestionNum: 0
        };
        this.headerRound.innerHTML = 'Choose theme';
        this.headerHyphen.innerHTML = '';
        this.headerTheme.innerHTML = '';
        this.bus.emit(events.START_GAME);
    }


    onGameStarted(evt) {
        // this.gameProgressBar.style.left = '-100%';
        // this.roundProgressBar.style.left = '-100%';
        this.state = {
            theme: {},
            answers: [],
            currentRound: 1,
            currentQuestionNum: 0,
            correctAnswersInRound: 0
        };
        //this.resultMenu.hide();
        this.themeBlock.show();
    }

    onSetStarted(evt) {
        this.state.answers = [];
        this.bus.emit(events.ROUND_STARTED);
    }

    onRoundStarted(evt) {
        //let pb =  (- 100 + 33 * (this.state.answers.length / 3)) + '%';
        //this.gameProgressBar.style.left = pb;
        this.state.correctAnswersInRound = 0;
        this.headerRound.innerHTML = 'Choose theme';
        this.headerHyphen.innerHTML = '';
        this.headerTheme.innerHTML = '';
        this.themeBlock.show();
    }

    async onThemeSelected(evt) {
        await GameHttp.getSet(GameSettings.questionsInRound, evt)
            .then(response => questionsAndAnswers = response)
            .catch(err => {
                console.log(err);
                //todo перекидывать на страницу ошибки
            });

        this.state.theme = evt;
        this.themeBlock.hide();
        this.questionsBlock.show();
        this.state.currentQuestionNum = 0;
        this.headerTheme.innerHTML = evt;
        this.headerHyphen.innerHTML = '-';
        this.headerRound.innerHTML = `Round ${this.state.currentRound}/${GameSettings.numberOfSets}`;
        this.bus.emit(events.GAME_STATE_CHANGED, this.state);
    }

    onTimeOver(evt){
        this.onAnswerSelected(-1);
    }

    onGameStateChanged(evt) {
        //let pb =  (- 100 + 33 * (this.state.answers.length % 3)) + '%';
        //this.roundProgressBar.style.left = pb;
        let i = this.state.currentQuestionNum;
        if (i === GameSettings.numberOfSets) {
            this.timer.stop();
            this.bus.emit(events.ROUND_FINISHED);
        } else {
            this.timer.start(this.roundTime);
            this.question.innerHTML = questionsAndAnswers[i].question.question;
            this.state.questionId = questionsAndAnswers[i].question.id;
            let j = 0;
            for (let answerButton of this.answerButtons) {
                answerButton.innerHTML = questionsAndAnswers[i].answers[j].answer;
                answerButton.num = questionsAndAnswers[i].answers[j].answerNum;
                j++;
            }
        }
    }

    async onAnswerSelected(buttonNum) {
        let answers = {};
        this.timer.stop();
        await GameHttp.checkAnswer(this.state.questionId, buttonNum)
            .then((response) => {
                answers = {
                    myAnswer: buttonNum,
                    correctAnswer: response.correctAnswer
                };
                if (response.correct === true) {
                    this.state.answers.push(1);
                    this.state.correctAnswersInRound++;
                } else if (response.correct === false) {
                    this.state.answers.push(0);
                } else {
                    console.log('Wtf');
                    //todo перекидывать на страницу ошибки
                }
            })
            .catch((error) => console.log(error));

        await this.resolveAfterXSeconds(1500, answers);
        this.takeOffAnimation();
        this.state.currentQuestionNum++;
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
            if (answerButton.buttonNum === answers.correctAnswer) {
                answerButton.classList.add('correct-answer');
            }
            if (answerButton.buttonNum === answers.myAnswer && (answers.myAnswer !== answers.correctAnswer)) {
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
        //this.roundProgressBar.style.left = '-100%';
        this.questionsBlock.hide();

        this.timerDiv.innerHTML = '';
        this.infoDiv.innerHTML = '';

        if (this.state.currentRound === GameSettings.numberOfSets) {
            this.bus.emit(events.SET_FINISHED);
        } else {
            this.state.currentRound++;
            this.bus.emit(events.ROUND_STARTED);
        }
    }

    onSetFinished(evt) {
        //this.resultMenu.show();
        let result  = 0;
        let counter = 0;
        let questionInRound = 1;
        for (let i = 0; i < this.state.answers.length; i++) {
            if (this.state.answers[i] === 1) {
                counter++;
            }
            if (questionInRound === GameSettings.questionsInRound) {
                if (counter > 1) {
                    result++;
                }
                counter = questionInRound = 0;
            }
            questionInRound++;
        }
        //this.resultButton.childNodes[0].innerHTML = 'Your result is ' + result + ' / 3';
    }

    onGameFinished(evt) {
        this.bus.emit('home');
    }

}