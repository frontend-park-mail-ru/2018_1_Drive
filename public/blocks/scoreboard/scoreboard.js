(function () {
    'use strict';

    const BaseComponent = window.BaseComponent;
    const Preloader = window.Preloader;
    const UserService = window.UserServiceSingleton;

    class Scoreboard extends BaseComponent {
        constructor(element) {
            super(element);
            this.allUsers = [];
            this.page = 1;
            this.playersOnPage = 5;
            this.preloader = new Preloader(this, 'scoreboard-preloader');
            this.preloader.appendItself();
            this.stopRendrer = false;
        }

        loadDataAndRender() {
            const firstManPosition = (this.page - 1) * this.playersOnPage;
            this.preloader.start();
            UserService.getInstance().loadUsers(firstManPosition, this.playersOnPage, (err, response) => {
                if (err) {
                    console.error(err);
                    return;
                }

                if (!response.success) {
                    alert(response.status);
                }

                if (response.users.length !== 0) {
                    this.allUsers = response.users;
                    this.stopRendrer = false;
                } else  {
                    this.stopRendrer = true;
                }
                this.preloader.stop();
                this.render();
            });
        }

        render() {

            let usersBlock = this.element.querySelector('.leaderboard-body');
            usersBlock.innerHTML = window.scoreboardViewTemplate(this);
            let paginatorPrevButton = new Button (this.element.querySelector('.pagination-prev'),
                () => {
                    if (this.page === 1) {
                        return;
                    }
                    this.page--;
                    this.loadDataAndRender();
                });

            let paginatorNextButton = new Button (this.element.querySelector('.pagination-next'),
                () => {
                    if (this.stopRendrer) {
                        return;
                    }
                    this.page++;
                    this.loadDataAndRender();
                });

        }

        setFirstPage() {
            this.page = 1;
        }
    }

    window.Scoreboard = Scoreboard;
})();
