import {View} from '../View/view';
import {UsersModel} from '../../models/UsersModel';
import * as busSingletone from '../../modules/bus';
import {Validator} from '../../modules/validator';
import {HomeButton} from '../../blocks/home-button/HomeButton';
const loginViewTemplate = require('./login-view.pug');

export class LoginView extends View {
    constructor() {
        super('Login', loginViewTemplate);
        busSingletone.getInstance().on('login-error', this.onerror.bind(this));
    }

    allowed() {
        return !UsersModel.isAuthorized();
    }

    create() {
        super.render();
        super.hide();
        const loginButton = this.el.querySelector('.main__action-button');
        loginButton.addEventListener('click', () => {
            this.onSubmit(this.getFields());
        });
        const homeButton = new HomeButton();
        homeButton.render(this.el);
        return this;
    }

    onSubmit(formData) {
        const errWindow = this.el.querySelector('.main__errors');
        errWindow.innerHTML = '';
        let errors = Validator.validate(formData);
        if (Object.keys(errors).length > 0) {
            for (let error in errors) {
                errWindow.innerHTML += errors[error] + '<br>';
            }
            return;
        }
        busSingletone.getInstance().emit('signin', formData);
    }

    getFields() {
        const formData = {};
        const fields = this.el.querySelectorAll('input');
        for (let field of fields) {
            formData[field.name] = field.value;
        }
        return formData;
    }

    onerror() {
        const errWindow = this.el.querySelector('.main__errors');
        errWindow.innerHTML = 'User doesn\'t exists';
    }
}
