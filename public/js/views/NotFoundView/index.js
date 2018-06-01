import {View} from '../View/view';
const notFoundViewTempalte = require('./not-found.pug');


export class NotFoundView extends View {
    constructor() {
        super('NotFoundView', notFoundViewTempalte);
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
