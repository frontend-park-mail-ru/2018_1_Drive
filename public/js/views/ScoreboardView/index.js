import {View} from '../View/view';
import {UsersModel} from '../../models/UsersModel';
import {ScoreboardComponent} from '../../blocks/scoreboard/scoreboard';
//import {scoreboardViewTemplate} from './scoreboard-view.pug';
const scoreboardViewTemplate = require('./scoreboard-view.pug');


export class ScoreboardView extends View {
    constructor() {
        super('scoreboard', scoreboardViewTemplate);
    }

    create(attrs) {
        super.create(attrs);
        const scoreboardRoot = this.el.querySelector('.menu');
        this.scoreboard = new ScoreboardComponent(scoreboardRoot, this.update.bind(this));

        UsersModel.loadUsers(this.scoreboard.getFirstPosition(), this.scoreboard.playersOnPage)
            .then(function (users) {
                this.scoreboard.users = users;
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
                this.scoreboard.users = users;
                this.scoreboard.render();

                if (users.length < this.scoreboard.playersOnPage) {
                    this.scoreboard.stopRendrer = true;
                }
            }.bind(this))
            .catch(console.error);
    }
}
