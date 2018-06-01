import {multiPlayerEvents} from './events';
import * as busSingleton from '../../bus';

export class MultiplayerCore {
    constructor() {
        this.bus = busSingleton.getInstance();

        this.onGameStarted = this.onGameStarted.bind(this);
        this.onThemeSelected = this.onThemeSelected.bind(this);
        this.onEventsSetStarted = this.onEventsSetStarted.bind(this);
        this.onGameStateChanged = this.onGameStateChanged.bind(this);
        this.onAnswerSelected = this.onAnswerSelected.bind(this);
        this.onAnswerChecked = this.onAnswerChecked.bind(this);
        this.onTimeOver = this.onTimeOver.bind(this);
        this.onRoundFinished = this.onRoundFinished.bind(this);
        this.onSetFinished = this.onSetFinished.bind(this);
        this.onGameFinished = this.onGameFinished.bind(this);
        this.onHome = this.onHome.bind(this);
        this.onRestart = this.onRestart.bind(this);
    }

    start() {
        this.bus.on(multiPlayerEvents.REAL_GAME_START, this.onGameStarted);
        this.bus.on(multiPlayerEvents.EVENTS_THEME_SELECTED, this.onThemeSelected);
        this.bus.on(multiPlayerEvents.EVENTS_SET_STARTED, this.onEventsSetStarted);
        this.bus.on(multiPlayerEvents.EVENTS_GAME_STATE_CHANGED, this.onGameStateChanged);
        this.bus.on(multiPlayerEvents.EVENTS_ANSWER_SELECTED, this.onAnswerSelected);
        this.bus.on(multiPlayerEvents.EVENTS_ANSWER_CHECKED, this.onAnswerChecked);
        this.bus.on(multiPlayerEvents.EVENTS_TIME_OVER, this.onTimeOver);
        this.bus.on(multiPlayerEvents.EVENTS_ROUND_FINISHED, this.onRoundFinished);
        this.bus.on(multiPlayerEvents.EVENTS_SET_FINISHED, this.onSetFinished);
        this.bus.on(multiPlayerEvents.EVENTS_GAME_FINISHED, this.onGameFinished);
        this.bus.on(multiPlayerEvents.EVENTS_HOME, this.onHome);
        this.bus.on(multiPlayerEvents.RESTART_GAME, this.onRestart);
    }

    destroy() {
        this.bus.on(multiPlayerEvents.TIME_OVER, this.onTimeOver);

        this.bus.off(multiPlayerEvents.EVENTS_GAME_STATE_CHANGED, this.onGameStateChanged);
        this.bus.off(multiPlayerEvents.EVENTS_THEME_SELECTED, this.onThemeSelected);
        this.bus.off(multiPlayerEvents.EVENTS_SET_STARTED, this.onEventsSetStarted);
        this.bus.off(multiPlayerEvents.REAL_GAME_START, this.onGameStarted);
        this.bus.off(multiPlayerEvents.EVENTS_ANSWER_SELECTED, this.onAnswerSelected);
        this.bus.off(multiPlayerEvents.EVENTS_ANSWER_CHECKED, this.onAnswerChecked);
        this.bus.off(multiPlayerEvents.EVENTS_TIME_OVER, this.onTimeOver);
        this.bus.off(multiPlayerEvents.EVENTS_ROUND_FINISHED, this.onRoundFinished);
        this.bus.off(multiPlayerEvents.EVENTS_SET_FINISHED, this.onSetFinished);
        this.bus.off(multiPlayerEvents.EVENTS_GAME_FINISHED, this.onGameFinished);
        this.bus.off(multiPlayerEvents.EVENTS_HOME, this.onHome);
        this.bus.off(multiPlayerEvents.RESTART_GAME, this.onRestart);
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
