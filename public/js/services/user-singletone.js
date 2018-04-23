class UserSingletone {

    constructor(user = null) {
        this.user = user;
    }

    setUser(user = null) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    logout() {
        this.user = null;
    }

}

let instance = new UserSingletone();


export function getInstance() {
    return instance;
}