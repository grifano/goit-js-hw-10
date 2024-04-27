import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name=delay]'),
  inputsState: document.querySelectorAll('input[name=state]'),
};
iziToast.settings({
  timeout: 5000,
  titleColor: '#fff',
  position: 'topRight',
  messageColor: '#fff',
  icon: '',
  close: false,
});

refs.form.addEventListener('submit', onSubmit);

// Functions
function onSubmit(event) {
  event.preventDefault();

  const promise = new Promise((resolve, reject) => {
    const delay = refs.inputDelay.value;
    let stateValue;
    refs.inputsState.forEach(input => {
      if (input.checked) {
        stateValue = input.value;
      }
    });

    // Get value from checked input
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve({ delay, status: 'fulfilled' });
      } else if (stateValue === 'rejected') {
        reject({ delay, status: 'rejected' });
      } else {
        return;
      }
    }, delay);
  });

  promise
    .then(value => showNotification(value))
    .catch(value => {
      showNotification(value);
    });
}

// Function: show notification
function showNotification(options) {
  const { delay, status } = options;
  refs.inputsState.forEach(state => {
    if (state.checked) {
      switch (status) {
        case 'fulfilled':
          iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            backgroundColor: '#6ED171',
            progressBarColor: '#00BF00',
          });
          break;
        case 'rejected':
          iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`,
            backgroundColor: '#F67474',
            progressBarColor: '#F00000',
          });
        default:
          break;
      }
    }
  });
}
