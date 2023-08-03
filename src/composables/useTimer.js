import { ref } from 'vue'
const countdown = ref('')
let intervalId
const addTimer = ({ minutes }) => {
  let timer = minutes
  intervalId = setInterval( () => {
    let minutes = parseInt(timer / 60, 10)
    let seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdown.value = `${minutes}: ${seconds}`;
    if (--timer < 0) {
      timer = 0;
      clearInterval(intervalId)
    }
  }, 1000);
}

const clearTimer = () => {
  clearInterval(intervalId)
}


export default function useTimers () {
  return { addTimer, clearTimer, countdown }
}
