// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Отримання форми
const form = document.querySelector('.form');

// Обробник події submit для форми
form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = event.currentTarget.elements.delay;
  const stateInput = event.currentTarget.elements.state;

  const timer = parseInt(delayInput.value);
  const progres = stateInput.value;

  createPromise(timer, progres)
    .then(() => handleNotification(timer))
    .catch(() => onRejected(timer));
});

function createPromise(timer, progres) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (progres === 'fulfilled') {
        resolve(timer);
      } else {
        reject(timer);
      }
    }, timer);
  });
}

function handleNotification(timer) {
  iziToast.success({
    message: `✅ Fulfilled promise in ${timer}ms`,
    position: 'topRight',
  });
}

function onRejected(timer) {
  iziToast.error({
    message: `❌ Rejected promise in ${timer}ms`,
    position: 'topRight',
  });
}