(function () {
    'use strict';

    const BaseComponent = window.BaseComponent;
    const Button = window.Button;
    const ApiMethods = window.ApiMethods;
    let allUsers = [];

    class Scoreboard extends BaseComponent {
        constructor(leaderboard) {
            super(leaderboard);
        }

        loadData() {
            const thisObject = this;

            ApiMethods.loadAllUsers(function (err, response) {
                if (err) {
                    console.error(err);
                    return;
                }

                if (response['success'] !== 'true') {
                    alert(response['status']);
                }

                allUsers = response['users'];
                thisObject.render();
            });
        }
      

        render() {

            this.element.innerHTML = ' ';
            const head = new Button(null, 'Top players', '');
            this.element.appendChild(head.element);

            console.dir(allUsers);
            for (let player of allUsers) {
                const str = document.createElement('div');
                str.setAttribute('class', 'clearfix player');
                const name = document.createElement('div');
                const score = document.createElement('div');
                name.setAttribute('class', 'floated-left');
                score.setAttribute('class', 'floated-right');

                name.innerHTML = player['mail'];
                score.innerHTML = player['score'];
                str.appendChild(name);
                str.appendChild(score);
                this.element.appendChild(str);
            }
            const buttonLeft = new Button(null, 'Prev', 'button-half');
            this.element.appendChild(buttonLeft.element);
            const buttonRight = new Button(null, 'Next', 'button-half button-last');
            this.element.appendChild(buttonRight.element);
        }
    }

    window.Scoreboard = Scoreboard;
})();