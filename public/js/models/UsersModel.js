import {HttpModule} from '../modules/http';
import * as UserSingletone from '../services/user-singletone';

let currentUser = null;

export class UsersModel {

    constructor(data) {
        this.login = data.login;
        this.mail = data.mail;
        this.password = data.password;
        this.score = data.score;
    }

    static isAuthorized() {
        return !!currentUser;
    }

    static getCurrentUser() {
        return currentUser;
    }

    static auth() {
        if (currentUser) {
            return Promise.resolve(currentUser);
        }
        return new Promise(function (resolve, reject) {
            HttpModule.doGet({
                url: '/user',
                callback(err, response) {
                    if (err) {
                        return reject(err);
                    }

                    currentUser = new UsersModel(response.user);
                    resolve(currentUser);
                }
            });
        });
    }


    static login(mail, password) {
        return new Promise(function (resolve, reject) {
            HttpModule.doPost({
                url: '/signin',
                data: {mail, password},
                callback(err, response) {
                    if (err) {
                        return reject(err);
                    }

                    resolve(UsersModel.auth());
                }
            });
        });
    }


    static signup(user) {
        return new Promise(function (resolve, reject) {
            HttpModule.doPost({
                url: '/register',
                data: user,
                callback(err, response) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(UsersModel.auth());
                }
            }) ;
        });
    }

    static loadUsers(firstManPos, amountOfPeople) {
        return new Promise(function (resolve, reject) {
            HttpModule.doGet({
                url: `/leaders/${firstManPos}/${amountOfPeople}`,
                callback(err, response) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(response.users.map(user => new UsersModel(user)));
                }
            });
        });
    }

    static logout() {
        return new Promise(function (resolve, reject) {
            HttpModule.doGet({
                url: '/logout',
                callback(err, response) {
                    if (err) {
                        return reject(err);
                    }
                    currentUser = null;
                    resolve();
                }
            });
        });
    }
}
