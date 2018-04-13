define('GameView', function (require) {
    const View = require('View');
    const Game = require('game/game');
    const GAME_MODES = require('game/modes');



    return class GameView extends View {
        constructor() {
            super('GameView',window.gameViewTemplate);
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
            this.game.destroy();
            this.hide();
            this.el.innerHTML = '';
            return this;
        }

        create(attrs = '/game/offline-mode') {
            super.create(this.attrs);
            //this.canvas = this.el.querySelector('.js-canvas');
            //this.ctx = this.canvas.getContext('2d');
            this.render();
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
    };
});
