'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');


const serverConfig = {

    folderWithStatic: '../public',

    defaultPort: 3000
};


const server = http.createServer((request, response) => {

    if (request.url === '/') {
        request.url = '/index.html';
    }

    fs.readFile(path.join(__dirname, serverConfig.folderWithStatic, request.url), (error, data) => {
        if (error) {
            response.write('Page that you are looking for doesn\'t exist');
            return;
        }
        response.write(data);
        response.end();
    });

});


server.listen(process.env.PORT || serverConfig.defaultPort);
console.log('Server started!');