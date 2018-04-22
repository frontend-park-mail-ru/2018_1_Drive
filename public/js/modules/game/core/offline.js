import {BaseComponent} from '../../../blocks/baseComponent';
import {events} from './events';
import {GameCore} from './index';
import * as busSingleton from '../../bus';
import {Timer} from './timer';

const question_set = [
    'Как выбрать четные элементы списка в nth-of-type?', ['2i', '2n', '2j+1', '2i+1'],
    'Как совместить в одном выражении разные единицы(px и % например)', ['add()', 'eval()', 'apply()', 'calc()'],
    'Как выбрать все div одним селектором?', ['div', ':div', '.div', 'all:div'],
];
const answer_set = ['2n', 'calc()', 'div!'];

export class OfflineGame extends GameCore {
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
        this.gameloop = this.gameloop.bind(this);
        this.gameloopRequestId = null;
        this.lastFrame = 0;
    }

    start() {//initial state здесь надо отрисовать менюшку и скрытые вопросы
        super.start();
        this.state = {
            theme: {},
            answers: [],
            sets: []
        };
        this.bus.emit(events.START_GAME);
        //setTimeout(function () {
        //    bus.emit(events.START_GAME, this.state);
        //}.bind(this));
    }

    gameloop(now) {//main cycle we need it only for timer

        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onGameStarted(evt) {
        this.state = {
            theme: {},
            answers: [],
            sets: []
        };
        this.resultMenu.hide();
        this.themeMenu.show();
        this.lastFrame = performance.now();
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onSetStarted(evt) {
        this.state = {};
        this.bus.emit(events.ROUND_STARTED);
    }

    onRoundStarted(evt) {
        this.state.answers = [];
        this.themeMenu.show();
    }

    onThemeSelected(evt) {
        this.state.theme = evt;
        this.themeMenu.hide();
        this.questionMenu.show();
        //TODO: method requestSet(theme) -> question_set
        this.bus.emit(events.GAME_STATE_CHANGED, this.state);
    }

    onTimeOver(evt){
        console.log(this);
        this.state.answers.push('');
        this.bus.emit(events.GAME_STATE_CHANGED);
    }

    onGameStateChanged(evt) {
        let i = this.state.answers.length;
        if (i === 3) {
            this.timer.stop();
            this.bus.emit(events.ROUND_FINISHED);
        } else {
            //запуск таймера
            this.timer.start((new Date).getTime());
            this.question.innerHTML = question_set[2 * i];
            let j = 0;
            for (let answerButton of this.answerButtons) {
                answerButton.innerHTML = question_set[2 * i + 1][j];
                j++;
            }
        }
    }

    onAnswerSelected(evt) {
        this.state.answers.push(evt);
        this.bus.emit(events.GAME_STATE_CHANGED);
    }

    onRoundFinished(evt) {
        this.questionMenu.hide();
        let result = 0;
        for (let answer in this.state.answers) {
            if (this.state.answers[answer] === answer_set[answer]) {
                result++;
            }
        }

        this.state.sets.push(result > 1);
        if (this.state.sets.length === 3) {
            this.bus.emit(events.SET_FINISHED);
        } else {
            this.bus.emit(events.ROUND_STARTED);
        }
    }

    onSetFinished(evt) {
        this.resultMenu.show();
        let result = 0;
        result = this.state.sets.reduce(function (count, value) {
            return count + (value === true);
        }, 0);
        this.resultButton.innerHTML = 'your result is' + result + '/3';

    }

    onGameFinished(evt) {

        cancelAnimationFrame(this.gameloopRequestId);
        this.bus.emit('home');
    }

}