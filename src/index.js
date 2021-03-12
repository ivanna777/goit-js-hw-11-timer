const timerRef = document.querySelector('#timer-1');
const timerBtnStart = document.querySelector('.timer-btn[data-action-start]');
const timerBtnStop = document.querySelector('.timer-btn[data-action-stop]');

class CountdownTimer {
    constructor ({onTick, targetDate}) {
       this.isActive = false; 
       this.intervalId = null;
       this.onTick = onTick;
       this.targetDate = targetDate;

       this.init()
    }

    init() {
        const timerType = this.getTimeComponents(0);
        this.onTick(timerType);
    }
    start() {
        if (this.isActive) {
            return
        } 

        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const targetDate = this.targetDate;
            const time = targetDate - currentTime;

            const timerType = this.getTimeComponents(time);

            this.onTick(timerType)
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        const timerType = this.getTimeComponents(0);

        this.onTick(timerType);
    }

    getTimeComponents(time) {

        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
      
        return ({days, hours, mins, secs})
    }

    pad(value) {
        return String(value).padStart(2, '0');
      }
}

const countDownTimer = new CountdownTimer({
    onTick: updateClockface,
    selector: '#timer-1',
    targetDate: new Date('Mar 17, 2021'),
  });

timerBtnStart.addEventListener('click', countDownTimer.start.bind(countDownTimer));
timerBtnStop.addEventListener('click', countDownTimer.stop.bind(countDownTimer));

function updateClockface({ days, hours, mins, secs }) {
    timerRef.textContent = `${days}:${hours}:${mins}:${secs}`;
  }

