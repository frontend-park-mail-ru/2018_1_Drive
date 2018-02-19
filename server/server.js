'use strict';

const fs = require('fs');
const http = require('http');


/* Ссылки в браузере и в html страницах нужно
 * прописывать таким образом: site.com/login, а не site.com/login.html
 */
const staticFiles = {
    '/styles.css': '../static/styles.css',
    '/login': '../static/login.html',
    '/registration': '../static/registration.html',
    '/empty': '../static/empty.html',
    '/': '../static/index.html'
};


const serverConfig = {
    files: staticFiles,
    defaultPort: 3000
};


const server = http.createServer((request, response) => {

    const requestUrl = serverConfig.files[request.url];
    let page;

    if (requestUrl !== undefined) {
        page = fs.readFileSync(requestUrl, 'utf-8');
    } else {
        page = fs.readFileSync(serverConfig.files['/empty'], 'utf-8');
    }

    response.end(page);
});


server.listen(process.env.PORT || serverConfig.defaultPort);
console.log('Server started!');
