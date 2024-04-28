import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name=delay]'),
  inputDelayValue: 0,
  inputsState: document.querySelectorAll('input[name=state]'),
  stateValue: undefined,
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

// Save delay to global variable
refs.inputDelay.addEventListener('change', event => {
  refs.inputDelayValue = event.target.value;
});
// Save state to global variable
refs.inputsState.forEach(input => {
  input.addEventListener('change', event => {
    if (event.target.checked) {
      refs.stateValue = event.target.value;
    }
  });
});

// Functions
function onSubmit(event) {
  event.preventDefault();

  const promise = new Promise((resolve, reject) => {
    // Get value from checked input
    setTimeout(() => {
      if (refs.stateValue === 'fulfilled') {
        resolve({ delay: refs.inputDelayValue, status: 'fulfilled' });
      } else if (refs.stateValue === 'rejected') {
        reject({ delay: refs.inputDelayValue, status: 'rejected' });
      } else {
        return;
      }
    }, refs.inputDelayValue);
  });

  promise
    .then(value => {
      showNotification(value);
      // Clean form
      refs.form.reset();
    })
    .catch(value => {
      showNotification(value);
      // Clean form
      refs.form.reset();
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
