(function () {

    class Preloader extends BaseComponent {

        constructor(element, classNameForPreloader) {
            super(element);
            this.divClass = classNameForPreloader;
        }

        appendItself() {
            const preloaderBody = document.createElement('div');
            preloaderBody.className = this.divClass;
            preloaderBody.innerText = 'Loading...';
            preloaderBody.style.display = 'none';
            this.preloaderBody = preloaderBody;
            this.element.element.appendChild(preloaderBody);
        }

        start() {
           this.preloaderBody.style.display = 'block';
        }

        stop(){
            this.preloaderBody.style.display = 'none';
        }

    }
    window.Preloader = Preloader;
})();