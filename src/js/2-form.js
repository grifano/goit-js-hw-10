const form = document.querySelector('.feedback-form');
const inputs = document.querySelectorAll('.form-input');

// Load form data from localStorage
let formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

// Function to update formData and localStorage
const updateFormData = () => {
  inputs.forEach(input => {
    if (input.name === 'email') {
      formData.email = input.value.trim();
    }
    if (input.name === 'message') {
      formData.message = input.value.trim();
    }
  });

  // Save to local storage
  const asJSON = JSON.stringify(formData);
  localStorage.setItem('feedback-form-state', asJSON);
};

// Add data from localStorage to form input when page loaded
inputs.forEach(input => {
  if (input.name === 'email' && formData.email != null) {
    input.value = formData.email;
  }
  if (input.name === 'message' && formData.message != null) {
    input.value = formData.message;
  }
});

form.addEventListener('input', event => {
  updateFormData();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  // check input is not empty
  const isNotEmpty = [...inputs].find(input => {
    return input.value;
  });

  // Submit form, log localstorage object, clear form, and localStorage
  if (isNotEmpty) {
    console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
    localStorage.clear();
    form.reset();
  }
});
