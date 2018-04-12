define('MenuView', function (require) {

    const View = require('View');
    const UsersModel = require('UsersModel');

    return class MenuView extends View {
        constructor() {
            super('Menu', window.menuViewTemplate);
        }


        render() {
            // todo
            // if (UsersModel.isAuthorized());
            return super.render();
        }
    };

});