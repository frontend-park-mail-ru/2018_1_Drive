export class ProgressBar {
    constructor(bar) {
        this.bar = bar;
        this.styles = [
            'progress-bar_zero',
            'progress-bar_five',
            'progress-bar_thirty-three',
            'progress-bar_sixty-six',
            'progress-bar_one-hundred'
        ];
        this.statesLength = this.styles.length;
        this.currentState = 0;
    }

    update() {
        this.bar.classList.remove(this.styles[this.currentState]);
        if (this.currentState === this.statesLength - 1) {
            this.currentState = 0;
        } else {
           this.currentState++;
        }
        this.bar.classList.add(this.styles[this.currentState]);
    }

    setToFirst() {
        this.bar.classList.remove(this.styles[this.currentState]);
        this.currentState = 1;
        this.bar.classList.add(this.styles[this.currentState]);
    }

    setToZero() {
        this.bar.classList.remove(this.styles[this.currentState]);
        this.currentState = 0;
        this.bar.classList.add(this.styles[this.currentState]);
    }
}