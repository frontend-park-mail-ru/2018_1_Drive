define('LogoutView', function (require) {

    const View = require('View');
    const bus = require('bus');

    return class LogoutView extends View {
        create() {
            this.bus.emit('logout');
        }
    };
});