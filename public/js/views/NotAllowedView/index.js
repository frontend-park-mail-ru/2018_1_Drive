import {View} from '../View/view';
const errorPageTemplate = require('../../blocks/error-page/error-page.pug');


export class NotAllowedView extends View {
    constructor() {
        super('NotAllowedView', errorPageTemplate);
    }

    create() {
        const errorCode = 405;
        const description = 'Method not allowed';
        super.create({errorCode: errorCode, description: description});
        super.hide();
        return this;
    }
}
