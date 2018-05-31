import {View} from '../View/view';
import {Game} from '../../modules/game/game';
import {GAME_MODES} from  '../../modules/game/modes' ;
//import {gameViewTemplate} from './game-view.pug';
const gameViewTemplate = require('./game-view.pug');


export class GameView extends View {
    constructor() {
        super('GameView', gameViewTemplate);
        this.attrs = {};
        this.canvas = null;
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

    create(attrs = '/game/offline-mode') {

        // fetch('', { method: 'HEAD' })
        //     .then(() => true, () => false)
        //     .then(onLine => (
        //         onLine ? attrs = '/game/online-mode' : attrs = '/game/offline-mode'
        //         )
        //     );
        if (navigator.onLine){
            attrs = '/game/online-mode';
        }else{
            attrs = '/game/offline-mode';
        }
        console.log('game mode is: ' + attrs);
        super.create(attrs);
        //this.canvas = this.el.querySelector('.js-canvas');
        //this.ctx = this.canvas.getContext('2d');
        this.render();
        console.log('create game');
        this.doGame(attrs);
        return this;
    }

    doGame(pathname) {
        let mode = '';
        if (pathname === '/game/online-mode') {
            mode = GAME_MODES.ONLINE;
        } else {
            mode = GAME_MODES.OFFLINE;
        }
        //создаем инстанс Гейм
        this.game = new Game(mode);
        this.game.start();
    }
}
