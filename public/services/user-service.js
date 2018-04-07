
const UserServiceSingleton = (function () {
    'use strict';

    const httpModule = window.HttpModule;

    class UserService {
        signupUser(user, callback) {
            httpModule.doPost({
                url: '/register',
                callback,
                data: user
            });
        }

        loginUser(user, callback) {
            httpModule.doPost({
                url: '/signin',
                callback,
                data: user
            });
        }

        checkAuth() {
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

        loadMe(callback) {
            httpModule.doGet({
                url: '/user',
                callback
            });
        }

        loadUsers(firstManPos, amountOfPeople, callback) {
            httpModule.doGet({
                url: `/leaders/${firstManPos}/${amountOfPeople}`,
                callback
            });
        }

        logout() {
            httpModule.doGet({
                url: '/logout'
            });
        }

        RegOrSignin(type, formData) {

            if (type === 'register') {
                console.info('Регистрация пользователя', formData);
                this.signupUser(formData, (err, response) => {
                    if (err) {
                        alert('Пользователь с такими данными уже существует');
                        return;
                    }
                    alert('Ваш login: ' + response.user.login + ' и почта: ' + response.user.mail);
                });

            } else if (type === 'login') {
                this.loginUser(formData, (err, response) => {
                    if (err) {
                        alert('Пользователь не существует');
                        return;
                    }

                    alert('Привет ' + response.user.login +'!');
                });
            }
        }

    }

    let instance;

    function createInstance() {
        return new UserService();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };

})();

window.UserServiceSingleton = UserServiceSingleton;