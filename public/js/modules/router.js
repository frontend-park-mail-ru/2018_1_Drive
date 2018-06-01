import * as UserSingletone from '../services/user-singletone';

export class Router {
    constructor(root) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.root = root;
        this.map = {};
        this.active = null;
        Router.__instance = this;
    }

    add(path, View) {
        this.map[path] = new View().renderTo(this.root).create();
        this.map[path].hide();
        return this;
    }

    open(path) {
        let view = this.map[path];

        if (!view || !this.isAllowed(path)) {
            path = '/not-found';
            view = this.map[path];
        }

        if (view === this.active) {
            return this;
        }


        if (this.active) {
            this.active.hide();
            this.active = null;
        }

        if (this.map.hasOwnProperty(path)) {
            this.active = this.map[path].show();
        } else {
            console.log(path);
            this.active = view.create();
        }

        if (window.location.pathname !== path) {
            window.history.pushState(null, '', path);
        }
        return this;
    }

    start() {
        window.addEventListener('popstate', () => {
            this.open(window.location.pathname);
        });

        this.root.addEventListener('click', (evt) => {
            if (evt.target.tagName.toLowerCase() === 'a') {
                evt.preventDefault();
                this.open(evt.target.pathname);
            }
        });

        this.open(window.location.pathname);
    }

    reload(path) {
        let view = this.map[path];
        view.el.innerHTML = '';
        view.create();
        view.show();
    }

    isAllowed(path) {
        let notForRegitser = ['/signin', '/signup'];
        let notForUnregistred = ['/profile'];
        if (notForRegitser.includes(path) && UserSingletone.getInstance().getUser()) {
            return false;
        } else if (notForUnregistred.includes(path) && !UserSingletone.getInstance().getUser()) {
            return false;
        }
        return true;
    }

}
