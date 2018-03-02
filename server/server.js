'use strict';

const http = require('http');
const fs = require('fs');

const server = http.createServer(function(request,responce){
	console.log(request.url, request.method);

	if(request.url == "/static/css/styles.css"){
		const style = fs.readFileSync('./public/static/css/styles.css','utf8');
		responce.end(style);
	}
	else if (request.url == "/index.js"){
		const text = fs.readFileSync('./public/index.js','utf8');
		responce.end(text);
	}
	else{
		const text = fs.readFileSync('./public/index.html','utf8');
		responce.end(text);
	}

});



server.listen(process.env.PORT||3000);
console.log('Server startred');
