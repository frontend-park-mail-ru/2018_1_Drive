import {events} from './events';
import * as busSingleton from '../../bus';

export class GameCore {
    constructor() {

        this.onGameStarted = this.onGameStarted.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);
        this.onAnswerSelected = this.onAnswerSelected.bind(this);
        this.onThemeSelected = this.onThemeSelected.bind(this);
        this.onGameStateChanged = this.onGameStateChanged.bind(this);
        this.bus = busSingleton.getInstance();

    }

    start() {
        this.bus.on(events.START_GAME, this.onGameStarted);
        this.bus.on(events.FINISH_GAME, this.onGameFinished);
        this.bus.on(events.ANSWER_SELECTED, this.onAnswerSelected);
        this.bus.on(events.THEME_SELECTED, this.onThemeSelected);
        this.bus.on(events.GAME_STATE_CHANGED, this.onGameStateChanged);

    }

    destroy() {
        this.bus.off(events.START_GAME, this.onGameStarted);
        this.bus.off(events.FINISH_GAME, this.onGameFinished);
        this.bus.off(events.ANSWER_SELECTED, this.onAnswerSelected);
        this.bus.off(events.THEME_SELECTED, this.onThemeSelected);
        this.bus.off(events.GAME_STATE_CHANGED, this.onGameStateChanged);
    }

    onAnswerSelected(evt) {
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