(function () {

    document.addEventListener('DOMContentLoaded', function () {

        const HttpModule = require('HttpModule');
        const GameView = require('GameView');
        const Ws = require('Ws');
        const bus = require('bus');
        const root = document.getElementById('application');
        const Router = require('Router');
        const MenuView = require('MenuView');
        const LoginView = require('LoginView');
        const SignupView = require('SignupView');
        const ScoreboardView = require('ScoreboardView');
        const UsersModel = require('UsersModel');

        switch (window.location.hostname) {
            case 'localhost':
                HttpModule.baseUrl = 'http://localhost:8080';
                break;
            case 'frontend-drive.herokuapp.com':
                HttpModule.baseUrl = '//backend-drive.herokuapp.com';
                break;
            default:
                HttpModule.baseUrl = '';
        }
      
        const bus = require('bus');
        const root = document.getElementById('application');
        const Router = require('Router');
        const MenuView = require('MenuView');
        const LoginView = require('LoginView');
        const SignupView = require('SignupView');
        const ScoreboardView = require('ScoreboardView');
        const UsersModel = require('UsersModel');
        const SettingsView = require('SettingsView');
        const LogoutView = require('LogoutView');
      
        const rooter = new Router(root);
        rooter.add('/', MenuView);
        rooter.add('/signin', LoginView);
        rooter.add('/signup', SignupView);
        rooter.add('/leaderboard', ScoreboardView);
        rooter.add('/settings', SettingsView);
        rooter.add('/logout', LogoutView);
        rooter.add('/game/online-mode', GameView);
        rooter.add('/game/offline-mode', GameView);
        rooter.start();

        //todo shadow
        // const shadow = new darkness();

        bus.on('signin', function (userdata) {
            UsersModel.login(userdata.mail, userdata.password)
                .then(function (user) {
                    new Router().open('/');
                })
                .catch(function (error) {
                    bus.emit('login-error', error);
                });
        });


        bus.on('signup', function (userdata) {
            UsersModel.signup(userdata)
                .then(function (user) {
                    new Router().open('/');
                })
                .catch(function (error) {
                    bus.emit('signup-error', error);
                });
        });


        bus.on('logout', function () {
            UsersModel.logout()
                .then(function () {
                    new Router().open('/');
                })
                .catch(function (error) {
                        bus.emit('logout-error', error);
                });
        });


    });
})();
