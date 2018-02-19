'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');


const server = http.createServer((request, response) => {

    if (request.url === '/') {
        request.url = '/index.html';
    }

    fs.readFile(path.join(__dirname , '../static', request.url), (error, data) => {
        if (error) {
            data = 'Page that you are looking for doesn\'t exist';
            response.writeHead(404);
        }
        response.write(data);
        response.end();
    });

});


server.listen(process.env.PORT || 3000);
console.log('Server started!');
