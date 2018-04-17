import {httpModule} from '../modules/http';

export class UserService {

    checkAuth() {
        this.loadMe((err, me) => {
            if (err) {
                console.dir(me);
                console.log('Вы не авторизованы');
                return;
            }

            console.log('me is', me);
            alert('Добро пожаловать!');
        });
    }

    loadMe(callback) {
        httpModule.doGet({
            url: '/user',
            callback
        });
    }

    loadUsers(firstManPos, amountOfPeople) {
        return httpModule.promiseGet(`/leaders/${firstManPos}/${amountOfPeople}`);
    }

    logout() {
        httpModule.doGet({
            url: '/logout'
        });
    }

    RegOrSignin(type, formData) {
        if (type === 'register') {
            httpModule.promisePost('/register', formData)
                .then(response => alert('Ваш login: ' + response.user.login + ' и почта: ' + response.user.mail))
                .catch(err => console.log(err));

        } else if (type === 'login') {
            return httpModule.promisePost('/signin', formData)
                .then(response => {
                    alert('Привет ' + response.user.login + '!');
                    return response;
                })
                .catch(() => alert('Пользователь не существует'));
        }
    }
}
