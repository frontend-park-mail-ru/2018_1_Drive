import {View} from '../View/view';
import {UsersModel} from '../../models/UsersModel';
//import {menuViewTemplate} from './menu-view.pug';
const menuViewTemplate = require('./menu-view.pug');

export class MenuView extends View {
    constructor() {

        super('Menu', menuViewTemplate);
    }

    render() {
        // TODO:if (UsersModel.isAuthorized());
        return super.render();
    }
}
