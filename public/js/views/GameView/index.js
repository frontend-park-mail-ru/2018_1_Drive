import {View} from '../View/view';
import {Game} from '../../modules/game/game';
import {GAME_MODES} from  '../../modules/game/modes' ;
const gameViewTemplate = require('./game-view.pug');


export class GameView extends View {
    constructor() {
        super('GameView', gameViewTemplate);
        this.attrs = {};
        this.game = null;
        this.bus.on('CLOSE_GAME', function () {
            if (this.active) {
                this.router.open('/');
            }
        }.bind(this));
    }

    destroy() {
        this.el.innerHTML = '';
        this.game.destroy();
        return this;
    }

    create(attrs = 'offline-mode') {
        if (navigator.onLine){
            attrs = 'online-mode';
        }else{
            attrs = 'offline-mode';
        }
        super.create(attrs);
        this.render();
        this.doGame(attrs);
        return this;
    }

    doGame(pathname) {
        let mode = '';
        if (pathname === 'online-mode') {
            mode = GAME_MODES.ONLINE;
        } else {
            mode = GAME_MODES.OFFLINE;
        }
        this.game = new Game(mode);
        this.game.start();
    }
}
