import {GameCore} from './index';
import * as busSingleton from '../../bus';

//const Ws = require('Ws');
//const ws = new Ws();

export class OnlineGame extends GameCore {
    start() {
        super.start();
        this.bus = busSingleton.getInstance();
        ws.send('start-game', null);
    }

    onControllsPressed(evt) {
        if (this._pressed('LEFT', evt)) {
            ws.send('game-command', 'LEFT');
        } else if (this._pressed('RIGHT', evt)) {
            ws.send('game-command', 'RIGHT');
        } else if (this._pressed('FIRE', evt)) {
            ws.send('game-command', 'FIRE');
        }
    }

    onGameStarted(evt) {
        this.controller.start();
        this.scene.init(evt);
        this.scene.start();
    }

    onGameFinished(evt) {
        this.bus.emit('CLOSE_GAME');
    }

    onGameStateChanged(evt) {
        this.scene.setState(evt);
    }
}