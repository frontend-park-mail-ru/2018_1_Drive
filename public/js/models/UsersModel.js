import {HttpModule} from '../modules/http';

export class UsersModel {
    constructor(data) {
        this.currentUser = null;

        this.login = data.login;
        this.mail = data.mail;
        this.password = data.password;
        this.score = data.score;
    }


    static isAuthorized() {
        return !!this.currentUser;
    }


    static getCurrentUser() {
        return this.currentUser;
    }


    static auth() {
        if (this.currentUser) {
            return Promise.resolve(this.currentUser);
        }
        return new Promise(function (resolve, reject) {
            HttpModule.doGet({
                url: '/user',
                callback(err, response) {
                    if (err) {
                        // if (err.status == 401) {
                        //     return resolve(null);
                        // }
                        console.log('Вы не авторизованы');
                        return reject(err);
                    }

                    this.currentUser = new UsersModel(response.user);
                    resolve(this.currentUser);
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

    // loadUsers(firstManPos, amountOfPeople) {
    //     return httpModule.promiseGet(`/leaders/${firstManPos}/${amountOfPeople}`);
    // }
    //
    // logout() {
    //     httpModule.doGet({
    //         url: '/logout'
    //     });
    // }

}
