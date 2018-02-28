
function debug(){
	alert('click!');
}

function authorize() {
    var authorized = document.querySelector('.authorized');
    var unauthorized = document.querySelector('.unauthorized');
    unauthorized.style.display = 'none';
    authorized.style.display = 'block';
    closeModalWin();
}
function unauthorize() {
    var authorized = document.querySelector('.authorized');
    var unauthorized = document.querySelector('.unauthorized');
   	authorized.style.display = 'none';
  	unauthorized.style.display = 'inline';
}

function logInUser(){
	showModalWin();
	var form = document.querySelector('.login');
	form.style.display = 'block';
}
function registerUser(){
	showModalWin();
	var form = document.querySelector('.register');
	form.style.display = 'block';
}
function openSettings(){
	showModalWin();
	var form = document.querySelector('.settings');
	form.style.display = 'block';
}

function showModalWin() {
	darkLayer = document.querySelector('.shadow');
	darkLayer.style.display = 'block';
}


function closeModalWin(){
	darkLayer = document.querySelector('.shadow');
	log = document.querySelector('.login');
	reg = document.querySelector('.register');
	// top = document.querySelector('.leaderboard');
	darkLayer.style.display = 'none';
	log.style.display = 'none';
	reg.style.display = 'none';
	// top.style.display = 'none';


}
// function authorizeUser(){
// 	showModalWin();
// 	var form = document.querySelector('.authorize');
// 	form.style.display = 'block';
// }