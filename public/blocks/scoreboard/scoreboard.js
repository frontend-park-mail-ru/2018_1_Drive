(function () {
    'use strict';

    const BaseComponent = window.BaseComponent;
    const ApiMethods = window.ApiMethods;

    class Scoreboard extends BaseComponent {
        constructor(element) {
            super(element);
            this.allUsers = [];
        }

        loadData() {
            ApiMethods.loadAllUsers((err, response) => {
                if (err) {
                    console.error(err);
                    return;
                }

                if (response.success !== 'true') {
                    alert(response.status);
                }

                this.allUsers = response.users;
            });
        }


        render() {
            this.loadData();
            this.element.innerHTML = window.scoreboardViewTemplate(this);
        }
    }

    window.Scoreboard = Scoreboard;
})();