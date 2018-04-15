import {View} from '../View/view';
import {UsersModel} from '../../models/UsersModel';
import {FormComponent} from '../../blocks/form/form';
//import {formViewTemplate} from '../../blocks/form/form-view.pug';
const formViewTemplate = require('../../blocks/form/form-view.pug');
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