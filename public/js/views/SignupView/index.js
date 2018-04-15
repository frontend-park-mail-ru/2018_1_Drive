import {View} from '../View/view';
import {FormComponent} from '../../blocks/form/form';
import {UsersModel} from '../../models/UsersModel';
//import {formViewTemplate} from '../../blocks/form/form-view.pug';
const formViewTemplate = require('../../blocks/form/form-view.pug');
export class SignupView extends View {
    constructor() {
        super('Register', formViewTemplate);
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
}
