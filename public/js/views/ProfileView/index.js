import {View} from '../View/view';
const profileViewTemplate = require('./profile-view.pug');
import * as UserSingletone from '../../services/user-singletone';
import * as busSingletone from '../../modules/bus';
import {ProfilePopup} from './ProfilePopup/profile-popup';
import {HomeButton} from '../../blocks/home-button/HomeButton';



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
        this.addLogoutAction(this.el.querySelector('.logout-button'));
        this.addAvatarsPopup(this.el.querySelector('.user-profile__change-avatar'));
        const homeButton = new HomeButton();
        homeButton.render(this.el);
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

    addAvatarsPopup(button) {
        this.profilePopup = new ProfilePopup(this.el.querySelector('.js-profile-main'), this.getAvatarsPaths(), this.user.avatar);
        this.profilePopup.activate(button);
        this.profilePopup.addActionOnClose(() => {
            let profileImage = this.el.querySelector('.user-profile__image');
            if (profileImage.src !== `../../img/avatars/${UserSingletone.getInstance().getUser().avatar}.svg`) {
                profileImage.src = `../../img/avatars/${UserSingletone.getInstance().getUser().avatar}.svg`;
            }
        });
    }

    getAvatarsPaths() {
        let avatarsAmount = 9;
        let paths = [];
        for (let i = 1; i <= avatarsAmount; i++) {
            paths[i - 1] = `../../img/avatars/${i}.svg`;
        }
        return paths;
    }
}
