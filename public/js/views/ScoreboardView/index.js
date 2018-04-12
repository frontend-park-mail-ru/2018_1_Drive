define('ScoreboardView', function (require) {
    const View = require('View');
    const UsersModel = require('UsersModel');
    const ScoreboardComponent = require('ScoreboardComponent');

    return class ScoreboardView extends View {
        constructor() {
            super('scoreboard', window.scoreboardViewTemplate);
            //this.attrs = [];
        }

        create(attrs = []) {
            super.create(attrs);
            const scoreboardRoot = this.el.querySelector('.menu');
            this.scoreboard = new ScoreboardComponent(scoreboardRoot);

            UsersModel.loadUsers(this.scoreboard.getFirstPosition(), this.scoreboard.playersOnPage)
                .then(function (users) {
                    this.scoreboard.users = users;
                    this.scoreboard.render();
                }.bind(this))
                .catch(console.error);
            return this;
        }
    };
});