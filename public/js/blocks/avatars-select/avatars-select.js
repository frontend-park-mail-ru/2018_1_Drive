import {UsersModel} from '../../models/UsersModel';

export class AvatarsSelect {
    constructor(avatars, userAvatar, selectedButton) {
        this.avatars = avatars;
        this.selectedClass = 'avatar-border';
        this.userAvatar = userAvatar - 1;
        this.currentAvatar = userAvatar - 1;
        this.selectAvatarButton = selectedButton;
        avatars[this.userAvatar].firstChild.classList.add(this.selectedClass);
        this.selectAvatarButton.classList.remove('btn-animation');
        this.selectAvatarButton.classList.add('grey-button');
    }

    addOnClickAnimation() {
        this.avatars.forEach((avatar, i) => {
            avatar.addEventListener('click', () => {
                this.avatars[this.currentAvatar].firstChild.classList.remove(this.selectedClass);
                avatar.firstChild.classList.add(this.selectedClass);
                if (this.currentAvatar !== i) {
                    this.selectAvatarButton.classList.remove('grey-button');
                    this.selectAvatarButton.classList.add('btn-animation');
                }
                if (this.userAvatar === i) {
                    this.selectAvatarButton.classList.remove('btn-animation');
                    this.selectAvatarButton.classList.add('grey-button');
                }
                this.currentAvatar = i;
            });
        });
    }

    addSelectButtonAnimation() {
        this.selectAvatarButton.addEventListener('click', () => {
            if (this.currentAvatar !==  this.userAvatar) {
                UsersModel.updateAvatar(this.currentAvatar + 1);
                this.userAvatar = this.currentAvatar;
                this.selectAvatarButton.classList.remove('btn-animation');
                this.selectAvatarButton.classList.add('grey-button');
            }
        });
    }
}