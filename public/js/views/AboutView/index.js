import {View} from '../View/view';
const aboutViewTempalte = require('./about-view.pug');

export class AboutView extends View {
    constructor() {
        super('About', aboutViewTempalte);
    }

    create() {
        super.create();
        super.hide();
        return this;
    }

    show() {
        this.el.removeAttribute('hidden');
        this.active = true;
        return this;
    }
}