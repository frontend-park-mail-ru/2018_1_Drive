import {View} from '../View/view';
const errorPageTemplate = require('../../blocks/error-page/error-page.pug');


export class NotFoundView extends View {
    constructor() {
        super('NotFoundView', errorPageTemplate);
    }

    create() {
        const errorCode = 404;
        const description = 'Source, you are looking for doesn\'t exist';
        super.create({errorCode: errorCode, description: description});
        super.hide();
        return this;
    }
}
