const BaseComponent = window.BaseComponent;
const Scoreboard = window.Scoreboard;
const Form = window.Form;
const body = new BaseComponent(document.querySelector('body'));

//PUG magic
let name = 'default';
let template = window.menuViewTemplate(this);
body.element.innerHTML += template;

const scoreboard = new Scoreboard(document.querySelector('.leaderboard'));
const darkLayer = new BaseComponent(document.querySelector('.shadow'));

const loginForm = new Form(document.querySelector('.login'),'login');
const registerForm = new Form(document.querySelector('.register'),'register');
const settingsForm = new Form(document.querySelector('.settings'),'settings');

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

scoreboard.render();
loginForm.render(
    'Login', [
        ['mail', 'login'],
        ['password', 'password'],
        ['remember', 'checkbox']
    ], 'Log me in!');
body.element.appendChild(loginForm.element);

registerForm.render(
    'Register', [
        ['mail', 'login'],
        ['login', 'login'],
        ['password', 'password'],
        ['passwordSubmit', 'password']
    ], 'Register me');
body.element.appendChild(registerForm.element);

settingsForm.render(
    'Settings', [
        ['mail', 'login'],
        ['login', 'login'],
        ['password', 'password'],
        ['password-submit', 'password']
    ],
    'Apply'
);
body.element.appendChild(scoreboard.element);

loginButton.on('click', () => {
    darkLayer.show();
    loginForm.show();
});
registerButton.on('click', () => {
    darkLayer.show();
    registerForm.show();
});
settingsButton.on('click', () => {
    darkLayer.show();
    settingsForm.show();
});
leaderboardButton.on('click', () => {
    scoreboard.loadData();
    darkLayer.show();
    scoreboard.show();
});

darkLayer.on('click', () => {
    settingsForm.hide();
    loginForm.hide();
    registerForm.hide();
    scoreboard.hide();
    darkLayer.hide();
});

