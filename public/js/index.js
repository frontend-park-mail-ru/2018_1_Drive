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

(function () {

    document.addEventListener('DOMContentLoaded', function () {

        // const BaseComponent = window.BaseComponent;
        // const Scoreboard = window.Scoreboard;
        // const Form = window.Form;
        // const body = new BaseComponent(document.querySelector('body'));
        //
        // //body.element.innerHTML += window.menuViewTemplate(this);
        //
        // const scoreboard = new Scoreboard(document.querySelector('.leaderboard'));
        // const darkLayer = new BaseComponent(document.querySelector('.shadow'));
        //
        // const loginForm = new Form(document.querySelector('.login'), 'login');
        // const registerForm = new Form(document.querySelector('.register'), 'register');
        // const settingsForm = new Form(document.querySelector('.settings'), 'settings');
        //
        // const loginButton = new BaseComponent(document.querySelector('.button-login'));
        // const settingsButton = new BaseComponent(document.querySelector('.button-settings'));
        // const registerButton = new BaseComponent(document.querySelector('.button-register'));
        // const leaderboardButton = new BaseComponent(document.querySelector('.button-leaderboard'));
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
        rooter.add('/game/online-mode', GameView);
        rooter.add('/game/offline-mode', GameView);
        rooter.start();

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




        // loginForm.render(
        //     'Login', [
        //         ['mail', 'text', 'login-mail'],
        //         ['password', 'password', 'login-password'],
        //         ['remember', 'checkbox', 'remember']
        //     ], 'Log me in!');
        // body.element.appendChild(loginForm.element);
        //
        // registerForm.render(
        //     'Register', [
        //         ['mail', 'text', 'register-mail'],
        //         ['login', 'text', 'register-login'],
        //         ['password', 'password', 'register-password'],
        //         ['passwordSubmit', 'password', 'register-submit']
        //     ], 'Register me');
        // body.element.appendChild(registerForm.element);
        //
        // settingsForm.render(
        //     'Settings', [
        //         ['mail', 'text', 'settings-mail'],
        //         ['login', 'text', 'settings-login'],
        //         ['password', 'password', 'settings-password'],
        //         ['password-submit', 'password', 'settings-submit']
        //     ],
        //     'Apply'
        // );
        //
        // body.element.appendChild(scoreboard.element);


        // loginButton.on('click', () => {
        //     darkLayer.show();
        //     loginForm.show();
        // });
        // registerButton.on('click', () => {
        //     darkLayer.show();
        //     registerForm.show();
        // });
        //
        // leaderboardButton.on('click', () => {
        //     scoreboard.loadDataAndRender();
        //     darkLayer.show();
        //     scoreboard.show();
        // });
        //
        //
        // darkLayer.on('click', () => {
        //     settingsForm.hide();
        //     loginForm.hide();
        //     registerForm.hide();
        //     scoreboard.hide();
        //     scoreboard.setFirstPage();
        //     darkLayer.hide();
        // });
    });
})();
