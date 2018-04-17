import {UsersModel} from '../../models/UsersModel';
import {View} from '../View/view';

const template = require('./setting-view.pug');

export class SettingsView extends View {
        constructor() {
            super('Settings', template);
        }

        create() {
            const user = UsersModel.getCurrentUser();
            this.attrs = {
                login: user.login,
                mail: user.mail,
                score: user.score
            };
            super.create();
            return this;
        }
}
