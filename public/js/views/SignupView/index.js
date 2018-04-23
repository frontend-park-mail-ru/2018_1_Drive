import {View} from '../View/view';
import {FormComponent} from '../../blocks/form/form';
import {UsersModel} from '../../models/UsersModel';
//import {formViewTemplate} from '../../blocks/form/form-view.pug';
import * as busSingleton from '../../modules/bus';
import {Validator} from '../../modules/validator';
const gridViewTemplate = require('../GridView/grid-view.pug');

export class SignupView extends View {
    constructor() {
        super('Register', gridViewTemplate);
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
        busSingleton.getInstance().on('signup-error', this.onerror.bind(this));
    }

    allowed() {
        return !UsersModel.isAuthorized();
    }

    create() {
        super.create();
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

        busSingleton.getInstance().emit('signup', formdata);
    }

    onerror() {
        const errWindow = this.formComponent.element.querySelector('.errors');
        errWindow.innerHTML = 'User already exists!';
    }

}
