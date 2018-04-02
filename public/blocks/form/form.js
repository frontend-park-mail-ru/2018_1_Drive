(function () {
    'use strict';

    const BaseComponent = window.BaseComponent;
    const Button = window.Button;
    const Validator = window.Validator;
    const UserService = window.UserServiceSingleton;

    class Form extends BaseComponent {
        //Constructs simple form
        //@param {string} type - type of form: registration/login/settings
        constructor(element, type) {
            super(element);
            this.type = type;
        }

        /**
         *Rendering form
         *Generates a context-menu with a form
         *@param {string} caption - h1 header of form
         *@param {2D array of strings} fields - types, names and for's for inputs and labels
         *@param {string} buttonCaption - title on the button.
         */
        render(caption, fields, buttonCaption) {
            this.caption = caption;
            this.fields = fields;
            this.buttonCaption = buttonCaption;
            this.element.innerHTML = "<img src = './static/img/default_avatar.jpg'>"
            this.element.innerHTML += window.formViewTemplate(this);
            this.form = this.element.querySelector('form');
            const button = new Button(
                this.element.querySelector('.button'), () => {
                    this.submitForm();
                });
        }

        //Collects all data from the form and writes down all errors
        submitForm() {
            const formData = {};//All data from form. Looks like {'password':1234,'login':'imtired'}
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
            let errors = Validator.Validate(formData);
            const errWindow = this.form.querySelector('.errors');
            errWindow.innerHTML = '';
            if (Object.keys(errors).length > 0) {
                //all the errors in the data
                for (let error in errors) {
                    errWindow.innerHTML += error + ' error!';
                    errWindow.innerHTML += errors[error] + '<br>';
                }
            }
            else {
                //if you're here, means all data is valid
                this.form.reset();
                darkLayer.element.click();
                UserService.getInstance().RegOrSignin(this.type, formData);
            }

        }
    }

    window.Form = Form;
})();
