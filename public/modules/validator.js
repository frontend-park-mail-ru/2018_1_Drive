(function() {
    'use strict';

    class Validator {
        static Validate(arr) {
            let errors = {};

            //--------------E-mail tests
            let mailReg = /.+@.+\..+/i;//https://habrahabr.ru/post/175375/
            let passReg = /(?=.*[0-9])(?=.*[a-z])/i;
            if (!mailReg.test(arr['e-mail'])) {
                errors['e-mail'] = 'E-mail should be like example@sth.com';
            }

            //-------------Password tests
            if (arr['password'].length < 7) {
                errors['password'] = 'password must be 7 characters at least';
            } else if (!passReg.test(arr['password'])) {
                errors['password'] = 'password should have numbers and chars!';
            } else if (arr.hasOwnProperty('password-submit') && arr['password-submit'] !== arr['password']) {
                errors['password'] = 'passwords should be the same';
            }

            //-----------Login tests
            if (arr.hasOwnProperty('login')) {
                if (!/^[A-Z][a-z][0-9]*/.test(arr['login'])){
                    errors['login'] = 'Only letters and numbers!'
                }
                if (arr['login'].length < 7) {
                    errors['login'] = 'Login must be  7 characters at least.';
                }
            }
            //return errors like {"problem-source1":"problem description 1", ...}
            return errors;
        }
    }

    window.Validator = Validator;

})();