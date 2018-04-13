define('SettingsView', function (require) {

    const View = require('View');
    const UserModel = require('UsersModel');

    return class SettingsView extends View {
        constructor() {
            super('Settings', window.settingViewTemplate);
        }

        create() {
            const user = UserModel.getCurrentUser();
            this.attrs = {
                login: user.login,
                mail: user.mail,
                score: user.score
            };
            super.create();
            return this;
        }

    };

});