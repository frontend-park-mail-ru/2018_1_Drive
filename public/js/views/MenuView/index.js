import {View} from '../View/view';
const menuViewTemplate = require('./menu-view.pug');
import {ProfileBlock} from '../../blocks/profile-block/profile';
const ProfileBlockTemplate = require('../../blocks/profile-block/profile-block.pug');
import * as UserSingletone from '../../services/user-singletone';
import {Router} from '../../modules/router';


export class MenuView extends View {
    constructor() {
        super('Menu', menuViewTemplate);
    }

    create() {
        super.render();
        super.hide();
        const currentUser = UserSingletone.getInstance().getUser();
        this.multiplayerButton = this.el.querySelector('.multiplayer-popup-button');
        this.changeMultiplayerButtonColor(currentUser);
        const profile = new ProfileBlock(this.el, ProfileBlockTemplate);
        profile.render(currentUser);

        this.multiplayerButton.addEventListener('click', () => {
           if (!UserSingletone.getInstance().getUser()) {
                console.log('unregistered');
                return;
           }
           new Router().open('/multiplayer-game');
        });
        return this;
    }

    show() {
        const currentUser = UserSingletone.getInstance().getUser();
        const profile = new ProfileBlock(this.el, ProfileBlockTemplate);
        profile.render(currentUser);
        this.changeMultiplayerButtonColor(currentUser);
        this.el.removeAttribute('hidden');
        this.active = true;
        return this;
    }

    changeMultiplayerButtonColor(user) {
        const none = () => {};
        if (this.multiplayerButton.firstChild.classList.contains('light-purple-font')) {
            user ? this.multiplayerButton.firstChild.classList.remove('light-purple-font') : none();
        } else {
            user ? none() : this.multiplayerButton.firstChild.classList.add('light-purple-font');
        }
    }

}
