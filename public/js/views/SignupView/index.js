define('SignupView', function(require) {
    const View = require('View');
    const FormComponent = require('FormComponent');
    const UsersModel = require('UsersModel');

    return class SignupView extends View {
        constructor() {
            super('Register', window.formViewTemplate);
            this.attrs = {
                caption: 'Register',
                fields: [
                    ['mail', 'text', 'register-mail'],
                    ['login', 'text', 'register-login'],
                    ['password', 'password', 'register-password'],
                    ['passwordSubmit', 'password', 'register-submit']
                ],
                buttonCaption: 'Register me'
            };
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

        onSubmit(formdata) {
            this.bus.emit('signup', formdata);
        }

    };

});