import {View} from '../View/view';
import {HomeButton} from '../../blocks/home-button/HomeButton';
import * as UserSingleton from '../../services/user-singletone';
import {ProfileBlock} from '../../blocks/profile-block/profile';
const aboutViewTempalte = require('./about-view.pug');
const ProfileBlockTemplate = require('../../blocks/profile-block/profile-block.pug');

export class AboutView extends View {
    constructor() {
        super('About', aboutViewTempalte);
    }

    create() {
        super.create();
        const homeButton = new HomeButton();
        homeButton.render(this.el);

        const userSingleton = UserSingleton.getInstance();
        const profile = new ProfileBlock(this.el, ProfileBlockTemplate);
        profile.render(userSingleton.getUser());
        super.hide();
        return this;
    }

    show() {
        const userSingleton = UserSingleton.getInstance();
        const profile = new ProfileBlock(this.el, ProfileBlockTemplate);
        profile.render(userSingleton.getUser());
        this.el.removeAttribute('hidden');
        this.active = true;
        return this;
    }
}