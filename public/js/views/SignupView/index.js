define('SignupView', function(require) {
    const View = require('View');
    const FormComponent = require('FormComponent');
    const UsersModel = require('UsersModel');
    const Validator = require('Validator');

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
            this.bus.on('signup-error', this.onerror.bind(this));
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
            const errWindow = this.formComponent.element.querySelector('.errors');
            errWindow.innerHTML = '';

            let errors = Validator.validate(formdata);
            if (Object.keys(errors).length > 0) {
                for (let error in errors) {
                    errWindow.innerHTML += error + ' error!';
                    errWindow.innerHTML += errors[error] + '<br>';
                }
                return;
            }

            this.bus.emit('signup', formdata);
        }

        onerror() {
            const errWindow = this.formComponent.element.querySelector('.errors');
            errWindow.innerHTML = 'User already exists!';
        }

    };

});