import {View} from '../View/view';
const multiplayerViewTemplate = require('./multiplayer-view.pug');
import {Ws} from '../../modules/ws';


export class MultiPlayerGameView extends View {
    constructor() {
        super('MultiPlayerGameView', multiplayerViewTemplate);
    }

    create() {
        super.create();
        this.initButton = this.el.querySelector('.init');
        this.initButton.addEventListener('click', this.onButtonClick);
        return this;
    }

   onButtonClick() {
        this.ws = new Ws();
    }

}