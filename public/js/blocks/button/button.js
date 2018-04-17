import { BaseComponent } from '../baseComponent';

export class Button extends BaseComponent {
    constructor(element, handler = null) {
        super(element);
        if(handler){
            this.on('click', handler);
        }
    }
}


