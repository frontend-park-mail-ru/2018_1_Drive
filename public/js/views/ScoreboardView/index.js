import {View} from '../View/view';
import {UsersModel} from '../../models/UsersModel';
import {ScoreboardComponent} from '../../blocks/scoreboard/scoreboard';

const gridViewTemplate = require('../GridView/grid-view.pug');
import {ProfileBlock} from '../../blocks/profile-block/profile-block';
const ProfileBlockTemplate = require('../../blocks/profile-block/profile-block.pug');
import * as UserSingletone from '../../services/user-singletone';

export class ScoreboardView extends View {
    constructor() {
        super('scoreboard', gridViewTemplate);
    }

    create(attrs) {
        super.create(attrs);
        const scoreboardRoot = this.el.querySelector('.main-block');
        this.scoreboard = new ScoreboardComponent(scoreboardRoot, this.update.bind(this));

        const userSingletone = UserSingletone.getInstance();
        const profile = new ProfileBlock(this.el, ProfileBlockTemplate);
        profile.render(userSingletone.getUser());

        UsersModel.loadUsers(this.scoreboard.getFirstPosition(), this.scoreboard.playersOnPage)
            .then(function (users) {
                this.scoreboard.users = {users:users};
                this.scoreboard.render();
            }.bind(this))
            .catch(console.error);
        return this;
    }


    update() {
        UsersModel.loadUsers(this.scoreboard.getFirstPosition(), this.scoreboard.playersOnPage)
            .then(function (users) {
                if (users.length === 0 ) {
                    this.scoreboard.stopRendrer = true;
                    return;
                }
                this.scoreboard.users = {users:users};
                this.scoreboard.render();

                if (users.length < this.scoreboard.playersOnPage) {
                    this.scoreboard.stopRendrer = true;
                }
            }.bind(this))
            .catch(console.error);
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
