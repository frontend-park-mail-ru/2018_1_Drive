import {HttpModule} from './modules/http';
import {Ws} from './modules/ws';
import * as busSingletone from './modules/bus';
import {Router} from './modules/router';
import {MenuView} from './views/MenuView/index';
import {LoginView} from './views/LoginView/index';
import {SignupView} from './views/SignupView/index';
import {ScoreboardView} from './views/ScoreboardView/index';
import {GameView} from './views/GameView/index';
import {UsersModel} from './models/UsersModel';
import {SettingsView} from './views/SettingsView/SettingsView';
import {LogoutView} from './views/LogoutView/LogoutView';

(function () {

    document.addEventListener('DOMContentLoaded', function () {

        const root = document.getElementById('application');
        const bus = busSingletone.getInstance();

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

        const rooter = new Router(root);
        rooter.add('/', MenuView);
        rooter.add('/signin', LoginView);
        rooter.add('/signup', SignupView);
        rooter.add('/leaderboard', ScoreboardView);
        rooter.add('/settings', SettingsView);
        rooter.add('/logout', LogoutView);
        rooter.add('/offline-game', GameView);
        //rooter.add('/game/offline-mode', GameView);
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
