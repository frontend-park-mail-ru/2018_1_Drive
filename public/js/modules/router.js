define('Router', function (require) {
    return class Router {
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
            this.map[path] = new View().renderTo(this.root);
            return this;
        }

        open(path) {
            const view = this.map[path];
            if (!view || view === this.active) {
                return this;
            }

            if (this.active) {
                this.active.destroy();
                this.active = null;
            }

            this.active = view.create();
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

            console.log(window.location.pathname);
            this.open(window.location.pathname);
        }
    };
});