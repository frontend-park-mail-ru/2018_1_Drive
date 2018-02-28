'use strict';

const http = require('http');
const fs = require('fs');

const server = http.createServer(function(request,responce){
	console.log(request.url, request.method);

	if(request.url == "/css/styles.css"){
		const style = fs.readFileSync('./css/styles.css','utf8');
		responce.end(style);
	}
	else if (request.url == "/js/script.js"){
		const text = fs.readFileSync('./js/script.js','utf8');
		responce.end(text);
	}
	else{
		const text = fs.readFileSync('index.html','utf8');
		responce.end(text);
	}

});

server.listen(3000);
console.log('Server startred');
