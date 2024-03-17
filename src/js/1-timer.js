// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
let userSelectedDate;
let intervalId = null;

flatpickr('#datetime-picker', {});
const options = {
  enableTime: true, //можливість вибору часу
  time_24hr: true, //формат часу у календарі повинен бути 24-годинним
  defaultDate: new Date(), //значення за замовчуванням для календаря, коли він відкривається
  minuteIncrement: 1, //встановлює крок у хвилинах для вибору часу
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = Date.now();
    const selectedDate = new Date(userSelectedDate);
    if (selectedDate > currentDate) {
      startButton.disabled = false;
      
      console.log(userSelectedDate);
    } else {
      startButton.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  }, //функція, яка буде викликана при закритті календаря
};

flatpickr('#datetime-picker', options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Додаємо обробник події на кнопку "Start"

startButton.addEventListener('click', () => {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;

    const time = convertMs(diff);
    console.log(time);
    // Оновлення значень відповідних елементів DOM
    document.querySelector('[data-days]').textContent = String(
      time.days
    ).padStart(2, '0');
    document.querySelector('[data-hours]').textContent = String(
      time.hours
    ).padStart(2, '0');
    document.querySelector('[data-minutes]').textContent = String(
      time.minutes
    ).padStart(2, '0');
    document.querySelector('[data-seconds]').textContent = String(
      time.seconds
    ).padStart(2, '0');
    startButton.disabled = true;
    if (diff < 1000) clearInterval(intervalId);
  }, 1000);
});
