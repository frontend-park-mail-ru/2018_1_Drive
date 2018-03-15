(function () {
    'use strict';
    const BaseComponent = window.BaseComponent;

<<<<<<< HEAD
    class Button extends BaseComponent{
        //Constructs button
        //@param {handler} hanler - Just a handler of the onclick function
        //@param {string} text - Text on the button
        //@param {string} modificator - class-modificator. Default class is 'button', but smtime you need 'button-half'
        constructor(element, handler = null){
            super(element);
=======
    class Button extends BaseComponent {
        constructor(handler = null, text = '', modificator = '') {
            const button = document.createElement('div');
            super(button);
>>>>>>> Main/develop
            if(handler){
                this.on('click', handler);
            }

        }
    }

    window.Button = Button;

})();