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
        this.user = UserSingletone.getInstance().getUser();
        if (!this.user) {
            return this;
        } else {
            super.render(this.user);
        }
        const logoutButton = this.el.querySelector('.logout-button');
        this.addLogoutAction(logoutButton);
        super.hide();
        return this;
    }

    addLogoutAction(button) {
        button.addEventListener('click', () => busSingletone.getInstance().emit('logout'));
    }

    show() {
        const user = UserSingletone.getInstance().getUser();
        if (user && !this.user) {
            this.create();
        }
        this.el.removeAttribute('hidden');
        this.active = true;
        return this;
    }

    deleteUser() {
        this.user = null;
    }
}
