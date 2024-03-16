// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
let userSelectedDate;
const currentDate = Date.now();

flatpickr('#datetime-picker', {});
const options = {
  enableTime: true, //можливість вибору часу
  time_24hr: true, //формат часу у календарі повинен бути 24-годинним
  defaultDate: new Date(), //значення за замовчуванням для календаря, коли він відкривається
  minuteIncrement: 1, //встановлює крок у хвилинах для вибору часу
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const selectedDate = new Date(userSelectedDate).getTime();
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
  const waiting = new Date(userSelectedDate).getTime() - currentDate;
  console.log(waiting);
});


// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
