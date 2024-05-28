document.addEventListener('DOMContentLoaded', function() {
    // Hard-coded credentials for local testing. To be replaced with backend validation.
    const validEmail = 'admin@oximio.com';
    const validPassword = 'admin';
  
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-screen');
    const dropdownButton = document.querySelector('.dropdown-button');
    const popup = document.getElementById('popup');
    const logo = document.querySelector('.logo');
    const closeButton = document.querySelector('.close-icon');
  
    // Check if credentials are stored in localStorage for local testing
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
  
    // Remove or modify this part when integrating with backend
    if (storedEmail === validEmail && storedPassword === validPassword) {
      // Show main screen if credentials are valid
      loginScreen.style.display = 'none';
      mainScreen.style.display = 'flex';
      logo.style.display = 'none'; // Hide the logo
    } else {
      // Show login screen if no valid credentials are stored
      loginScreen.style.display = 'flex';
      mainScreen.style.display = 'none';
    }
  
    // Handle login form submission
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      const email = emailInput.value;
      const password = passwordInput.value;
  
      // Backend integration: Replace this local validation with an API call
      if (email === validEmail && password === validPassword) {
        // Example of API call:
        // fetch('/api/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({ email, password })
        // })
        // .then(response => response.json())
        // .then(data => {
        //   if (data.success) {
        //     // Proceed to main screen
        //     loginScreen.style.display = 'none';
        //     mainScreen.style.display = 'flex';
        //   } else {
        //     // Show error message
        //     errorMessage.textContent = 'Incorrect email or password';
        //   }
        // })
        // .catch(error => {
        //   console.error('Error:', error);
        // });
  
        // Local storage for local testing
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
  
        // Redirect to the main screen
        loginScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
        logo.style.display = 'none'; // Hide the logo
      } else {
        // Show error message
        errorMessage.textContent = 'Incorrect email or password';
      }
    });
  
    // Handle dropdown button click
    dropdownButton.addEventListener('click', function() {
      popup.style.display = 'flex'; // Show the popup
    });
  
    // Handle popup click to close when clicking outside the popup content
    popup.addEventListener('click', function(event) {
      if (event.target === popup) {
        popup.style.display = 'none'; // Hide the popup
      }
    });
  
    // Handle close icon click
    closeButton.addEventListener('click', function() {
      popup.style.display = 'none'; // Hide the popup
    });
});
