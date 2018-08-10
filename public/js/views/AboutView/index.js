import {View} from '../View/view';
import {HomeButton} from '../../blocks/home-button/HomeButton';
const aboutViewTempalte = require('./about-view.pug');

export class AboutView extends View {
    constructor() {
        super('About', aboutViewTempalte);
    }

    create() {
        super.create();
        const homeButton = new HomeButton();
        homeButton.render(this.el);
        super.hide();
        return this;
    }

    show() {
        this.el.removeAttribute('hidden');
        this.active = true;
        return this;
    }
}