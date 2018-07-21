import {BaseComponent} from '../baseComponent';
const scoreboardViewTemplate = require('./scoreboard-body.pug');


export class ScoreboardComponent extends BaseComponent {
    constructor(element, onUpdate) {
        super(element);
        this.users = [];
        this.page = 1;
        this.playersOnPage = 7;
        this.updateAction = onUpdate;
        this.template = scoreboardViewTemplate;
        this.pagePositions = {first:'first', middle:'middle', last:'last'};
        this.pagePosition = this.pagePositions.first;
    }

    getFirstPosition() {
        return (this.page - 1) * this.playersOnPage;
    }

    render(users, player, offset) {
        let usersBlock = this.element.querySelector('.js-scoreboard');

        if (users.length === this.playersOnPage + 1 && this.page !== 1) {
            this.users = users.slice(0, users.length - 1);
            this.pagePosition = this.pagePositions.middle;
        } else if (this.page === 1){
            this.pagePosition = this.pagePositions.first;
            this.users = users.slice(0, users.length - 1);
        } else {
            this.pagePosition = this.pagePositions.last;
            this.users = users;
        }

        let currentPlayerLogin;
        if (!player) {
            currentPlayerLogin = null;
        } else {
            currentPlayerLogin = player.login;
        }

        usersBlock.innerHTML = this.template({
            users:this.users,
            currentPlayer: currentPlayerLogin,
            //не желаю лезть в бэк, поэтому позицию на фронте посчитаем
            offset: offset
        });
        this.prevButton = new BaseComponent(usersBlock.querySelector('.js-pagination-prev'));

        this.prevButton.on('click', () => {
            if (this.page === 1) return;
            this.page--;
            this.updateAction();
        });

        if (this.page === 1) {
            this.prevButton.element.classList.remove('pink-font', 'animation-on-hover', 'pagination-prev');
            this.prevButton.element.classList.add('md-inactive');
        }

        this.nextButton =  new BaseComponent(usersBlock.querySelector('.js-pagination-next'));
        this.nextButton.on('click', () => {
            if (this.pagePosition === this.pagePositions.last) return;
            this.page++;
            this.updateAction();
        });

        if (this.pagePosition === this.pagePositions.last) {
            this.nextButton.element.classList.remove('pink-font', 'animation-on-hover', 'pagination-next');
            this.nextButton.element.classList.add('md-inactive');
        }
    }

    highlightLogin(login) {
        const usersRows = this.element.querySelectorAll('.table__tr');
        this.users.forEach((el, index) => {
           if (el.login === login) {
               usersRows[index + 1].classList.add('js-current-player');
           }
        });
    }
}
