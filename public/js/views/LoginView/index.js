define('LoginView', function (require) {
    const View = require('View');
    const FormComponent = require('FormComponent');
    const UsersModel = require('UsersModel');

    return class LoginView extends View {
        constructor() {
            super('Login', window.formViewTemplate);
            this.attrs = {
                caption: 'Login',
                fields: [
                    ['mail', 'text', 'login-mail'],
                    ['password', 'password', 'login-password'],
                    ['remember', 'checkbox', 'remember']
                ],
                buttonCaption: 'Log me in!'
            };
            this.bus.on('login-error', this.onerror.bind(this));
        }

        allowed() {
            return !UsersModel.isAuthorized();
        }

        create() {
            super.create();
            this.formRoot = this.el.querySelector('.menu');
            this.formComponent = new FormComponent(this.formRoot, this.attrs, this.onSubmit.bind(this));
            this.formComponent.init();
            return this;
        }

        onerror(err) {
            if (this.active) {
                console.error(err);
            }
        }

        onSubmit(formdata) {
            this.bus.emit('signin', formdata);
        }
    };
});