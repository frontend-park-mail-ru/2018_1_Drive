define('darkness', function () {

    const View = require('View');

    return class darkness {
        constructor() {
            this.el = document.createElement('div');
        }

        render(root) {
            this.el.innerHTML = 'Sdsdsd';
        }

        renderTo(root) {
            this.el.innerHTML = '<div class="shadow" style="display:none"></div>';
            root.appendChild(this.el);
            return this;
        }

        on(event, handler) {
            this.el.addEventListener(event, handler);
        }
    };
});