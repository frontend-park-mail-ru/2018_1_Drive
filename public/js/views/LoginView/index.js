import {View} from '../View/view';
import {UsersModel} from '../../models/UsersModel';
import {FormComponent} from '../../blocks/form/form';
const formViewTemplate = require('../../blocks/form/form-view.pug');
import * as busSingletone from '../../modules/bus';
import {Validator} from '../../modules/validator';


export class LoginView extends View {
    constructor() {
        super('Login', formViewTemplate);
        this.attrs = {
            caption: 'Login',
            fields: [
                ['mail', 'text', 'login-mail'],
                ['password', 'password', 'login-password'],
                ['remember', 'checkbox', 'remember']
            ],
            buttonCaption: 'Log me in!'
        };
        busSingletone.getInstance().on('login-error', this.onerror.bind(this));
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
        busSingletone.getInstance().emit('signin', formdata);
    }

    onerror() {
        const errWindow = this.formComponent.element.querySelector('.errors');
        errWindow.innerHTML = 'User doesn\'t exists';
    }
}