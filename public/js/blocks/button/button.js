define('Button', function () {

    const BaseComponent = require('BaseComponent');

    return class Button extends BaseComponent {
        constructor(element, handler = null) {
            super(element);
            if(handler){
                this.on('click', handler);
            }
        }
    };

});
