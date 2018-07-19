import {View} from '../View/view';
import {FormComponent} from '../../blocks/form/form';
import {UsersModel} from '../../models/UsersModel';
import * as busSingleton from '../../modules/bus';
import {Validator} from '../../modules/validator';
const signupViewTemplate = require('./signup-view.pug');


export class SignupView extends View {
    constructor() {
        super('Register', signupViewTemplate);
        busSingleton.getInstance().on('signup-error', this.onerror.bind(this));
    }

    allowed() {
        return !UsersModel.isAuthorized();
    }

    create() {
        super.create();
        super.hide();
        const registerButton = this.el.querySelector('.main__action-button');
        registerButton.addEventListener('click', () => {
            this.onSubmit(this.getFields());
        });
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
        busSingleton.getInstance().emit('signup', formData);
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
        const errWindow = this.formComponent.element.querySelector('.errors');
        errWindow.innerHTML = 'User already exists!';
    }

}
