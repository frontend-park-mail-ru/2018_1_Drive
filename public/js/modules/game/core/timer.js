import * as busSingleton from '../../bus';
import {events} from './events';
import {multiPlayerEvents} from '../multiplayer/events';

export class Timer {
    constructor(timer, onStart = () => {}, onEnd = () => {}, emitOnTimeOver = 'TIME_OVER') {
        this.flashingStyleCSS = 'blink';
        this.bus = busSingleton.getInstance();
        this.emitOnTimeOver = emitOnTimeOver;
        this.timerDiv = timer;
        this.onStart = onStart;
        this.onEnd = onEnd;
    }

    start(workTime = 13) {
        let i = workTime - 1;
        this.onStart(workTime);
        this.timer = setInterval(() => {
            if (i === 5) {
                this.timerDiv.classList.add(this.flashingStyleCSS);
            }

            this.timerDiv.innerHTML = i + '\'\'';
            i--;
            if (i === -1) {
                this.timerDiv.classList.remove(this.flashingStyleCSS);
                clearInterval(this.timer);
                if (this.emitOnTimeOver === 'TIME_OVER') {
                    this.bus.emit(events[this.emitOnTimeOver]);
                } else {
                    this.bus.emit(multiPlayerEvents[this.emitOnTimeOver]);
                }
            }
        }, 1000);
    }

    stop() {
        this.timerDiv.classList.remove(this.flashingStyleCSS);
        clearInterval(this.timer);
        this.onEnd();
    }
}