define('game/core/events', function (require) {
    return {
        START_GAME: 'START_GAME',
        FINISH_GAME: 'FINISH_GAME',
        THEME_SELECTED: 'THEME_SELECTED',
        ANSWER_SELECTED: 'ANSWER_SELECTED',
        GAME_STATE_CHANGED: 'GAME_STATE_CHANGED',
    };
});