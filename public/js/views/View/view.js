define('View', function (require) {
    const Router = require('Router');
    const bus = require('bus');

    const noop = () => null;

    return class View {
        constructor(name, template = noop) {
            this.name = name;
            this.attrs = {};
            this.tmpl = template;
            this.router = new Router;
            this.bus = bus;
            this.active = false;

            this.el = document.createElement('div');
            this.hide();
        }

        hide() {
            this.el.setAttribute('hidden', 'hidden');
            this.active = false;
            return this;
        }

        show() {
            this.el.removeAttribute('hidden');
            this.active = true;
            return this;
        }

        render(attrs) {
            this.attrs = attrs || this.attrs;
            this.el.innerHTML = this.tmpl(this.attrs);
            return this;
        }

        create(attrs) {
            return this.render(attrs).show();
        }

        destroy() {
            this.hide();
            this.el.innerHTML = '';
            return this;
        }

        renderTo(root) {
            root.appendChild(this.el);
            return this;
        }

        allowed() {
            return true;
        }
    };
});