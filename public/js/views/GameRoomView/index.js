import {View} from '../View/view';
import {MultiplayerGame} from '../../modules/game/multiplayer';
const gameViewTemplate = require('../../views/GameView/game-view.pug');

export class GameRoomView extends View {
    constructor() {
        super('GameRoomView', gameViewTemplate);
    }

    create(payload) {
        super.render();
        this.game = new MultiplayerGame(this.el);
        this.game.start(payload);
        return this;
    }

    show(payload) {
        if (payload && payload.needRestartGameView) {
            payload.notAddListners = true;
            payload.needRestartGameView = false;
            this.game.start(payload);
        }
        this.el.removeAttribute('hidden');
        this.active = true;
        return this;
    }
}