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
    }

    getFirstPosition() {
        return (this.page - 1) * this.playersOnPage;
    }

    render() {
        let usersBlock = this.element.querySelector('.menu');
        usersBlock.innerHTML = this.template(this.users);

        this.prevButton = new BaseComponent( usersBlock.querySelector('.pagination-prev'));
        this.prevButton.on('click', () => {
            if (this.page === 1) {
                return;
            }
            if (this.stopRendrer) this.stopRendrer = false;
            this.page--;
            this.updateAction();
        });

        if (this.page === 1) {
            this.prevButton.hide();
        }

        this.nextButton =  new BaseComponent(usersBlock.querySelector('.pagination-next'));
        this.nextButton.on('click', () => {
            if (this.stopRendrer) {
                return;
            }
            this.page++;
            this.updateAction();
        });
    }
}
