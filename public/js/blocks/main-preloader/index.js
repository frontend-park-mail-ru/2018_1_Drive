import {BaseComponent} from '../baseComponent';

const MainPreloaderTemplate = require('./main-preloader.pug');

export class MainPreloader extends BaseComponent {
    constructor(root) {
        root.innerHTML = MainPreloaderTemplate();
        super(root.querySelector('.main-preloader'));
        this.startTime = new Date().getMilliseconds();
    }

    resolveAfterXSeconds(x) {
        return new Promise(resolve => {
            setTimeout(() => resolve(), x);
        });
    }

    async stop() {
        const now =  new Date().getMilliseconds();
        if (now - this.startTime > 1300) {
            this.hide();
            return;
        }
        this.resolveAfterXSeconds(900).then(() => {this.hide();});
    }

}