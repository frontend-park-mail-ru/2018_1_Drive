import {multiPlayerEvents} from './events';
import {BaseComponent} from '../../../blocks/baseComponent';
import {Timer} from '../core/timer';
import GameSettings from '../game-settings';
import * as busSingleton from '../../bus';
import {MultiplayerCore} from './multiplayerCore';


let questionsAndAnswers = {};

export class MultiplayerGame extends MultiplayerCore {
    constructor(element, ws) {
        super();
        this.bus = busSingleton.getInstance();
        this.ws = ws;

        this.themeMenu = new BaseComponent(element.querySelector('.themes'));
        this.questionMenu = new BaseComponent(element.querySelector('.questions'));
        this.resultMenu = new BaseComponent(element.querySelector('.result'));

        this.question = element.querySelector('.question_block');
        this.answerButtons = element.querySelectorAll('.answers_js');
        this.themeButtons = element.querySelectorAll('.themes_js');
        this.resultButton = element.querySelector('.result_js');
        this.endButton = element.querySelector('.endGame_js');
        this.againButton = element.querySelector('.again_js');
        this.timer = new Timer(element.querySelector('canvas'), 'EVENTS_TIME_OVER');

        this.questionMenu.hide();
        this.themeMenu.hide();
        this.resultMenu.hide();

        this.againButton.addEventListener('click', () => {
            this.bus.emit(multiPlayerEvents.START_GAME);
        });
        this.endButton.addEventListener('click', () => {
            this.bus.emit(multiPlayerEvents.FINISH_GAME);
        });

        let buttonNum = 1;
        for (let answerButton of this.answerButtons) {
            answerButton.buttonNum = buttonNum;
            answerButton.addEventListener('click', () => {
                this.bus.emit(multiPlayerEvents.EVENTS_ANSWER_SELECTED, answerButton.num);
            });
            buttonNum++;
        }
        for (let themeButton of this.themeButtons) {
            themeButton.addEventListener('click', () => {
                this.bus.emit(multiPlayerEvents.EVENTS_THEME_SELECTED, themeButton.innerHTML);
            });
        }

        this.gameloop = this.gameloop.bind(this);
        this.gameloopRequestId = null;
        this.lastFrame = 0;
    }

    start(payload) {
        super.start();
        //в answers храним нули и единицы
        this.state = {
            currentQuestionNum: 0
        };
        this.userId = payload.userId;
        this.bus.emit(multiPlayerEvents.REAL_GAME_START);
    }

    gameloop(now) {//main cycle we need it only for timer
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onGameStarted() {
        this.state = {
            currentQuestionNum: 0
        };
        this.resultMenu.hide();
        this.themeMenu.show();
        this.lastFrame = performance.now();
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onEventsSetStarted(response) {
        console.log('On events set selected()');
        //todo Берем первого
        questionsAndAnswers = response.questions;
        this.themeMenu.hide();
        this.questionMenu.show();
        this.state.currentQuestionNum = 0;
        this.bus.emit(multiPlayerEvents.EVENTS_GAME_STATE_CHANGED);
    }

    onGameStateChanged() {
        let i = this.state.currentQuestionNum;
        if (i % GameSettings.numberOfSets === 0) {
            this.timer.stop();
            this.bus.emit(multiPlayerEvents.EVENTS_ROUND_FINISHED);
        } else {
            this.timer.start((new Date).getTime());
            this.question.innerHTML = questionsAndAnswers[i].question.question;
            let j = 0;
            for (let answerButton of this.answerButtons) {
                answerButton.innerHTML = questionsAndAnswers[i].answers[j].answer;
                answerButton.num = questionsAndAnswers[i].answers[j].answerNum;
                j++;
            }
            this.state.currentQuestionNum++;
        }
    }

    onSetStarted(evt) {

    }

    onRoundStarted(evt) {

    }

    onThemeSelected(evt) {
        this.ws.send('EVENTS_THEME_SELECTED', evt);
    }

    onTimeOver(evt) {
        console.log('time over');
        this.ws.send('EVENTS_NEW_ANSWER', 0);
    }

    onAnswerSelected(buttonNum) {
        this.ws.send('EVENTS_NEW_ANSWER', buttonNum);
        this.timer.stop();
    }

    onAnswerChecked(payload) {
        let answer, opponentAnswer;
        if (this.userId === payload.userId1) {
            answer = payload.userId1Answer;
            opponentAnswer = payload.userId2Answer;
        } else {
            answer = payload.userId2Answer;
            opponentAnswer = payload.userId1Answer;
        }

        if (answer === payload.correctAnswer) {
            console.log('Your answer ' + answer + ' is correct!');
        } else {
            console.log('Your answer ' + answer + ' is wrong ;(');
        }

        if (opponentAnswer === payload.correctAnswer) {
            console.log('Opponent answer ' + opponentAnswer + ' is correct ;(');
        } else {
            console.log('Opponent answer ' + opponentAnswer + ' is wrong!');
        }
        this.bus.emit(multiPlayerEvents.EVENTS_GAME_STATE_CHANGED);
    }

    onRoundFinished(evt) {
        let i = this.state.currentQuestionNum;
        if (this.state.currentQuestionNum === GameSettings.questionsInRound * GameSettings.numberOfSets) {
            this.bus.emit(multiPlayerEvents.EVENTS_SET_FINISHED);
        } else {
            //todo писать о раунде
            this.timer.start((new Date).getTime());
            this.question.innerHTML = questionsAndAnswers[i].question.question;
            let j = 0;
            for (let answerButton of this.answerButtons) {
                answerButton.innerHTML = questionsAndAnswers[i].answers[j].answer;
                answerButton.num = questionsAndAnswers[i].answers[j].answerNum;
                j++;
            }
            this.state.currentQuestionNum++;
        }
    }

    onSetFinished(evt) {
       this.ws.send('EVENTS_NEED_RESULT', null);
    }

    onGameFinished(payload) {
        let yourResult = this.userId === payload.userId1 ? payload.userId1Result : payload.userId2Result;
        let opponentResult = this.userId === payload.userId1 ? payload.userId2Result : payload.userId1Result;

        this.questionMenu.hide();
        this.resultMenu.show();

        if (yourResult > opponentResult) {
            this.resultButton.innerHTML = 'Your win! Result: ' + yourResult + ' / ' + GameSettings.questionsInRound * GameSettings.numberOfSets;
        } else if (yourResult < opponentResult) {
            this.resultButton.innerHTML = 'Your lose! Result: ' + yourResult + ' / ' + GameSettings.questionsInRound * GameSettings.numberOfSets;
        } else {
            this.resultButton.innerHTML = 'Draw! Result: ' + yourResult + ' / ' + GameSettings.questionsInRound * GameSettings.numberOfSets;
        }
    }

}
