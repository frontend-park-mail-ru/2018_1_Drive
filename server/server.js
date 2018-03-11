'use strict';

const path = require('path');

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const url = require('url');

console.log('Starting app');
const app = express();


app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());


let users = {
    'a.ostapenko@corp.mail.ru': {
        mail: 'a.ostapenko@corp.mail.ru',
        login: 'my_login',
        password: 'password123',
        age: 20,
        score: 72
    },
    'd.dorofeev@corp.mail.ru': {
        mail: 'd.dorofeev@corp.mail.ru',
        login: 'my_login',
        password: 'password',
        score: 100500
    },
    'a.udalov@corp.mail.ru': {
        mail: 'a.udalov@corp.mail.ru',
        login: 'my_login',
        password: 'password',
        score: 72
    },
    'marina.titova@corp.mail.ru': {
        mail: 'marina.titova@corp.mail.ru',
        login: 'my_login',
        password: 'password',
        score: 72
    },
    'a.tyuldyukov@corp.mail.ru': {
        mail: 'a.tyuldyukov@corp.mail.ru',
        login: 'my_login',
        password: 'password',
        score: 72
    }
};


const allowedOrigins = [
    'localhost',
    'frontend-drive.herokuapp.com',
];

const CORS_HEADERS = {
    requestedHeaders: 'Access-Control-Request-Headers'.toLowerCase(),
    requestedMethod: 'Access-Control-Request-Method'.toLowerCase(),

    allowOrigin: 'Access-Control-Allow-Origin'.toLowerCase(),
    allowMethods: 'Access-Control-Allow-Methods'.toLowerCase(),
    allowHeaders: 'Access-Control-Allow-Headers'.toLowerCase(),
    allowCredentials: 'Access-Control-Allow-Credentials'.toLowerCase(),
};

app.use(function (req, res, next) {
    const requestOrigin = req.headers['origin'];

    if (typeof requestOrigin !== 'undefined') {
        const requestOriginHostname = url.parse(requestOrigin).hostname;

        const requestedHeaders = req.headers[CORS_HEADERS.requestedHeaders];
        const requestedMethod = req.headers[CORS_HEADERS.requestedMethod];
        console.log(`Requested ${req.method} ${req.path} with origin ${requestOrigin} (${requestOriginHostname})`, {
            requestedHeaders,
            requestedMethod,
        });

        const headers = [];
        if (requestedHeaders) {
            headers.push([CORS_HEADERS.allowHeaders, requestedHeaders]);
        }
        if (requestedMethod) {
            headers.push([CORS_HEADERS.allowMethods, 'GET, POST, OPTIONS']);
        }

        if (allowedOrigins.includes(requestOriginHostname)) {
            headers.push([CORS_HEADERS.allowOrigin, requestOrigin]);
            headers.push([CORS_HEADERS.allowCredentials, 'true']);
        }

        const result = headers.map(pair => '\t' + pair.join(': ')).join('\n');
        console.log('Response with headers:\n' + result);

        headers.forEach(([name, value]) => res.setHeader(name, value));
    }
    next();
});



app.get('/user', function (req, res) {
    const mail = req.cookies['mail'];

    if (!mail || !users[mail]) {
        return res.status(401).end();
    }

    users[mail].score += 1;

    res.json(users[mail]);
});

app.get('/users', function (req, res) {
    console.log('In /user handler');
    const scoreList = Object.values(users)
        .sort((l, r) => r.score - l.score)
        .map(user => {
            return {
                mail: user.mail,
                score: user.score
            };
        });
    res.json(scoreList);
});

app.post('/register', function (req, res) {
    const password = req.body.password;
    const login = req.body.login;
    const mail = req.body.mail;
    if (users[mail]) {
        return res.status(400).json({error: 'Пользователь уже существует'});
    }

    users[mail] = {password, mail, login, score: 0};
    res.cookie('mail', mail, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json(users[mail]);
});

app.post('/signin', function (req, res) {
    const password = req.body.password;
    const mail = req.body.mail;
    if (!password || !mail) {
        return res.status(400).json({error: 'Не указан E-Mail или пароль'});
    }
    if (!users[mail] || users[mail].password !== password) {
        return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
    }

    res.cookie('mail', mail, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json(users[mail]);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});