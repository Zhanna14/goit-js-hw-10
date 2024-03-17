// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(delay, state) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject('Notification creation failed');
      }
    }, delay);
  });

  return promise;
}


// Функція, яка обробляє результат виконання промісу
function handleNotification(delay) {
  console.log(`Notification created after ${delay} ms`);
}

// Отримання форми
const form = document.querySelector('.form');

// Обробник події submit для форми
form.addEventListener('submit', event => {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  const formData = new FormData(form);
  const delay = formData.get('delay');
  const state = formData.get('state');

  createPromise(delay, state) // Створення промісу
    .then(handleNotification) // Обробка випадку успішного виконання
    .catch(error => console.error(error)); // Обробка випадку невдалого виконання
});