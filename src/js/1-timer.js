import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  datePicker: document.querySelector('#datetime-picker'),
  userSelectedDate: undefined,
};
let intervalID;

// Flatpicker: Create a callendar and update UI
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Check date if it is a future date
    const currentTime = Date.now();
    const selectedByUserToNumber = new Date(selectedDates[0]).getTime();
    if (selectedByUserToNumber < currentTime) {
      iziToast.error({
        class: 'error-notification',
        title: 'Error',
        timeout: 5000,
        iconUrl: '/img/bi_x-octagon.svg',
        titleColor: '#fff',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        progressBarColor: '#B51B1B',
        close: true,
      });
    } else {
      // Remove class is-disable from button and save picked date from user
      refs.buttonStart.classList.remove('is-disable');
      refs.userSelectedDate = selectedByUserToNumber;
      // Update UI with selected date
      updateTimerUI();
    }
  },
};
flatpickr(refs.datePicker, options);

// Function: Run timer within 1sek interval
function runTimer() {
  refs.buttonStart.classList.add('is-disable');
  refs.datePicker.disabled = true;

  // Check if there is already an interval running
  if (intervalID) {
    clearInterval(intervalID);
  }

  intervalID = setInterval(() => {
    const convertedData = convertMs(refs.userSelectedDate - Date.now());
    if (
      convertedData.days < 0 &&
      convertedData.hours < 0 &&
      convertedData.minutes < 0 &&
      convertedData.seconds < 0
    ) {
      refs.buttonStart.classList.remove('is-disable');
      refs.datePicker.disabled = false;
      return;
    }

    // Update UI
    updateUi(convertedData);
  }, 1000);
}

// Function: Converting milliseconds and return object
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

// Function: Update UI timer value
function updateUi(value) {
  const { days, hours, minutes, seconds } = value;
  const timerValues = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
  };

  timerValues.days.innerText = addLeadingZero(days);
  timerValues.hours.innerText = addLeadingZero(hours);
  timerValues.minutes.innerText = addLeadingZero(minutes);
  timerValues.seconds.innerText = addLeadingZero(seconds);
}

// Function: Update UI with timer values
function updateTimerUI() {
  const currentTimeData = convertMs(refs.userSelectedDate - Date.now());
  updateUi(currentTimeData);
}

// Function: Add leading 0
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Button pressed
refs.buttonStart.addEventListener('click', runTimer);
