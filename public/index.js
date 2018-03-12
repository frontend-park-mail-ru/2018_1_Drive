const BaseComponent = window.BaseComponent;
const Scoreboard = window.Scoreboard;
const Form = window.Form;
//PUG magic
let name = 'default';
let template = window.menuTemplate(this.name);
let templateSpan = document.createElement('div');
templateSpan.innerHTML = template;
const body = new BaseComponent(document.querySelector('body'));
body.element.appendChild(templateSpan);

const scoreboard = new Scoreboard(document.querySelector('.leaderboard'));
const darkLayer = new BaseComponent(document.querySelector('.shadow'));

const loginForm = new Form('login');
const registerForm = new Form('register');
const settingsForm = new Form('settings');

const loginButton = new BaseComponent(document.querySelector('.button-login'));
const registerButton = new BaseComponent(document.querySelector('.button-register'));
const leaderboardButton = new BaseComponent(document.querySelector('.button-leaderboard'));
// const template = window.scoreboardTemplate();


switch (window.location.hostname) {
    case 'localhost':
        window.HttpModule.baseUrl = 'http://localhost:8080';
        break;
    case 'frontend-drive.herokuapp.com':
        window.HttpModule.baseUrl = '//backend-drive.herokuapp.com';
        break;
    default:
        window.HttpModule.baseUrl = '';
}


loginForm.render(
    'Login', [
        ['mail', 'login'],
        ['password', 'password'],
        ['remember', 'checkbox']
    ], 'Log me in!');
darkLayer.element.appendChild(loginForm.element);

registerForm.render(
    'Register', [
        ['mail', 'login'],
        ['login', 'login'],
        ['password', 'password'],
        ['password-submit', 'password']
    ], 'Register me');
darkLayer.element.appendChild(registerForm.element);

settingsForm.render(
    'Settings', [
        ['mail', 'login'],
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
    scoreboard.loadData();
    darkLayer.show();
    scoreboard.show();
});

darkLayer.on('click', () => {
    loginForm.hide();
    registerForm.hide();
    scoreboard.hide();
    darkLayer.hide();
});


// userService.auth('username', '12345', function (err, responce) {
//     console.log(err, responce);
// });

