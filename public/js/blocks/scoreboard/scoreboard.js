import {BaseComponent} from '../baseComponent';
const scoreboardViewTemplate = require('./scoreboard-body.pug');
//TODO: preloader

export class ScoreboardComponent extends BaseComponent {

    constructor(element, onUpdate) {
        super(element);
        this.users = [];
        this.page = 1;
        this.playersOnPage = 5;
        this.updateAction = onUpdate;
        this.template = scoreboardViewTemplate;
        //this.preloader = new Preloader(this, 'scoreboard-preloader');
        //this.preloader.appendItself();
        this.stopRendrer = false;

        this.element.querySelector('.pagination-prev').addEventListener('click', () => {
            if (this.page === 1) {
                return;
            }
            if (this.stopRendrer) this.stopRendrer = false;
            this.page--;
            this.updateAction();
        });


        this.element.querySelector('.pagination-next').addEventListener('click', () => {
            if (this.stopRendrer) {
                return;
            }
            this.page++;
            this.updateAction();
        });
    }

    getFirstPosition() {
        return (this.page - 1) * this.playersOnPage;
    }

    render() {
        let usersBlock = this.element.querySelector('.leaderboard-body');
        usersBlock.innerHTML = this.template(this);
    }

}
