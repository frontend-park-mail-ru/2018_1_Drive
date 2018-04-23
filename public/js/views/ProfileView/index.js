import {View} from '../View/view';
const profileViewTemplate = require('./profile-view.pug');
import {UsersModel} from '../../models/UsersModel';
import * as UserSingletone from '../../services/user-singletone';
import * as busSingletone from '../../modules/bus';

export class ProfileView extends View {
    constructor() {
        super('Profile', profileViewTemplate);
    }

    create() {
        const user = UserSingletone.getInstance().getUser();

        if (!user) {
            const bus = busSingletone.getInstance();
            bus.emit('not-found');
            return this;
        } else {
            super.render(user);
        }

        const logoutButton = this.el.querySelector('.logout');
        this.addLogoutAction(logoutButton);

        super.hide();
        return this;
    }


    addLogoutAction(button) {
        button.addEventListener('click', () => busSingletone.getInstance().emit('logout'));
    }

    show() {
        const user = UserSingletone.getInstance().getUser();
        if (!this.el.querySelector('.main-block') && user) {
            this.create(user);
        }
        this.el.removeAttribute('hidden');
        this.active = true;
        return this;
    }
}
