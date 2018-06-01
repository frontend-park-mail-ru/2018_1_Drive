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

        this.gameProgressBar = element.querySelector('.progress-theme_js');
        this.roundProgressBar  = element.querySelector('.progress-question_js');

        this.question = element.querySelector('.question_block');
        this.answerButtons = element.querySelectorAll('.answers_js');
        this.themeButtons = element.querySelectorAll('.themes_js');
        this.resultButton = element.querySelector('.center-block');
        this.endButton = element.querySelector('.endGame_js');
        this.againButton = element.querySelector('.again_js');
        this.timer = new Timer(element.querySelector('canvas'), 'EVENTS_TIME_OVER');

        this.questionMenu.hide();
        this.themeMenu.hide();
        this.resultMenu.hide();

        this.againButton.addEventListener('click', () => {
            this.bus.emit(multiPlayerEvents.RESTART_GAME);
        });
        this.endButton.addEventListener('click', () => {
            this.bus.emit(multiPlayerEvents.EVENTS_HOME);
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
        this.state = {
            currentQuestionNum: 0
        };
        this.userId = payload.userId;
        this.opponentLogin = payload.opponentLogin;
        this.bus.emit(multiPlayerEvents.REAL_GAME_START);
    }

    gameloop(now) {//main cycle we need it only for timer
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onGameStarted() {
        this.gameProgressBar.style.left = '-100%';
        this.roundProgressBar.style.left = '-1000%';
        this.state = {
            currentQuestionNum: 0
        };
        this.resultMenu.hide();
        this.themeMenu.show();
        this.lastFrame = performance.now();
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onEventsSetStarted(response) {
        questionsAndAnswers = response.questions;
        this.themeMenu.hide();
        this.questionMenu.show();
        this.state.currentQuestionNum = 0;
        this.bus.emit(multiPlayerEvents.EVENTS_GAME_STATE_CHANGED);
    }

    onGameStateChanged() {
        let i = this.state.currentQuestionNum;
        let pb =  (- 100 + 33 * (this.state.currentQuestionNum % 3)) + '%';
        this.roundProgressBar.style.left = pb;
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

    async onAnswerChecked(payload) {
        let answer, opponentAnswer;

        if (this.userId === payload.userId1) {
            answer = payload.userId1Answer;
            opponentAnswer = payload.userId2Answer;
        } else {
            answer = payload.userId2Answer;
            opponentAnswer = payload.userId1Answer;
        }

        const answers = {
            myAnswer: answer,
            opponentAnswer: opponentAnswer,
            correctAnswer: payload.correctAnswer
        };

        await this.resolveAfterXSeconds(1800, answers);
        this.takeOffAnimation();
        this.bus.emit(multiPlayerEvents.EVENTS_GAME_STATE_CHANGED);
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
                answerButton.classList.add('animation-green');
            }
            if (answerButton.buttonNum === answers.myAnswer && (answers.myAnswer !== answers.correctAnswer)) {
                answerButton.classList.add('animation-red');
            }
            if (answerButton.buttonNum === answers.opponentAnswer) {
                let blockWithName = document.createElement('div');
                blockWithName.innerHTML = this.opponentLogin;
                blockWithName.classList.add('scale-animation');
                answerButton.appendChild(blockWithName);
            }
        }
    }

    takeOffAnimation() {
        for (let answerButton of this.answerButtons) {
            if (answerButton.classList.contains('animation-green')) {
                answerButton.classList.remove('animation-green');
            }
            if (answerButton.classList.contains('animation-red')) {
                answerButton.classList.remove('animation-red');
            }
            if (answerButton.classList.contains('scale-animation')) {
                answerButton.removeChild(answerButton.firstChild);
            }
        }
    }

    onRoundFinished(evt) {

        let i = this.state.currentQuestionNum;
        if (this.state.currentQuestionNum === GameSettings.questionsInRound * GameSettings.numberOfSets) {
            this.bus.emit(multiPlayerEvents.EVENTS_SET_FINISHED);
        } else {
            let pb =  (- 100 + 33 * (this.state.currentQuestionNum / 3)) + '%';
            this.gameProgressBar.style.left = pb;
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

    onHome() {
        cancelAnimationFrame(this.gameloopRequestId);
        this.bus.emit('home');
    }

    onRestart() {
        this.ws.close();
        this.bus.emit('restart-game');
    }
}
