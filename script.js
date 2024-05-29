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
    const profileButton = document.querySelector('.profile-button');
    const countryPopup = document.getElementById('country-popup');
    const profilePopup = document.getElementById('profile-popup');
    const closeButton = document.querySelectorAll('.close-icon');
    const logo = document.querySelector('.logo');
    const logoutButton = document.getElementById('logout-button');
    const profileEmail = document.getElementById('profile-email');
    const countryList = document.querySelectorAll('.country-list li');

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
            // Local storage for local testing
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            // Redirect to the main screen
            loginScreen.style.display = 'none';
            mainScreen.style.display = 'flex';
            logo.style.display = 'none'; // Hide the logo
        } else {
            // Show error message
            errorMessage.textContent= 'Incorrect email or password';
        }
    });

    // Handle dropdown button click
    dropdownButton.addEventListener('click', function() {
        countryPopup.style.display = 'flex'; // Show the country popup
    });

    // Handle profile button click
    profileButton.addEventListener('click', function() {
        profileEmail.textContent = `${storedEmail}`;
        profilePopup.style.display = 'flex'; // Show the profile popup
    });

    // Handle close icon click for country popup
    closeButton[0].addEventListener('click', function() {
        countryPopup.style.display = 'none'; // Hide the country popup
    });

    // Handle close icon click for profile popup
    closeButton[1].addEventListener('click', function() {
        profilePopup.style.display = 'none'; // Hide the profile popup
    });

    // Handle logout button click
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        window.location.reload(); // Refresh the page after logout
    });

    // Handle country selection
    countryList.forEach(function(countryItem) {
        countryItem.addEventListener('click', function() {
            const countryName = countryItem.textContent.trim();
            const countryFlag = countryItem.querySelector('img').cloneNode(true);

            // Resize the flag image to fit inside the button
            countryFlag.style.width = '20px'; // Adjust the width as needed
            countryFlag.style.height = 'auto'; // Maintain aspect ratio

            // Replace text in dropdown button with country flag and name
            dropdownButton.innerHTML = '';
            dropdownButton.appendChild(countryFlag);
            dropdownButton.insertAdjacentText('beforeend', countryName);
            dropdownButton.insertAdjacentHTML('beforeend', '<span class="dropdown-icon">&#9660;</span>');

            // Hide the country popup
            countryPopup.style.display = 'none';
        });
    });
})

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  
  const monthDisplay = document.getElementById('monthDisplay');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  function displayMonth() {
    monthDisplay.textContent = months[currentMonth] + ' ' + currentYear;
  }
  
  displayMonth();
  
  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    displayMonth();
  });
  
  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    displayMonth();
  });