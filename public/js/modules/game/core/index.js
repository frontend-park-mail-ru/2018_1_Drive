define('game/core', function (require) {
    const events = require('game/core/events');
    const bus = require('bus');

    return class GameCore {
        constructor() {

            this.onGameStarted = this.onGameStarted.bind(this);
            this.onGameFinished = this.onGameFinished.bind(this);
            this.onAnswerSelected = this.onAnswerSelected.bind(this);
            this.onThemeSelected = this.onThemeSelected.bind(this);
            this.onGameStateChanged = this.onGameStateChanged.bind(this);

        }

        start() {
            bus.on(events.START_GAME, this.onGameStarted);
            bus.on(events.FINISH_GAME, this.onGameFinished);
            bus.on(events.ANSWER_SELECTED, this.onAnswerSelected);
            bus.on(events.THEME_SELECTED, this.onThemeSelected);
            bus.on(events.GAME_STATE_CHANGED, this.onGameStateChanged);

        }

        destroy() {
            bus.off(events.START_GAME, this.onGameStarted);
            bus.off(events.FINISH_GAME, this.onGameFinished);
            bus.off(events.ANSWER_SELECTED, this.onAnswerSelected);
            bus.off(events.THEME_SELECTED, this.onThemeSelected);
            bus.off(events.GAME_STATE_CHANGED, this.onGameStateChanged);
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

    };
});