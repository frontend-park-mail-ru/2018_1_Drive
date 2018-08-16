import {events} from './events';
import * as busSingleton from '../../bus';

export class GameCore {
    constructor() {
        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);
        this.onAnswerSelected = this.onAnswerSelected.bind(this);
        this.onThemeSelected = this.onThemeSelected.bind(this);
        this.onGameStateChanged = this.onGameStateChanged.bind(this);
        this.onSetStarted = this.onSetStarted.bind(this);
        this.onSetFinished = this.onSetFinished.bind(this);
        this.onRoundFinished= this.onRoundFinished.bind(this);
        this.onRoundStarted= this.onRoundStarted.bind(this);
        this.onTimeOver = this.onTimeOver.bind(this);
        this.bus = busSingleton.getInstance();
    }

    start() {
        this.bus.on(events.START_GAME, this.onGameStarted);
        this.bus.on(events.FINISH_GAME, this.onGameFinished);
        this.bus.on(events.SET_STARTED, this.onSetStarted);
        this.bus.on(events.SET_FINISHED, this.onSetFinished);
        this.bus.on(events.ROUND_STARTED, this.onRoundStarted);
        this.bus.on(events.ROUND_FINISHED, this.onRoundFinished);
        this.bus.on(events.ANSWER_SELECTED, this.onAnswerSelected);
        this.bus.on(events.THEME_SELECTED, this.onThemeSelected);
        this.bus.on(events.GAME_STATE_CHANGED, this.onGameStateChanged);

        this.bus.on(events.TIME_OVER, this.onTimeOver);

    }

    destroy() {
        this.bus.off(events.START_GAME, this.onGameStarted);
        this.bus.off(events.FINISH_GAME, this.onGameFinished);
        this.bus.off(events.SET_STARTED, this.onSetStarted);
        this.bus.off(events.SET_FINISHED, this.onSetFinished);
        this.bus.off(events.ROUND_STARTED, this.onRoundStarted);
        this.bus.off(events.ROUND_FINISHED, this.onRoundFinished);
        this.bus.off(events.ANSWER_SELECTED, this.onAnswerSelected);
        this.bus.off(events.THEME_SELECTED, this.onThemeSelected);
        this.bus.off(events.GAME_STATE_CHANGED, this.onGameStateChanged);

        this.bus.on(events.TIME_OVER, this.onTimeOver);
    }


    onTimeOver(evt){
        throw new Error('This method must be overridden');
    }
    onAnswerSelected(evt) {
        throw new Error('This method must be overridden');
    }

    onSetStarted(evt) {
        throw new Error('This method must be overridden');
    }
    onRoundStarted(evt) {
        throw new Error('This method must be overridden');
    }
    onSetFinished(evt) {
        throw new Error('This method must be overridden');
    }
    onRoundFinished(evt) {
        throw new Error('This method must be overridden');
    }

    onGameStarted(evt) {
        throw new Error('This method must be overridden');
    }

    onThemeSelected(evt) {
        throw new Error('This method must be overridden');
    }

    onGameFinished(evt) {
        throw new Error('This method must be overridden');
    }

    onGameStateChanged(evt) {
        throw new Error('This method must be overridden');
    }

}