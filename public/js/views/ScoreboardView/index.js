import {View} from '../View/view';
import {UsersModel} from '../../models/UsersModel';
import {ScoreboardComponent} from '../../blocks/scoreboard/scoreboard';

const scoreboardViewTemplate = require('./scoreboard-view.pug');
import {ProfileBlock} from '../../blocks/profile-block/profile';
const ProfileBlockTemplate = require('../../blocks/profile-block/profile-block.pug');
import * as UserSingleton from '../../services/user-singletone';

export class ScoreboardView extends View {
    constructor() {
        super('scoreboard', scoreboardViewTemplate);
    }

    create(attrs) {
        super.create(attrs);
        const scoreboardRoot = this.el.querySelector('.grid');
        this.scoreboard = new ScoreboardComponent(scoreboardRoot, this.update.bind(this));

        const userSingleton = UserSingleton.getInstance();
        const profile = new ProfileBlock(this.el, ProfileBlockTemplate);
        profile.render(userSingleton.getUser());

        UsersModel.loadUsers(this.scoreboard.getFirstPosition(), this.scoreboard.playersOnPage + 1)
            .then(function (users) {
                this.scoreboard.render(users, userSingleton.getUser(), this.scoreboard.getFirstPosition());
            }.bind(this))
            .catch(console.error);
        return this;
    }


    update() {
        UsersModel.loadUsers(this.scoreboard.getFirstPosition(), this.scoreboard.playersOnPage + 1)
            .then(function (users) {
                this.scoreboard.render(users, UserSingleton.getInstance().getUser(), this.scoreboard.getFirstPosition());
            }.bind(this))
            .catch(console.error);
    }

    show() {
        const userSingleton = UserSingleton.getInstance();
        const profile = new ProfileBlock(this.el, ProfileBlockTemplate);
        profile.render(userSingleton.getUser());
        this.el.removeAttribute('hidden');
        this.active = true;
        return this;
    }

    highlightCurrentUser() {
        this.scoreboard.highlightLogin(UserSingleton.getInstance().getUser().login);
    }
}
