import './styles.css';

const refs = {
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
}

class CountdownTimer {
    constructor({onTick, targetDate, selector}){
        this.intervalId = null;
        this.onTick = onTick;
        this.targetDate = targetDate;
        this.selector = selector;
    }

    start() {
        this.intervalId = setInterval(() => {
            const startDate = Date.now();
            const time = startDate - this.targetDate;
            const timer = this.getTimeComponents(time);
            this.onTick(timer);
        }, 1000);
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
        return {days, hours, mins, secs};
    }

    pad(value){
        return String(value).replace('-', '').padStart(2,'0');
    }
}

const countdownTimer = new CountdownTimer({
    onTick: updateClockface,
    targetDate: new Date('Jun 06, 2021'),
    selector: '#timer-1',
});

countdownTimer.start();

function updateClockface({days, hours, mins, secs}){
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
}