import * as busSingletone from '../../modules/bus';

export class ProfileBlock {
    constructor(root, template) {
        this.element = root;
        this.template = template;
    }

    render(user) {
        let root = this.element.querySelector('.profile-section');
        if (user) {
            let userArg = user;
            userArg.authorized = true;
            userArg.firstLetter = user.login.slice(0, 1);
            userArg.otherLetters = user.login.slice(1, user.login.length);
            root.innerHTML = this.template(user);
            const button = root.querySelector('.main__profile-registered');
            button.addEventListener('click',  () => {
                busSingletone.getInstance().emit('profile-settings', userArg);
            });
            userArg = null;
            return;
        }
        root.innerHTML = this.template({authorized: false});
    }
}