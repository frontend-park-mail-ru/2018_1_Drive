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
        const view = this.map[path];
        if (!view || view === this.active) {
            return this;
        }

        if (this.active) {
            this.active.hide();
            this.active = null;
        }

        if (this.map.hasOwnProperty(path)) {
            this.active = this.map[path].show();
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
}
