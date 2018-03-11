(function () {
    'use strict';

    const BaseComponent = window.BaseComponent;
    const Button = window.Button;
    const Validator = window.Validator;

    class Form extends BaseComponent {
        //Constructs simple form
        //@param {string} type - type of form: registration/login/settings
        constructor(type) {
            const element = document.createElement('div');
            element.setAttribute('class', 'menu menu-modal ' + type);
            element.setAttribute('onclick', 'event.stopPropagation();');
            super(element);
            const form = document.createElement('form');
            form.setAttribute('enctype', 'multipart/form-data');
            this.element.appendChild(form);
            this.form = form;
            this.type = type;
        }
        //Rendering form
        //Generates a context-menu with a form
        //@param {string} caption - h1 header of form
        //@param {2D array of strings} fields - types, names and for's for inputs and labels
        //@param {string} buttonCaption - title on the button.
        render(caption, fields, buttonCaption) {
            const cap = document.createElement('h1');
            cap.innerHTML = caption;
            this.form.appendChild(cap);

            for (let field of fields) {
                let label = document.createElement('label');
                label.setAttribute('for', field[0]);
                label.innerHTML = field[0] + ': ';
                this.form.appendChild(label);
                let input = document.createElement('input');
                input.setAttribute('name', field[0]);
                input.setAttribute('type', field[1]);
                this.form.appendChild(input);
                let br = document.createElement('br');
                this.form.appendChild(br);
            }
            let err = document.createElement('div');
            err.setAttribute('class', 'errors');
            this.form.appendChild(err);
            const button = new Button(() => {
                this.submitForm();
            }, buttonCaption, '');
            button.appendAsChild(this.form);
        }
        //Collects all data from the form and writes down all errors
        submitForm() {
            const formData = {};//All data from form. Looks like {'password':1234,'login':'imtired'}
            const fields = this.form.querySelectorAll('input');
            for (let field of fields) {
                if (field.files !== null && field.files.length > 0) {
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
                for (let error in errors) errWindow.innerHTML += error + " error! " + errors[error] + "<br>";
            }
            else {
                //if you're here, means all data is valid
                console.log('alright');

            }
        }
    }

    window.Form = Form;
})();