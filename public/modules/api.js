(function () {
    'use strict';

    const httpModule = window.HttpModule;

    class ApiMethods {
        static signupUser(user, callback) {
            httpModule.doPost({
                url: '/register',
                callback,
                data: user
            });
        }

        static loginUser(user, callback) {
            httpModule.doPost({
                url: '/signin',
                callback,
                data: user
            });
            console.dir(user);
        }

        static checkAuth() {
            this.loadMe(function (err, me) {
                if (err) {
                    console.dir(me);
                    console.log('Вы не авторизованы');
                    return;
                }

                console.log('me is', me);
                alert('Добро пожаловать!');
            });
        }

        static loadMe(callback) {
            httpModule.doGet({
                url: '/user',
                callback
            });
        }

        static loadAllUsers(callback) {
            httpModule.doGet({
                url: '/leaders',
                callback
            });
        }

        static RegOrSignin(type, formData) {

            if (type === 'register') {
                console.info('Регистрация пользователя', formData);
                this.signupUser(formData, function (err) {
                    if (err) {
                        alert('Wrong: ' + err);
                        return;
                    }
                    ApiMethods.checkAuth();
                });

            } else if (type === 'login') {
                this.loginUser(formData, function (err) {
                    if (err) {
                        alert('Wrong: '+ err);
                        return;
                    }

                    ApiMethods.checkAuth();
                });
            }
        }

    }

    window.ApiMethods = ApiMethods;
})();