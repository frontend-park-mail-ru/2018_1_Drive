import {multiPlayerEvents} from './events';
import {BaseComponent} from '../../../blocks/baseComponent';
import {Timer} from '../core/timer';
import GameSettings from '../game-settings';
import * as busSingleton from '../../bus';
import {MultiplayerCore} from './multiplayerCore';
import {events} from '../core/events';
import {ClickManager} from '../../clickManager';
import {Popup} from '../../../blocks/popup/popup';
import {ProgressBar} from '../core/ProgressBar';
import {UsersModel} from '../../../models/UsersModel';


let questionsAndAnswers = {};

export class MultiplayerGame extends MultiplayerCore {
    constructor(element) {
        super();
        this.bus = busSingleton.getInstance();

        this.themeBlock = new BaseComponent(element.querySelector('.js-themes'));
        this.questionsBlock = new BaseComponent(element.querySelector('.js-questions'));

        this.progressBar = new ProgressBar(element.querySelector('.progress-bar__inside'));
        this.clickManager = new ClickManager(element.querySelector('.main.game-main'));

        this.question = element.querySelector('.js-main-question');
        this.answerButtons = element.querySelectorAll('.js-answer-button');
        this.themeButtons = element.querySelectorAll('.js-theme-button');

        this.headerOpponent = element.querySelector('.header__opponent');
        this.headerOpponent.innerHTML = 'Multiplayer';
        this.headerRound = element.querySelector('.header__round');
        this.headerTheme = element.querySelector('.header__theme');
        this.headerHyphen = element.querySelector('.header__hyphen');

        this.resultPopup = new Popup(element.querySelector('.game-popup'), element.querySelector('.game-popup__inner'));
        this.endButton = element.querySelector('.js-end-game');
        this.againButton = element.querySelector('.js-again-button');

        this.timerDiv = element.querySelector('.header__timer');
        this.infoDiv = element.querySelector('.header__waiting-block');
        this.roundTime = GameSettings.roundTime;
        this.timer = this.initTimer(this.timerDiv, this.infoDiv);

        this.questionsBlock.hide();
        this.themeBlock.hide();

        this.againButton.addEventListener('click', () => {
            this.progressBar.setToZero();
            this.bus.emit(multiPlayerEvents.RESTART_GAME);
            this.takeOffAnimationAnswers();
            this.resultPopup.closePopup();
        });
        this.endButton.addEventListener('click', () => {
            this.bus.emit(events.FINISH_GAME);
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
        return new Timer(timerDiv, onStart, onEnd, 'EVENTS_TIME_OVER');
    }

    start(payload) {
        this.ws = payload.ws;
        if (payload.notAddListners !== true) {
            super.start();
        }
        this.state = {
            currentQuestionNum: 0,
        };
        this.questionsBlock.hide();
        if (this.resultPopup.isOpen) {
            this.resultPopup.closePopup();
        }
        this.userId = payload.userId;
        this.opponentLogin = payload.opponentLogin;
        this.headerRound.innerHTML = 'Choose theme';
        this.headerHyphen.innerHTML = '';
        this.headerTheme.innerHTML = '';

        let opponentId = payload.userId === payload.userId1 ? payload.userId2 : payload.userId1;

        this.state = {
            currentQuestionNum: 0,
            currentThemeNum: 1,
            youFirst: this.userId < opponentId
        };

        this.bus.emit(multiPlayerEvents.REAL_GAME_START);
    }

    onGameStarted(response) {
        this.headerRound.innerHTML = 'Choose theme';
        this.headerHyphen.innerHTML = '';
        this.headerTheme.innerHTML = '';
        this.themeBlock.show();
        this.progressBar.setToZero();
    }

    async onEventsSetStarted(response) {
        questionsAndAnswers = response.questions;
        this.state.currentQuestionNum = 0;
        this.progressBar.setToFirst();
        //хорошо бы, чтобы бэкенд это присылал
        this.state.themes =
            [response.questions[0].question.theme, response.questions[3].question.theme, response.questions[6].question.theme];
        let opponentTheme = this.state.playerTheme;

        if (this.state.themes[0] !== this.state.playerTheme) opponentTheme = this.state.themes[0];
        if (this.state.themes[2] !== this.state.playerTheme) opponentTheme = this.state.themes[2];
        this.infoDiv.innerHTML = '';
        await this.resolveAfterXSeconds(1500, opponentTheme, this.animateTheme.bind(this));
        this.takeOffAnimationThemes(this.textOnThemeButtonBefore);

        this.themeBlock.hide();
        this.questionsBlock.show();
        this.headerTheme.innerHTML = this.state.themes[0];
        this.state.currentThemeNum = 0;
        this.bus.emit(multiPlayerEvents.EVENTS_GAME_STATE_CHANGED);
    }

    onGameStateChanged() {
        let i = this.state.currentQuestionNum;
        if (i % GameSettings.numberOfSets === 0) {
            this.timer.stop();
            this.clickManager.turnOnClicks();
            this.bus.emit(multiPlayerEvents.EVENTS_ROUND_FINISHED);
        } else {
            this.timer.start(this.roundTime);
            this.question.innerHTML = questionsAndAnswers[i].question.question;
            let j = 0;
            for (let answerButton of this.answerButtons) {
                answerButton.innerHTML = questionsAndAnswers[i].answers[j].answer;
                answerButton.num = questionsAndAnswers[i].answers[j].answerNum;
                j++;
            }
            this.state.currentQuestionNum++;
            this.clickManager.turnOnClicks();
        }
    }

    onThemeSelected(evt) {
        this.progressBar.setToFirst();
        this.state.playerTheme = evt.toLowerCase();
        this.infoDiv.innerHTML = 'Waiting opponent';
        this.ws.send('EVENTS_THEME_SELECTED', evt);
    }

    onTimeOver(evt) {
        this.ws.send('EVENTS_NEW_ANSWER', 0);
        this.progressBar.update();
    }

    onAnswerSelected(buttonNum) {
        this.clickManager.turnOffCLicks();
        this.progressBar.update();
        this.timer.stop();
        this.infoDiv.innerHTML = 'Waiting opponent';
        this.ws.send('EVENTS_NEW_ANSWER', buttonNum);
    }

    async onAnswerChecked(payload) {
        this.infoDiv.innerHTML = '';
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
        await this.resolveAfterXSeconds(1500, answers, this.animateAnswers.bind(this));
        this.takeOffAnimationAnswers();
        this.bus.emit(multiPlayerEvents.EVENTS_GAME_STATE_CHANGED);
    }


    resolveAfterXSeconds(x, answers, callback) {
        callback(answers);
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
            if (answerButton.buttonNum === answers.opponentAnswer) {
                answerButton.innerHTML = '';
                let blockWithName = document.createElement('div');
                blockWithName.innerHTML = this.opponentLogin;
                blockWithName.classList.add('scale-animation');
                answerButton.appendChild(blockWithName);
            }
        }
    }

    animateTheme(theme) {
        for (let themeButton of this.themeButtons) {
            if (themeButton.innerHTML.toLowerCase() === theme) {
                this.textOnThemeButtonBefore = themeButton.innerHTML;
                themeButton.innerHTML = '';
                let blockWithName = document.createElement('div');
                blockWithName.innerHTML = this.opponentLogin;
                blockWithName.classList.add('scale-animation');
                themeButton.appendChild(blockWithName);
            }
        }
    }

    takeOffAnimationAnswers() {
        for (let button of this.answerButtons) {
            if (button.classList.contains('correct-answer')) {
                button.classList.remove('correct-answer');
            }
            if (button.classList.contains('wrong-answer')) {
                button.classList.remove('wrong-answer');
            }
        }
    }

    takeOffAnimationThemes(theme) {
        for (let button of this.themeButtons) {
            if (button.childNodes[0].classList && button.childNodes[0].classList.contains('scale-animation')) {
                button.innerHTML = theme;
            }
        }
    }


    onRoundFinished(evt) {
        this.timerDiv.innerHTML = '';
        this.infoDiv.innerHTML = '';
        let i = this.state.currentQuestionNum;
        if (this.state.currentQuestionNum === GameSettings.questionsInRound * GameSettings.numberOfSets) {
            this.bus.emit(multiPlayerEvents.EVENTS_SET_FINISHED);
        } else {
            this.progressBar.setToFirst();
            let pick = '';
            if ((this.state.youFirst && this.state.currentThemeNum === 0) || (!this.state.youFirst && this.state.currentThemeNum === 2)) {
                pick = ' (your pick)';
            } else if ((!this.state.youFirst && this.state.currentThemeNum === 0) || (this.state.youFirst && this.state.currentThemeNum === 2)) {
                pick = ' (opponent pick)';
            } else {
                pick = ' (random pick)';
            }

            this.headerTheme.innerHTML = this.state.themes[this.state.currentThemeNum++] + pick;
            this.headerHyphen.innerHTML = '-';
            this.headerRound.innerHTML = `Round ${this.state.currentThemeNum}/${GameSettings.numberOfSets}`;
            this.timer.start();
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
        const divForResult = this.resultPopup.inner.querySelector('.game-popup__result');

        let winnerLogin = '';
        if (yourResult > opponentResult) {
            divForResult.innerHTML = 'Your win! Result: ' + yourResult + ' / ' + GameSettings.questionsInRound * GameSettings.numberOfSets;
            winnerLogin = UsersModel.getCurrentUser().login;
        } else if (yourResult < opponentResult) {
            divForResult.innerHTML = 'Your lose! Result: ' + yourResult + ' / ' + GameSettings.questionsInRound * GameSettings.numberOfSets;
            winnerLogin = this.opponentLogin;
        } else {
            divForResult.innerHTML = 'Draw! Result: ' + yourResult + ' / ' + GameSettings.questionsInRound * GameSettings.numberOfSets;
        }
        this.resultPopup.openPopup();
        this.bus.emit('update-scoreboard', winnerLogin);
    }

    onHome() {
        this.bus.emit('new-multiplayer-game');
        this.bus.emit('home');
    }

    onRestart() {
        this.bus.emit('new-multiplayer-game');
        this.bus.emit('restart-game');
    }
}
