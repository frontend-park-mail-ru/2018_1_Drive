import {View} from '../View/view';
import {UsersModel} from '../../models/UsersModel';
import {FormComponent} from '../../blocks/form/form';
import * as busSingletone from '../../modules/bus';
import {Validator} from '../../modules/validator';
const gridViewTemplate = require('../GridView/grid-view.pug');

export class LoginView extends View {
    constructor() {
        super('Login', gridViewTemplate);
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
        super.hide();
        this.formRoot = this.el.querySelector('.menu');
        this.formComponent = new FormComponent(this.formRoot, this.attrs, this.onSubmit.bind(this));
        this.formComponent.render();
        this.formComponent.addListeners();
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
