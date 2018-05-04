import * as busSingleton from '../../bus';
import {events} from './events';

export class Timer {
    constructor(canvas) {
        this.bus = busSingleton.getInstance();
        this.ctx = canvas.getContext('2d');
        this.time = 13;//seconds for every queston
        this.timeLimit = 1E3;//ms -> sec
        this.lineWidth = 24;
        this.radius = 100;
        canvas.width = 2*this.radius;
        canvas.height = 2*this.radius;
        this.drawSize = this.radius;
        this.radius -=this.lineWidth/2;
        console.log(canvas);
        this.go = false;
    }

    getColor(value) {
        let hue = ((1 - value) * 120).toString(10);
        return ['hsl(', hue, ',100%,50%)'].join('');
    }

    start(time) {
        this.timeStart = time;
        this.go = true;
        this.step();
    }

    stop(){
        this.go = false;
    }

    step() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = 'round';

        let a = ((new Date).getTime() - this.timeStart) / this.timeLimit;
        this.ctx.strokeStyle = this.getColor(Math.sqrt(a) * a / (Math.sqrt(this.time) * this.time));
        this.ctx.clearRect(0, 0, this.drawSize * 2, this.drawSize * 2);
        this.ctx.font = '100px "Oswald"';
        let time = this.time - a + 1;
        if(time > 10){
            this.ctx.fillText(time | 0, this.radius - 30, this.radius*1.6);
        } else{
            this.ctx.fillText(time | 0, this.radius-15, this.radius*1.6);
        }
        this.ctx.arc(this.drawSize, this.drawSize, this.radius, -Math.PI / 2 + 2 * Math.PI * a / this.time, -Math.PI / 2 - Math.PI / 40, !1);
        this.ctx.stroke();
        if(!this.go){
            this.ctx.clearRect(0, 0, this.drawSize * 2, this.drawSize * 2);
        }else {
            this.time > a && requestAnimationFrame(() => {
                this.step();
            });
        }
        this.time <= a && (this.bus.emit(events.TIME_OVER));
    }
}