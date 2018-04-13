define('LoginView', function (require) {
    const View = require('View');
    const FormComponent = require('FormComponent');
    const UsersModel = require('UsersModel');
    const Validator = require('Validator');
    //const shadow = require('darkness');


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

            this.bus.emit('signin', formdata);
        }
    };
});