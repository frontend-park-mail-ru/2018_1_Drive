export class Ticker {
    constructor(ticker) {
        this.ticker = ticker;
        this.sentences = [
            'Wait, I\'m in the kitchen',
            'Now eating yogurt',
            'Watching silicon valley',
            'Learning JavaScript',
            'Owww! It\'s freaking awesome!',
            'Dancing like a rockstar',
            'Walking with mom',
            'Walking with your mom'
        ];
        this.counter = 1;
    }

    start(time) {
        this.ticker.innerHTML = this.sentences[0];
        this.timerId = setInterval(() => {
            if (this.counter === this.sentences.length) {
                this.counter = 0;
            }
            this.ticker.innerHTML = this.sentences[this.counter];
            this.counter++;
        }, time);
    }

    stop() {
        clearInterval(this.timerId);
    }
}