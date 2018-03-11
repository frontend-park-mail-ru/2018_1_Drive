(function () {
    'use strict';
    const BaseComponent = window.BaseComponent;

    class Button extends BaseComponent{
        //Constructs button
        //@param {handler} hanler - Just a handler of the onclick function
        //@param {string} text - Text on the button
        //@param {string} modificator - class-modificator. Default class is 'button', but smtime you need 'button-half'
        constructor(handler = null, text = '', modificator = ''){
            const button = document.createElement('div');
            super(button);
            if(handler){
                this.on('click', handler);
            }
            this.element.innerHTML = text;
            this.element.setAttribute('class','button '+modificator);

        }
    }

    window.Button = Button;

})();