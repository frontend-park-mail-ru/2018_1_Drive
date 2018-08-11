export class PlayerTicker {
    constructor(opponentDiv, photoPath = '../../img/avatars/', photosAmount = 10) {
        this.opponent = opponentDiv;
        this.names = [
            'Dr Sheen',
            'Gilfoyle',
            'Daisy',
            'Eagle',
            'Kitty Girl',
            'Torchok',
            'Snowden',
            'Donald Trump',
            'Andreynnt',
            'Maria'
        ];
        this.photoPath = photoPath;
        this.nameCounter = 1;
        this.photoCounter = 1;
        this.photoAmount = photosAmount;
    }

    start(time) {
        const image = this.opponent.querySelector('.room-image2');
        const name = this.opponent.querySelector('.room-name2');
        image.src = this.photoPath + `${this.photoCounter++}.svg`;
        name.innerHTML = this.names[0];

        this.timerId = setInterval(() => {
            if (this.nameCounter === this.names.length) {
                this.nameCounter = 0;
            }
            if (this.photoCounter === this.photoAmount + 1) {
                this.photoCounter = 1;
            }
            name.innerHTML = this.names[this.nameCounter++];
            image.src = this.photoPath + `${this.photoCounter++}.svg`;
        }, time);
    }

    stop() {
        clearInterval(this.timerId);
    }
}