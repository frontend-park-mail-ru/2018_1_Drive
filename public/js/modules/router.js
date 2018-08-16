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

    add(path, View, attrs) {
        this.map[path] = new View().renderTo(this.root).create(attrs);
        this.map[path].hide();
        return this;
    }

    open(path, attrs) {
        let view = this.map[path];

        if (path === '/multiplayer-game' && !this.map[path]) {
            path = '/search-from-home';
            view = this.map[path];
        }

        if (!view) {
            path = '/not-found';
            view = this.map[path];
        }

        if (!this.isAllowed(path)) {
            path = '/not-allowed';
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
            this.active = this.map[path].show(attrs);
        } else {
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
        let notForRegistered = ['/signin', '/signup'];
        let notForUnregistered = ['/profile'];
        if (notForRegistered.includes(path) && UserSingletone.getInstance().getUser()) {
            return false;
        }
        if (notForUnregistered.includes(path) && !UserSingletone.getInstance().getUser()) {
            return false;
        }
        return true;
    }

    getView(path) {
        return this.map[path];
    }
}
