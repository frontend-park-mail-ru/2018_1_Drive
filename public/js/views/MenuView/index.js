define('MenuView', function (require) {

    const View = require('View');
    const UsersModel = require('UsersModel');

    return class MenuView extends View {
        constructor() {
            super('Menu', window.menuViewTemplate);
        }


        render() {

            UsersModel.auth()
                .then((user) => super.render({authorized: true, login: user.login}))
                .catch(() =>super.render({authorized: false}));

            return this;
        }
    };

});