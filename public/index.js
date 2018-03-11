//    "build": "pug ./public/blocks/scoreboard/scoreboard.pug -c -n scoreboard"
const Validator = window.Validator;
const UserService = window.UserService;
const BaseComponent = window.BaseComponent;
const Scoreboard = window.Scoreboard;
const Button = window.Button;
const Form = window.Form;

const userService = new UserService();
const scoreboard = new Scoreboard(document.querySelector('.leaderboard'));
const darkLayer = new BaseComponent(document.querySelector('.shadow'));

const loginForm = new Form('login');
const registerForm = new Form('register');
const settingsForm = new Form('settings');

const loginButton = new BaseComponent(document.querySelector('.button-login'));
const registerButton = new BaseComponent(document.querySelector('.button-register'));
const settingsButton = new BaseComponent(document.querySelector('.button-settings'));
const leaderboardButton = new BaseComponent(document.querySelector('.button-leaderboard'));

loginForm.render(
    'Login', [
        ['e-mail', 'login'],
        ['password', 'password'],
        ['remember', 'checkbox']
    ], 'Log me in!');
darkLayer.element.appendChild(loginForm.element);

registerForm.render(
    'Register', [
        ['e-mail', 'login'],
        ['login', 'login'],
        ['password', 'password'],
        ['password-submit', 'password']
    ], 'Register me');
darkLayer.element.appendChild(registerForm.element);

settingsForm.render(
    'Settings', [
        ['e-mail', 'login'],
        ['login', 'login'],
        ['password', 'password'],
        ['password-submit', 'password']
    ],
    'Apply'
);

loginButton.on('click', () => {
    darkLayer.show();
    loginForm.show();
});
registerButton.on('click', () => {
    darkLayer.show();
    registerForm.show();
});
leaderboardButton.on('click', () => {
    scoreboard.render();
    darkLayer.show();
    scoreboard.show();
});
// leaderboardButton.on('click', () => {
//     scoreboard.show();
// });
darkLayer.on('click', () => {
    loginForm.hide();
    registerForm.hide();
    scoreboard.hide();
    darkLayer.hide();
});


// userService.auth('username', '12345', function (err, responce) {
//     console.log(err, responce);
// });

