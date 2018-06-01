import {HttpModule} from './modules/http';
import * as busSingletone from './modules/bus';
import {Router} from './modules/router';
import {MenuView} from './views/MenuView/index';
import {LoginView} from './views/LoginView/index';
import {SignupView} from './views/SignupView/index';
import {ScoreboardView} from './views/ScoreboardView/index';
import {GameView} from './views/GameView/index';
import {UsersModel} from './models/UsersModel';
import {ProfileView} from './views/ProfileView/index';
import * as UserSingletone from './services/user-singletone';
import {MultiPlayerGameView} from './views/MultiplayerGame/index';
import {GameRoomView} from './views/GameRoomView';
import '../css/styles.scss';
import {MainPreloader} from './blocks/main-preloader';
import {NotFoundView} from './views/NotFoundView/index';

(function () {

    //empty commit
    document.addEventListener('DOMContentLoaded', function () {

        const root = document.getElementById('application');
        const preloader = new MainPreloader(root);

        const bus = busSingletone.getInstance();
        const userSingletone = UserSingletone.getInstance();

        switch (window.location.hostname) {
            case 'localhost':
                HttpModule.baseUrl = 'http://localhost:8080';
                break;
            case 'frontend-drive.herokuapp.com':
                HttpModule.baseUrl = 'https://backend-drive.herokuapp.com';
                break;
            default:
                HttpModule.baseUrl = '';
        }

        const rooter = new Router(root);

        const authorizeAndStart = async () => {
            await UsersModel.auth()
                .then((user) => {
                    userSingletone.setUser(user);
                    console.log('in index.js auth.then and user is:');
                    console.dir(user);
                })
                .catch(() => {
                    userSingletone.setUser(null);
                    console.log('in index.js auth.catch');
                });

            rooter.add('/', MenuView);
            rooter.add('/signin', LoginView);
            rooter.add('/signup', SignupView);
            rooter.add('/leaderboard', ScoreboardView);
            rooter.add('/profile', ProfileView);
            rooter.add('/offline-game', GameView);
            rooter.add('/multiplayer-game', GameRoomView);
            rooter.add('/not-found', NotFoundView);
            rooter.start();
        };

        authorizeAndStart().then(() => {preloader.stop();});

        bus.on('signin', function (userdata) {
            UsersModel.login(userdata.mail, userdata.password)
                .then(function (user) {
                    userSingletone.setUser(user);
                    new Router().open('/');
                })
                .catch(function (error) {
                    bus.emit('login-error', error);
                });
        });


        bus.on('signup', function (userdata) {
            UsersModel.signup(userdata)
                .then(function (user) {
                    userSingletone.setUser(user);
                    new Router().open('/');
                })
                .catch(function (error) {
                    bus.emit('signup-error', error);
                    console.log(error);
                });
        });


        bus.on('logout', function () {
            UsersModel.logout()
                .then(function () {
                    userSingletone.logout();
                    new Router().open('/');
                })
                .catch(function (error) {
                        bus.emit('logout-error', error);
                });
        });

        bus.on('profile-settings', function (user) {
            rooter.open('/profile', user);
        });
      
        bus.on('home', () => {
            rooter.open('/');
        });

        bus.on('openNotFound', () => {
            rooter.open('/not-found');
        });
    });
})();
