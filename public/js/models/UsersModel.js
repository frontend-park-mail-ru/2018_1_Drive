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
        if (UserSingletone.getInstance().getUser()) {
            return Promise.resolve(UserSingletone.getInstance().getUser());
        }
        return new Promise(function (resolve, reject) {
            HttpModule.doGet({
                url: '/user',
                callback(err, response) {
                    if (err) {
                        UserSingletone.getInstance().setUser(null);
                        return reject(err);
                    }

                    currentUser = new UsersModel(response.user);
                    UserSingletone.getInstance().setUser(currentUser);
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
                    currentUser = response.user;
                    UserSingletone.getInstance().setUser(currentUser);
                    resolve(currentUser);
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
                    currentUser = response.user;
                    UserSingletone.getInstance().setUser(currentUser);
                    resolve(currentUser);
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
            HttpModule.doPost({
                url: '/logout',
                callback(err, response) {
                    if (err) {
                        return reject(err);
                    }
                    currentUser = null;
                    UserSingletone.getInstance().setUser(null);
                    resolve();
                }
            });
        });
    }
}
