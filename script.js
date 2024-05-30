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
      // For backend: Validate user credentials
      // fetch('/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ email: email, password: password })
      // })
      // .then(response => response.json())
      // .then(data => {
      //   if (data.success) {
      //     // Store credentials in local storage for local testing
      //     localStorage.setItem('email', email);
      //     localStorage.setItem('password', password);
  
      //     // Redirect to the main screen
      //     loginScreen.style.display = 'none';
      //     mainScreen.style.display = 'flex';
      //     logo.style.display = 'none'; // Hide the logo
      //   } else {
      //     // Show error message
      //     errorMessage.textContent = 'Incorrect email or password';
      //   }
      // })
      // .catch(error => {
      //   console.error('Error:', error);
      // });
  
      // Temporary local validation for testing purposes
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
        errorMessage.textContent = 'Incorrect email or password';
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
  
    // Month Carousel Logic
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
  
    const monthDisplay = document.getElementById('monthDisplay');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
  
    function displayMonth() {
      monthDisplay.textContent = months[currentMonth] + ' ' + currentYear;
    }
  
    function saveMonth() {
      const selectedMonth = {
        month: currentMonth + 1, // Month index to human-readable month (1-12)
        year: currentYear
      };
  
      // Backend integration: Replace this comment with code to send selected month to the backend
      // Example code for sending data to backend using fetch API:
      /*
      fetch('/save-month', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedMonth)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      */
    }
  
    displayMonth();
  
    prevMonthBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      displayMonth();
      saveMonth(); // Save the selected month and year
    });
  
    nextMonthBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    displayMonth();
    saveMonth(); // Save the selected month and year
  });

  // Day Carousel Logic
  const daysContainer = document.getElementById('daysContainer');
  const prevDayBtn = document.getElementById('prevDayBtn');
  const nextDayBtn = document.getElementById('nextDayBtn');
  
  let currentDay = new Date().getDate();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  function generateDays() {
      daysContainer.innerHTML = '';
      let startDay = currentDay - 2;
      if (startDay < 1) startDay = 1;
      let endDay = startDay + 4;
      if (endDay > daysInMonth) {
        endDay = daysInMonth;
        startDay = endDay - 4; // Adjust startDay to ensure 5 slides are visible
        if (startDay < 1) startDay = 1;
      }
      for (let i = startDay; i <= endDay; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        if (i === currentDay) {
          dayElement.classList.add('center-slide'); // Add class to center slide
        }
        daysContainer.appendChild(dayElement);
      }
    }
    
  function updateDay(newDay) {
    currentDay = newDay;
    if (currentDay < 1) {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      currentDay = daysInMonth;
    } else if (currentDay > daysInMonth) {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      currentDay = 1;
    }
    generateDays();
    saveDay();
  }

  function saveDay() {
    const selectedDay = {
      day: currentDay,
      month: currentMonth + 1, // Month index to human-readable month (1-12)
      year: currentYear
    };

    // Backend integration: Replace this comment with code to send selected day to the backend
    // Example code for sending data to backend using fetch API:
    /*
    fetch('/save-day', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedDay)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
  }

  generateDays();

  prevDayBtn.addEventListener('click', () => {
    updateDay(currentDay - 1);
  });

  nextDayBtn.addEventListener('click', () => {
    updateDay(currentDay + 1);
  });

  // Slider Logic
  const rangeSlider = document.getElementById('rangeSlider');
  const sliderPercentage = document.getElementById('sliderPercentage');
  
  rangeSlider.addEventListener('input', function() {
    const value = rangeSlider.value;
    sliderPercentage.textContent = value + '%';
  });

  function savePercentage(percentage) {
    // Backend integration: Replace this comment with code to send selected percentage to the backend
    // Example code for sending data to backend using fetch API:
    /*
    fetch('/save-percentage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ percentage: percentage })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
  }

  // Apply Button Logic
  const applyButton = document.getElementById('applyButton');

  applyButton.addEventListener('click', function() {
    const selectedPercentage = rangeSlider.value;
    savePercentage(selectedPercentage); // Save the selected percentage

    const selectedMonth = currentMonth + 1;
    const selectedYear = currentYear;
    const selectedDay = currentDay;

    // Backend integration: Replace this comment with code to send selected month, year, and day to the backend
    // Example code for sending data to backend using fetch API:
    /*
    fetch('/save-date', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ month: selectedMonth, year: selectedYear, day: selectedDay })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
  });
});

