
export class Validator {
        static validate(arr) {
            let errors = {};

            let mailReg = /.+@.+\..+/i;//https://habrahabr.ru/post/175375/
            let passReg = /(?=.*[0-9])(?=.*[a-z][A-Z])/i;
            if (!mailReg.test(arr.mail)) {
                errors.mail = 'E-mail should be like example@sth.com';
            }

            //Password tests
            if (arr.password.length < 7) {
                errors.password = 'Password must be 7 characters at least';
            } else if (!passReg.test(arr.password)) {
                errors.password = 'Password should have numbers and chars';
            } else if (arr.hasOwnProperty('passwordSubmit') && arr.passwordSubmit !== arr.password) {
                errors.password = 'Passwords should be the same';
            }

            //Login tests
            if (arr.hasOwnProperty('login')) {
                if (!/^[a-z][0-9]*/.test(arr.login.toLowerCase())) {
                    errors.login = 'Only letters and numbers!';
                }
                if (arr.login.length < 7) {
                    errors.login = 'Login must be 7 characters at least';
                }
            }
            //return errors like {"problem-source1":"problem description 1", ...}
            return errors;
        }
}
