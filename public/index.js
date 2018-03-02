const players = [
['Name1', 10000],
['Name2', 1000],
['Name3', 100],
['Name4', 11],
['Name5', 10],
['Name6', 1]
];


function openLeaderboard(){
	showModalWin();

	leaderboard = document.querySelector('.leaderboard');
	leaderboard.innerHTML = ' ';
	const head = document.createElement('div');
	head.setAttribute('class','button');
	// head.setAttribute('style','margin:0;');
	head.innerHTML = 'Top players:';
	leaderboard.appendChild(head);
	for(let player of players){
		const str = document.createElement('div');
		str.setAttribute('class','clearfix player');
		const name = document.createElement('div');
		const score = document.createElement('div');
		name.setAttribute('class','floated-left');
		score.setAttribute('class','floated-right');

		name.innerHTML = player[0];
		score.innerHTML = player[1];
		str.appendChild(name);
		str.appendChild(score);
		leaderboard.appendChild(str);
	}
	const buttonLeft = document.createElement('div');
	buttonLeft.setAttribute('class','button button-half');
	buttonLeft.innerHTML = 'Prev';
	leaderboard.appendChild(buttonLeft);
	const buttonRight = document.createElement('div');
	buttonRight.setAttribute('class','button button-half button-last');
	buttonRight.innerHTML = 'Next';
	leaderboard.appendChild(buttonRight);

		//TODO: create pagination buttons!!!
	
	leaderboard.style.display = 'block';
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
	modals = document.querySelectorAll('.menu-modal');
	modals.forEach(function(item){
		item.style.display = 'none';
	});
	darkLayer.style.display = 'none';
}
