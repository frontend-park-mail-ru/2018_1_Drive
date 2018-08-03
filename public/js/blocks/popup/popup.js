export class Popup {
    constructor(popup, inner, appearance = 'top') {
        this.angle = 0;
        this.appearanceCoordinates = {
            top: {x: 0, y: 100},
            bottom: {x: 0, y: -100},
            left: {x: -100, y: 0},
            right: {x: 100, y: 0}
        };

        this.popup = popup;
        this.inner = inner;
        if (!(appearance in this.appearanceCoordinates)) {
            appearance = 'top';
        }
        this.appearance = appearance;
        this.inner.style.webkitTransform = `rotate(${this.angle}deg)`;
        this.inner.style.transform = `rotate(${this.angle}deg)`;
        this.inner.style.right = `${-this.appearanceCoordinates[appearance].x}vh`;
        this.inner.style.bottom = `${this.appearanceCoordinates[appearance].y}vw`;
    }

    openPopup() {
        this.inner.style.webkitTransform = 'rotate(0)';
        this.inner.style.transform = 'rotate(0)';
        this.inner.style.bottom = '0';
        this.inner.style.right = '0';
        this.inner.classList.add('active');
        this.popup.classList.add('active');
    }

    closePopup() {
        this.popup.classList.remove('active');
        this.popup.classList.remove('active');
        this.inner.style.webkitTransform = `rotate(${this.angle}deg)`;
        this.inner.style.transform = `rotate(${this.angle}deg)`;
        this.inner.style.right = `${-this.appearanceCoordinates[this.appearance].x}vh`;
        this.inner.style.bottom = `${this.appearanceCoordinates[this.appearance].y}vw`;
    }


    activate(button) {
        button.addEventListener('click', () => {
            this.openPopup();
        });
    }

    onCancel(cancelButton) {
        cancelButton.addEventListener('click', () => {
            this.closePopup();
        });
    }
}