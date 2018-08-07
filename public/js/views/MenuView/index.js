import {View} from '../View/view';
const menuViewTemplate = require('./menu-view.pug');
import {ProfileBlock} from '../../blocks/profile-block/profile';
const ProfileBlockTemplate = require('../../blocks/profile-block/profile-block.pug');
import * as UserSingletone from '../../services/user-singletone';
import {Router} from '../../modules/router';
import {Popup} from '../../blocks/popup/popup';
import {RoomPopup} from '../../blocks/room-popup/room-popup';


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
        this.changeMultiplayerPopupUser(currentUser);
        this.addNotLoginedPopup();
        this.addRoomPopup();

        this.multiplayerButton.addEventListener('click', () => {
           if (!UserSingletone.getInstance().getUser()) {
                this.popup.openPopup();
                return;
           }
           this.roomPopup.openPopup();
        });
        return this;
    }

    show() {
        const currentUser = UserSingletone.getInstance().getUser();
        const profile = new ProfileBlock(this.el, ProfileBlockTemplate);
        profile.render(currentUser);
        this.changeMultiplayerPopupUser(currentUser);
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

    addNotLoginedPopup() {
        this.popup = new Popup(document.querySelector('.multiplayer-popup'), document.querySelector('.multiplayer-popup__inner'));
        this.popup.onCancel(this.popup.inner.querySelector('.multiplayer-popup__close'));
        this.popup.inner.querySelector('.js-unreg-signin').addEventListener('click', () => {
            new Router().open('/signin');
            this.popup.closePopup();
        });
        this.popup.inner.querySelector('.js-unreg-signup').addEventListener('click', () => {
            new Router().open('/signup');
            this.popup.closePopup();
        });
    }

    addRoomPopup() {
        this.roomPopup = new RoomPopup(document.querySelector('.room-popup'), document.querySelector('.room-popup__inner'));
        this.roomPopup.onCancel(this.roomPopup.inner.querySelector('.room-popup__close'));
    }

    changeMultiplayerPopupUser(currentUser) {
        if (currentUser) {
            this.el.querySelector('.room-name1').innerHTML = currentUser.login;
            this.el.querySelector('.room-popup-user-image').src = `../../img/avatars/${currentUser.avatar}.svg`;
        }
    }
}
