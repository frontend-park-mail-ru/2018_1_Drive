const homeButtonTemplate = require('./home-button.pug');
import * as busSingletone from '../../modules/bus';

export class HomeButton {
    constructor() {
        this.template = homeButtonTemplate;
    }

    render(root) {
        const div = document.createElement('div');
        div.innerHTML = this.template();
        this.bus = busSingletone.getInstance();
        div.querySelector('.js-home-button').addEventListener('click', () => {
            this.bus.emit('home');
        });
        root.appendChild(div);
    }
}