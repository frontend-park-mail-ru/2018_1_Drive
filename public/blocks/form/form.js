(function () {
    'use strict';

    const BaseComponent = window.BaseComponent;
    const Button = window.Button;
    const Validator = window.Validator;

    class Form extends BaseComponent {
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

        submitForm() {
            const formData = {};
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
                for (let error in errors) errWindow.innerHTML += error + " error! " + errors[error] + "<br>";
            }
            else {
                console.log('alright');
            }
        }
    }

    window.Form = Form;
})();