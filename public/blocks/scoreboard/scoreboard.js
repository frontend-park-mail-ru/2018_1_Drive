(function () {
    'use strict';

    const BaseComponent = window.BaseComponent;
    const Button = window.Button;
    const players = [
        ['Name1', 10000],
        ['Name2', 1000],
        ['Name3', 100],
        ['Name4', 11],
        ['Name5', 10],
        ['Name6', 1]
    ];


    class Scoreboard extends BaseComponent {
        constructor(leaderboard) {
            super(leaderboard);
        }

        //Renders scoreboard
        //TODO:
        //@param {2D string-int array} players - list of ten players to be shown on the page
        //@param {int} page - current page with players
        render() {
            this.element.innerHTML = ' ';
            const head = new Button(null, 'Top players', '');
            this.element.appendChild(head.element);

            for (let player of players) {
                const str = document.createElement('div');
                str.setAttribute('class', 'clearfix player');
                const name = document.createElement('div');
                const score = document.createElement('div');
                name.setAttribute('class', 'floated-left');
                score.setAttribute('class', 'floated-right');

                name.innerHTML = player[0];
                score.innerHTML = player[1];
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