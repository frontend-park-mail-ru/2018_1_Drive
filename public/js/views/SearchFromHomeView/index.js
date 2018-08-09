import {View} from '../View/view';
const errorPageTemplate = require('../../blocks/error-page/error-page.pug');


export class MultiplayerSearchNotAllowed extends View {
    constructor() {
        super('MultiplayerSearchNotAllowed', errorPageTemplate);
    }

    create() {
        const errorCode = 303;
        const description = 'To play multiplayer, you need start searching game from main menu';
        super.create({errorCode: errorCode, description: description});
        super.hide();
        return this;
    }
}
