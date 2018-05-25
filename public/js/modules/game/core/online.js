import {BaseComponent} from '../../../blocks/baseComponent';
import {events} from './events';
import {GameCore} from './index';
import * as busSingleton from '../../bus';
import {Timer} from './timer';
import GameSettings from '../game-settings';
import GameHttp from '../game-http';


let questionsAndAnswers = {};

export class OnlineGame extends GameCore {
    constructor() {
        super();
        this.bus = busSingleton.getInstance();

        this.themeMenu = new BaseComponent(document.querySelector('.themes'));
        this.questionMenu = new BaseComponent(document.querySelector('.questions'));
        this.resultMenu = new BaseComponent(document.querySelector('.result'));

        this.question = document.querySelector('.question_block');
        this.answerButtons = document.querySelectorAll('.answers_js');
        this.themeButtons = document.querySelectorAll('.themes_js');
        this.resultButton = document.querySelector('.result_js');
        this.endButton = document.querySelector('.endGame_js');
        this.againButton = document.querySelector('.again_js');
        this.timer = new Timer(document.querySelector('canvas'));

        this.questionMenu.hide();
        this.themeMenu.hide();
        this.resultMenu.hide();

        this.againButton.addEventListener('click', () => {
            this.bus.emit(events.START_GAME);
        });
        this.endButton.addEventListener('click', () => {
            this.bus.emit(events.FINISH_GAME);
        });

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
        this.gameloop = this.gameloop.bind(this);
        this.gameloopRequestId = null;
        this.lastFrame = 0;
    }

    start() {//initial state здесь надо отрисовать менюшку и скрытые вопросы
        super.start();
        //в answers храним нули и единицы
        this.state = {
            theme: {},
            answers: [],
            currentRound: 1,
            currentQuestionNum: 0
        };
        this.bus.emit(events.START_GAME);
        //setTimeout(function () {
        //    bus.emit(events.START_GAME, this.state);
        //}.bind(this));
    }

    gameloop(now) {
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onGameStarted(evt) {
        this.state = {
            theme: {},
            answers: [],
            currentRound: 1,
            currentQuestionNum: 0,
            correctAnswersInRound: 0
        };
        this.resultMenu.hide();
        this.themeMenu.show();
        this.lastFrame = performance.now();
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onSetStarted(evt) {
        this.state.answers = [];
        this.bus.emit(events.ROUND_STARTED);
    }

    onRoundStarted(evt) {
        this.state.correctAnswersInRound = 0;
        this.themeMenu.show();
    }

    async onThemeSelected(evt) {
        await GameHttp.getSet(GameSettings.questionsInRound, evt)
            .then(response => questionsAndAnswers = response)
            .catch(err => {
                console.log(err);
                //todo перекидывать на страницу ошибки
            });

        this.state.theme = evt;
        this.themeMenu.hide();
        this.questionMenu.show();
        //TODO: method requestSet(theme) -> question_set
        this.state.currentQuestionNum = 0;
        this.bus.emit(events.GAME_STATE_CHANGED, this.state);
    }

    onTimeOver(evt){
        this.state.answers.push(0);
        this.state.currentQuestionNum++;
        this.bus.emit(events.GAME_STATE_CHANGED);
    }

    onGameStateChanged(evt) {
        let i = this.state.currentQuestionNum;
        if (i === GameSettings.numberOfSets) {
            this.timer.stop();
            this.bus.emit(events.ROUND_FINISHED);
        } else {
            this.timer.start((new Date).getTime());
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
        await GameHttp.checkAnswer(this.state.questionId, buttonNum)
            .then((response) => {
                if (response.correct === true) {
                    console.log('Correct answer!');
                    this.state.answers.push(1);
                    this.state.correctAnswersInRound++;
                } else if (response.correct === false) {
                    console.log('Wrong answer!');
                    this.state.answers.push(0);
                } else {
                    console.log('Wtf');
                    //todo перекидывать на страницу ошибки
                }
            })
            .catch((error) => console.log(error));
        this.state.currentQuestionNum++;
        this.bus.emit(events.GAME_STATE_CHANGED);
    }

    onRoundFinished(evt) {
        this.questionMenu.hide();
        if (this.state.currentRound === GameSettings.numberOfSets) {
            this.bus.emit(events.SET_FINISHED);
        } else {
            this.state.currentRound++;
            this.bus.emit(events.ROUND_STARTED);
        }
    }

    onSetFinished(evt) {
        this.resultMenu.show();
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
        this.resultButton.innerHTML = 'Your result is ' + result + ' / 3';
    }

    onGameFinished(evt) {
        cancelAnimationFrame(this.gameloopRequestId);
        this.bus.emit('home');
    }

}