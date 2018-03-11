(function () {

    'use strict';

    class BaseComponent {
        constructor(element) {

            this.element = element;
            console.log('FUCK');
        }

        hide() {
            this.element.style.display = 'none';
        }

        show() {
            this.element.style.display = 'block';
        }

        append(otherElement) {
            this.element.appendChild(otherElement.element);
        }

        on(event, handler){
            this.element.addEventListener(event,handler);
        }
    }

    window.BaseComponent = BaseComponent;

})();