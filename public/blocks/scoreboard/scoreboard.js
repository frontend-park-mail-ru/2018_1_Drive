(function () {
    'use strict';

    const BaseComponent = window.BaseComponent;
    const UserService = window.UserService;

    class Scoreboard extends BaseComponent {
        constructor(element) {
            super(element);
            this.allUsers = [];
            this.page = 1;
            this.playersOnPage = 5;
        }

        loadDataAndRender() {
            const firstManPosition = (this.page - 1) * this.playersOnPage + 1;

            UserService.loadUsers(firstManPosition, this.playersOnPage, (err, response) => {
                if (err) {
                    console.error(err);
                    return;
                }

                if (!response.success) {
                    alert(response.status);
                }

                this.usersLeft = response.usersLeft;
                this.allUsers = response.users;
                this.render();
            });
        }

        render() {

            this.element.innerHTML = window.scoreboardViewTemplate(this);
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
                    if (this.usersLeft === 0) {
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