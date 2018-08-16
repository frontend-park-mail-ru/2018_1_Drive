export class ClickManager {
    constructor(element) {
        this.element = element;
    }

    turnOffCLicks() {
        this.element.addEventListener('click', this.disableClicks, true);
    }

    turnOnClicks() {
        this.element.removeEventListener('click', this.disableClicks, true);
    }

    disableClicks(event) {
        event.stopPropagation();
        event.preventDefault();
    }
}