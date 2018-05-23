
import { GAME_MODES }  from './modes';
import  { OfflineGame } from './core/offline';
import { OnlineGame } from './core/online';
import {MultiplayerGame} from './multiplayer';


export class Game {
    constructor(mode) {
        let GameConstructor = null;
        switch (mode) {
            case GAME_MODES.ONLINE: {
                GameConstructor = OnlineGame;
                break;
            }
            case GAME_MODES.OFFLINE: {
                GameConstructor = OfflineGame;
                break;
            }
            case GAME_MODES.MULTIPLAYER: {
                GameConstructor = MultiplayerGame;
                break;
            }
            default:
                throw new Error('Invalid game mode ' + mode);
        }

        this.gameCore = new GameConstructor();
    }

    start() {
        this.gameCore.start();
    }

    destroy() {
        this.gameCore.destroy();
    }
}