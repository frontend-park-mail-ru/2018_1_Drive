import * as busSingletone from '../../modules/bus';

export class ProfileBlock {
    constructor(root, template) {
        this.element = root;
        this.template = template;
    }

    render(user) {
        let root = this.element.querySelector('.profile-section');

        if (user) {
            user.authorized = true;
            user.firstLetter = user.login.slice(0, 1);
            user.otherLetters = user.login.slice(1, user.login.length);
            root.innerHTML = this.template(user);
            const button = root.querySelector('.profile-section__profile-authorized');
            button.addEventListener('click',  () => {
                busSingletone.getInstance().emit('profile-settings', user);
            });
            return;
        }
        root.innerHTML = this.template({authorized: false});
    }
}