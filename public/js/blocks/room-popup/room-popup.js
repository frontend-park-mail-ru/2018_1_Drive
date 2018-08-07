import {Popup2} from '../popup2/popup2';
import {Ws} from '../../modules/ws';
import {multiPlayerEvents} from '../../modules/game/multiplayer/events';
import * as busSingletone from '../../modules/bus';
import {Router} from '../../modules/router';
import {GameRoomView} from '../../views/GameRoomView';
import {Ticker} from './ticker';
import {PlayerTicker} from './PlayerTicker';

export class RoomPopup extends Popup2{
    constructor(popup, inner) {
        super(popup, inner);
        const bus = busSingletone.getInstance();
        bus.on(multiPlayerEvents.EVENTS_GAME_START, this.onGameStarted.bind(this));
        bus.on('new-multiplayer-game', this.newGame.bind(this));
        bus.on('open-mult-popup', this.openPopup.bind(this));
    }

    onCancel(cancelButton) {
        cancelButton.addEventListener('click', () => {
            this.closePopup();
            this.ws.send('EVENTS_CANCEL_GAME', 'Cancel game search');
            this.ws.close();
            this.playerTicker.stop();
            this.ticker.stop();
        });
    }

    openPopup() {
        if (this.gameOpened !== true) {
            super.openPopup();
            this.ticker = new Ticker(this.inner.querySelector('.room-popup__text'));
            this.ticker.start(5);
            this.playerTicker = new PlayerTicker(this.inner.querySelector('.room-popup__player2'));
            this.playerTicker.start(3);
            this.ws = new Ws();
            this.gameOpened = false;
        } else {
            new Router().open('/multiplayer-game');
        }
    }

    onGameStarted(payload) {
        this.playerTicker.stop();
        this.ticker.stop();
        super.closePopup();
        this.gameOpened = true;
        let router =  new Router();
        payload.ws = this.ws;
        if (!router.getView('/multiplayer-game')) {
            router.add('/multiplayer-game', GameRoomView, payload);
        } else {
            payload.needRestartGameView = true;
        }
        router.open('/multiplayer-game', payload);
    }

    newGame() {
        this.gameOpened = false;
    }
}