import {BaseComponent} from '../baseComponent';
import {Button} from '../button/button';
//import {formViewTemplate} from './form-view.pug';
//const Validator = window.Validator;
const formViewTemplate = require('./form-view.pug');

export class FormComponent extends BaseComponent {
    constructor(element, params, callback) {
        super(element);
        this.type = params.type;
        this.caption = params.caption;
        this.fields = params.fields;
        this.buttonCaption = params.buttonCaption;
        this._callback = callback;
        this.template = formViewTemplate;
    }

    addListeners() {
        this.form = this.element.querySelector('form');
        const button = new Button(
            this.element.querySelector('.button'), () => {
                this._callback(this.getFields());
            });
    }

    render() {
        this.element.innerHTML = this.template(this);
    }

    getFields() {
        const formData = {};
        const fields = this.form.querySelectorAll('input');
        for (let field of fields) {
            if (field.files && field.files.length > 0) {
                //File is uploaded
            }
            if (!field.hasAttribute('checked')) {
                formData[field.name] = field.value;
            }
            else {
                formData[field.name] = field.checked;
            }
        }
        return formData;
    }

}

