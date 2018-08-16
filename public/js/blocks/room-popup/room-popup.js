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
            this.ticker = new Ticker(this.inner.querySelector('.room-popup__text'));
            this.playerTicker = new PlayerTicker(this.inner.querySelector('.room-popup__player2'));
            this.inner.querySelector('.room-popup__player2').classList.add('room-popup__opponent-animation');
            this.inner.querySelector('.room-popup__text').classList.add('room-popup__tips-animation');
            this.ticker.start(5000);
            this.playerTicker.start(3000);
            super.openPopup();
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



    closePopup() {
        super.closePopup();
        this.inner.querySelector('.room-popup__player2').classList.remove('room-popup__opponent-animation');
        this.inner.querySelector('.room-popup__text').classList.remove('room-popup__tips-animation');
    }

    newGame() {
        this.gameOpened = false;
    }
}