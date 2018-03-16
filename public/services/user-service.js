(function () {
    'use strict';

    const httpModule = window.HttpModule;

    class UserService {
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
            this.loadMe((err, me) => {
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

        static loadUsers(firstManPos, amountOfPeople, callback) {
            httpModule.doGet({
                url: `/leaders/${firstManPos}/${amountOfPeople}`,
                callback
            });
        }

        static logout() {
            httpModule.doGet({
                url: '/logout';
            })
        }

        static RegOrSignin(type, formData) {

            if (type === 'register') {
                console.info('Регистрация пользователя', formData);
                this.signupUser(formData, (err) => {
                    if (err) {
                        alert('Wrong: ' + err);
                        return;
                    }
                    UserService.checkAuth();
                });

            } else if (type === 'login') {
                this.loginUser(formData, (err) => {
                    if (err) {
                        alert('Wrong: '+ err);
                        return;
                    }

                    UserService.checkAuth();
                });
            }
        }

    }

    window.UserService = UserService;
})();