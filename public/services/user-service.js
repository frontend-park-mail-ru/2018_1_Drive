(function () {
    'use strict';

    const Http = window.Http;

    class UserService {

        constructor() {

        }

        auth(login, password, callback) {
            const user = {login, password};
            Http.Post('/auth', user, callback);
        }

        whoami(callback) {
            Http.Get('/me', callback());
        }

        loadUsers(callback) {
            Http.Get('/users', callback);
        }
    }

    window.UserService = UserService;
})();