
const Validator = window.Validator;
const UserService = window.UserService;
const BaseComponent = window.BaseComponent;
const Scoreboard = window.Scoreboard;

const userService = new UserService();
const scoreboard = new Scoreboard();

userService.auth('username', '12345', function (err, responce) {
    console.log(err, responce);
});
scoreboard.show();

const darkLayer = new BaseComponent(document.querySelector('.shadow'));
const loginWindow = new BaseComponent(document.querySelector('.login'));
const registerWindow = new BaseComponent(document.querySelector('.register'));
const settingsWindow = new BaseComponent(document.querySelector('.settings'));

darkLayer.on("click", closeModalWin);



// function openLeaderboard() {
//     darkLayer.show();
//
//     leaderboard = document.querySelector('.leaderboard');
//     leaderboard.innerHTML = ' ';
//     const head = document.createElement('div');
//     head.setAttribute('class', 'button');
//     // head.setAttribute('style','margin:0;');
//     head.innerHTML = 'Top players:';
//     leaderboard.appendChild(head);
//     for (let player of players) {
//         const str = document.createElement('div');
//         str.setAttribute('class', 'clearfix player');
//         const name = document.createElement('div');
//         const score = document.createElement('div');
//         name.setAttribute('class', 'floated-left');
//         score.setAttribute('class', 'floated-right');
//
//         name.innerHTML = player[0];
//         score.innerHTML = player[1];
//         str.appendChild(name);
//         str.appendChild(score);
//         leaderboard.appendChild(str);
//     }
//     const buttonLeft = document.createElement('div');
//     buttonLeft.setAttribute('class', 'button button-half');
//     buttonLeft.innerHTML = 'Prev';
//     leaderboard.appendChild(buttonLeft);
//     const buttonRight = document.createElement('div');
//     buttonRight.setAttribute('class', 'button button-half button-last');
//     buttonRight.innerHTML = 'Next';
//     leaderboard.appendChild(buttonRight);
//
//     //TODO: create pagination buttons!!!
//
//     leaderboard.style.display = 'block';
// }


// function authorize() {
//     let authorized = document.querySelector('.authorized');
//     let unauthorized = document.querySelector('.unauthorized');
//     unauthorized.style.display = 'none';
//     authorized.style.display = 'block';
//     closeModalWin();
// }
function unauthorize() {
    let authorized = document.querySelector('.authorized');
    let unauthorized = document.querySelector('.unauthorized');
    authorized.style.display = 'none';
    unauthorized.style.display = 'inline';
}


}


function closeModalWin() {
    let modals = document.querySelectorAll('.menu-modal');
    modals.forEach(function (item) {
        item.style.display = 'none';
    });
    darkLayer.hide();
}

function onSubmit(obj) {
    const formData = {};
    const fields = obj.parentNode.querySelectorAll('input');
    for (let field of fields) {
        // formData[fields[field].name] = fields[field].value;
        if (!field.hasAttribute('checked')) {
            formData[field.name] = field.value;
        }
        else {
            formData[field.name] = field.checked;
        }
    }
    // console.log(formData);
    let errors = Validator.Validate(formData);
    // const errWindow = document.createElement('div');
    // errWindow.setAttribute('class','errors');
    const errWindow = obj.parentNode.querySelector('.errors');
    errWindow.innerHTML = '';
    if(Object.keys(errors).length>0) {
        for (let error in errors) errWindow.innerHTML += error + " error! " + errors[error] + "<br>";
    }
    else{
        console.log('alright')
    }
}
