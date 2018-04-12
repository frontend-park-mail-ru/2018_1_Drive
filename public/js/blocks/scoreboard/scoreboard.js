define('ScoreboardComponent', function () {

    const BaseComponent = require('BaseComponent');
    //todo preloader
    //const Preloader = window.Preloader;
    const template = window.scoreboardViewTemplate;

    return class Scoreboard extends BaseComponent {
        constructor(element) {
            super(element);
            this.users = [];
            this.page = 1;
            this.playersOnPage = 5;
            //this.preloader = new Preloader(this, 'scoreboard-preloader');
            //this.preloader.appendItself();
            this.stopRendrer = false;
        }

        getFirstPosition() {
            return (this.page - 1) * this.playersOnPage;
        }

        // loadDataAndRender() {
        //
        //     UserService.getInstance().loadUsers(firstManPosition, this.playersOnPage)
        //             .then(response => {
        //                 if (response.users.length !== 0) {
        //                     this.allUsers = response.users;
        //                     this.stopRendrer = false;
        //                 } else  {
        //                     this.stopRendrer = true;
        //                  }
        //                 //this.preloader.stop();
        //                 this.render();
        //             })
        //             .catch(error => { console.error(error);});
        // }

        render() {
            let usersBlock = this.element.querySelector('.leaderboard-body');
            usersBlock.innerHTML = template(this);
            let paginatorPrevButton = new Button (this.element.querySelector('.pagination-prev'),
                () => {
                    if (this.page === 1) {
                        return;
                    }
                    this.page--;
                    //this.loadDataAndRender();
                });

            let paginatorNextButton = new Button (this.element.querySelector('.pagination-next'),
                () => {
                    if (this.stopRendrer) {
                        return;
                    }
                    this.page++;
                    //this.loadDataAndRender();
                });
        }

        setFirstPage() {
            this.page = 1;
        }
    };

});
