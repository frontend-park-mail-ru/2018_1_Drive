define('FormComponent', function (require) {

    const BaseComponent = require('BaseComponent');
    const Button = require('Button');
    //const Validator = window.Validator;

    return class Form extends BaseComponent {
        constructor(element, params, callback) {
            super(element);
            this.type = params.type;
            this.caption = params.caption;
            this.fields = params.fields;
            this.buttonCaption = params.buttonCaption;
            this._callback = callback;
        }


        init() {
            this.form = this.element.querySelector('form');
            const button = new Button(
                this.element.querySelector('.button'), () => {
                    this._callback(this.getFields());
                });
        }


        render() {
            //todo pictures
            //this.element.innerHTML = '<img src = \'./static/img/default_avatar.jpg\'>';
            this.element.innerHTML += window.formViewTemplate(this);
        }


        getFields() {
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
            return formData;
        }


        // submitForm() {
        //     const formData = {};//All data from form. Looks like {'password':1234,'login':'imtired'}
        //     const fields = this.form.querySelectorAll('input');
        //     for (let field of fields) {
        //         if (field.files && field.files.length > 0) {
        //             //File is uploaded
        //         }
        //         if (!field.hasAttribute('checked')) {
        //             formData[field.name] = field.value;
        //         }
        //         else {
        //             formData[field.name] = field.checked;
        //         }
        //     }
        //     let errors = Validator.Validate(formData);
        //     const errWindow = this.form.querySelector('.errors');
        //     errWindow.innerHTML = '';
        //     if (Object.keys(errors).length > 0) {
        //         //all the errors in the data
        //         for (let error in errors) {
        //             errWindow.innerHTML += error + ' error!';
        //             errWindow.innerHTML += errors[error] + '<br>';
        //         }
        //     }
        //     else {
        //         //if you're here, means all data is valid
        //         this.form.reset();
        //         darkLayer.element.click();
        //         UserService.getInstance().RegOrSignin(this.type, formData)
        //             .then(this.hide());
        //     }
        //
        // }
    };

});
