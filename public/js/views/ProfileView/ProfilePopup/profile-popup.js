import {Popup2} from '../../../blocks/popup2/popup2';
const profilePopupTemplate = require('./profile-popup.pug');
import {AvatarsSelect} from '../../../blocks/avatars-select/avatars-select';

export class ProfilePopup extends Popup2 {
    constructor(root, imgs, userAvatar = 1) {
        const element = document.createElement('div');
        element.classList.add('popup2', 'profile__popup', 'center-content');
        element.innerHTML = profilePopupTemplate({avatars:imgs});
        root.appendChild(element);
        super(element, element.querySelector('.profile__popup-inner'));
        this.popup = element;
        this.selectButton = this.popup.querySelector('.select-button');
        this.avatars = [...this.popup.querySelectorAll('.avatars__avatar')];
        this.userAvatar = userAvatar;
    }

    activate(button) {
        super.activate(button);
        super.onCancel(this.popup.querySelector('.js-avatars-close'));
        this.avatarsSelect = new AvatarsSelect(this.avatars, this.userAvatar, this.selectButton);
        this.avatarsSelect.addOnClickAnimation();
        this.avatarsSelect.addSelectButtonAnimation();

    }


}