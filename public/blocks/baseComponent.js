(function () {

    'use strict';

    class BaseComponent {
        constructor(element) {
            this.element = element;
        }

        hide() {
            this.element.style.display = 'none';
        }

        show() {
            this.element.style.display = 'block';
        }

        appendAsChild(otherElement) {
            //this.element.appendChild(otherElement.element);
            otherElement.appendChild(this.element);
        }

        on(event, handler){
            this.element.addEventListener(event,handler);
        }
    }

    window.BaseComponent = BaseComponent;

})();