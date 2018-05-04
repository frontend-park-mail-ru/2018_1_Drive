import {View} from '../View/view';
import {UsersModel} from '../../models/UsersModel';
const menuViewTemplate = require('./menu-view.pug');
import {ProfileBlock} from '../../blocks/profile-block/profile-block';
const ProfileBlockTemplate = require('../../blocks/profile-block/profile-block.pug');
import * as UserSingletone from '../../services/user-singletone';


export class MenuView extends View {
    constructor() {
        super('Menu', menuViewTemplate);
    }

    create() {
        super.render();
        super.hide();

        const userSingletone = UserSingletone.getInstance();
        const profile = new ProfileBlock(this.el, ProfileBlockTemplate);
        profile.render(userSingletone.getUser());
        return this;
    }

    show() {
        const userSingletone = UserSingletone.getInstance();
        const profile = new ProfileBlock(this.el, ProfileBlockTemplate);
        profile.render(userSingletone.getUser());
        this.el.removeAttribute('hidden');
        this.active = true;
        return this;
    }

}
