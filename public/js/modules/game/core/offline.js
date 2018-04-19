import {BaseComponent} from '../../../blocks/baseComponent';
import {events} from './events';
import {GameCore} from './index';
import * as busSingleton from '../../bus';

const question_set = [
    'Первый вопрос. Вы готовы ответить?', ['1', 'да', '4', '3'],
    'Второй вопрос. Вы ответите правильно?', ['1', 'да', '4', '3'],
    'Третий вопрос. Насколько мы готовы к рк?', ['не очень', 'совсем нет', 'более чем нет', 'это здец!'],
    'Четвертый вопрос?', ['40', '41', '42', '34'],
    'Последний вопрос. У меня закончилась фантазия?', ['определенно', '2', '3', '4']
];
const answer_set = ['да', 'да', 'это здец!', '42', 'определенно'];
export class OfflineGame extends GameCore {
    constructor() {
        super();
        this.bus = busSingleton.getInstance();

        this.themeMenu = new BaseComponent(document.querySelector('.themes'));
        this.questionMenu = new BaseComponent(document.querySelector('.questions'));

        this.question = document.querySelector('.question_block');
        this.answerButtons = document.querySelectorAll('.answers_js');
        this.themeButtons = document.querySelectorAll('.themes_js');
        this.resultButton = document.querySelector('.rezult_js');
        this.endButton = document.querySelector('.endGame_js');

        this.questionMenu.hide();
        this.themeMenu.hide();

        this.endButton.addEventListener('click', () => {
            this.endButton.setAttribute('style', 'display:none');
            this.resultButton.setAttribute('style', 'display:none');
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
        this.gameloop = this.gameloop.bind(this);
        this.gameloopRequestId = null;
        this.lastFrame = 0;
    }

    start() {//initial state здесь надо отрисовать менюшку и скрытые вопросы
        super.start();
        this.state = {
            theme: {},
            answers: [],
            sets:[]
        };
        this.bus.emit(events.START_GAME);
        //setTimeout(function () {
        //    bus.emit(events.START_GAME, this.state);
        //}.bind(this));
    }


    gameloop(now) {//main cycle we need it only for timer
        //изменение состояния
        //bus.emit(events.GAME_STATE_CHANGED, this.state);
        //конец игры

        if (this.state.answers.length === 5) {
            setTimeout(function () {
                this.bus.emit(events.FINISH_GAME);
            }.bind(this));
        }

        //this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }//eof(gameloop)

    onAnswerSelected(evt) { //здесь надо запрашивать следующий сет вопросов и реквестировать перерисовку
        this.state.answers.push(evt);
        this.bus.emit(events.GAME_STATE_CHANGED);
    }

    onThemeSelected(evt) { //здесь надо запрашивать давать первый сет вопросов и реквестировать перерисовку
        this.state.theme = evt;
        this.themeMenu.hide();
        this.questionMenu.show();
        //TODO: method requestSet(theme) -> question_set
        this.bus.emit(events.GAME_STATE_CHANGED, this.state);
    }

    onGameStarted(evt) {
        this.themeMenu.show();
        this.lastFrame = performance.now();
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }

    onGameFinished(evt) {
        cancelAnimationFrame(this.gameloopRequestId);

    }

    onGameStateChanged(evt) {//здесь реквестируется перерисовка и надо выводить вопросы
        let i = this.state.answers.length;
        if(i === 3){
            this.bus.emit(events.ROUND_FINISHED);
        }else {
            this.question.innerHTML = question_set[2 * i];
            let j = 0;
            for (let answerButton of this.answerButtons) {
                answerButton.innerHTML = question_set[2 * i + 1][j];
                j++;
            }
        }
        //this.scene.setState(evt);
    }
    onSetStarted(evt){
        this.state = {};
        this.bus.emit(events.ROUND_STARTED);
    }
    onSetFinished(evt){
        this.endButton.setAttribute('style','display:block');
        this.resultButton.setAttribute('style','display:block');
        let result = 0;
        result = this.state.sets.reduce(function(count, value) {
            return count + (value === true);
        }, 0);
        this.resultButton.innerHTML = 'your result is' + result + '/3';

    }
    onRoundStarted(evt) {
        this.state.answers = [];
        this.themeMenu.show();
    }


    onRoundFinished(evt){
        //this.themeMenu.setAttribute('style', 'display:none');
        this.questionMenu.hide();
        let result = 0;
        for(let answer in this.state.answers){
            if (this.state.answers[answer] === answer_set[answer]){
                result++;
            }
        }

        this.state.sets.push(result > 1);
        if(this.state.sets.length === 3){
            this.bus.emit(events.SET_FINISHED);
        } else {
            this.bus.emit(events.ROUND_STARTED);
        }

        //bus.emit('CLOSE_GAME');
    }
}