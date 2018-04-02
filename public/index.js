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
const settingsButton = new BaseComponent(document.querySelector('.button-settings'));
const registerButton = new BaseComponent(document.querySelector('.button-register'));
const leaderboardButton = new BaseComponent(document.querySelector('.button-leaderboard'));
const logoutButton = new BaseComponent(document.querySelector('.button-logout'));


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
        ['mail', 'text','login-mail'],
        ['password', 'password','login-password'],
        ['remember', 'checkbox','remember']
    ], 'Log me in!');
body.element.appendChild(loginForm.element);

registerForm.render(
    'Register', [
        ['mail', 'text','register-mail'],
        ['login', 'text','register-login'],
        ['password', 'password','register-password'],
        ['passwordSubmit', 'password','register-submit']
    ], 'Register me');
body.element.appendChild(registerForm.element);

settingsForm.render(
    'Settings', [
        ['mail', 'text','settings-mail'],
        ['login', 'text','settings-login'],
        ['password', 'password','settings-password'],
        ['password-submit', 'password','settings-submit']
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

leaderboardButton.on('click', () => {
    scoreboard.loadDataAndRender();
    darkLayer.show();
    scoreboard.show();
});

logoutButton.on('click', () => {
   UserService.logout();
});


darkLayer.on('click', () => {
    settingsForm.hide();
    loginForm.hide();
    registerForm.hide();
    scoreboard.hide();
    scoreboard.setFirstPage();
    darkLayer.hide();
});

