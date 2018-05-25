import {BaseComponent} from '../baseComponent';

const MainPreloaderTemplate = require('./main-preloader.pug');

export class MainPreloader extends BaseComponent {
    constructor(root) {
        root.innerHTML = MainPreloaderTemplate();
        super(root.querySelector('.main-preloader'));
    }

    clearAnimation() {
        const spans = this.element.querySelector('.main-preloader__center');
        let array = [].slice.call(spans.childNodes);
        console.dir(array);
        array.forEach((i) => {
            console.dir(i);
        });
    }

}