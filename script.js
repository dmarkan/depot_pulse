document.addEventListener('DOMContentLoaded', function() {
    const adminEmail = 'admin@oximio.com';
    const adminPassword = 'admin123';

    const countryCredentials = {
        'georgia@oximio.com': 'georgia123',
        'hungary@oximio.com': 'hungary123',
        'israel@oximio.com': 'israel123',
        'serbia@oximio.com': 'serbia123',
        'south_africa@oximio.com': 'south_africa123',
        'turkiye@oximio.com': 'turkiye123',
        'ukraine_b@oximio.com': 'ukraine_b123',
        'ukraine_k@oximio.com': 'ukraine_k123',
        // Add additional country emails and passwords here
    };

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
    const logoutButton = document.getElementById('logout-button');
    const profileEmail = document.getElementById('profile-email');
    const countryList = document.querySelectorAll('.country-list li');

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    let selectedCountry = 'Georgia';
    let selectedFlag = 'images/georgia-flag.png'; // Default flag
    let isAdmin = false;

    if (storedEmail === adminEmail && storedPassword === adminPassword) {
        loginScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
        isAdmin = true;
        updateDropdownButton(selectedCountry, selectedFlag);
    } else if (countryCredentials[storedEmail] === storedPassword) {
        loginScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
        selectedCountry = storedEmail.split('@')[0];
        selectedFlag = `images/${selectedCountry.toLowerCase()}-flag.png`;
        updateDropdownButton(selectedCountry, selectedFlag);
        disableCountrySelection();
    } else {
        loginScreen.style.display = 'flex';
        mainScreen.style.display = 'none';
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        if (email === adminEmail && password === adminPassword) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            loginScreen.style.display = 'none';
            mainScreen.style.display = 'flex';
            isAdmin = true;
            updateDropdownButton(selectedCountry, selectedFlag);
        } else if (countryCredentials[email] === password) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            loginScreen.style.display = 'none';
            mainScreen.style.display = 'flex';
            selectedCountry = email.split('@')[0];
            selectedFlag = `images/${selectedCountry.toLowerCase()}-flag.png`;
            updateDropdownButton(selectedCountry, selectedFlag);
            disableCountrySelection();
        } else {
            errorMessage.textContent = 'Incorrect email or password';
        }
    });

    dropdownButton.addEventListener('click', function() {
        if (isAdmin) {
            countryPopup.style.display = 'flex';
        }
    });

    profileButton.addEventListener('click', function() {
        profileEmail.textContent = `${storedEmail}`;
        profilePopup.style.display = 'flex';
    });

    closeButton[0].addEventListener('click', function() {
        countryPopup.style.display = 'none';
    });

    closeButton[1].addEventListener('click', function() {
        profilePopup.style.display = 'none';
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        window.location.reload();
    });

    countryList.forEach(function(countryItem) {
        countryItem.addEventListener('click', function() {
            const countryName = countryItem.textContent.trim();
            selectedFlag = countryItem.getAttribute('data-flag');
            updateDropdownButton(countryName, selectedFlag);
            countryPopup.style.display = 'none';
            selectedCountry = countryName;
    
            // Set the current month and day
            currentMonth = today.getMonth(); // Current month
            currentYear = today.getFullYear(); // Current year
            currentDay = today.getDate(); // Current day
    
            // Update UI
            displayMonth();
            generateDays();
            loadChartData();
        });
    });
    

    function updateDropdownButton(countryName, flagUrl) {
        const selectedFlagImage = document.getElementById('selectedFlag');
        const selectedCountryName = document.getElementById('selectedCountryName');
        const dropdownButton = document.querySelector('.dropdown-icon');
        
        selectedFlagImage.src = flagUrl;
        selectedCountryName.textContent = countryName.charAt(0).toUpperCase() + countryName.slice(1);
        
        // Apply or remove the class to hide the arrow
        if (isAdmin) {
            dropdownButton.classList.remove('no-arrow');
        } else {
            dropdownButton.classList.add('no-arrow');
        }
    }
     

    function disableCountrySelection() {
        countryList.forEach((item) => {
            if (item.textContent.trim() !== selectedCountry) {
                item.style.pointerEvents = 'none';
                item.style.color = 'gray';
            }
        });
    }

    function enableCountrySelection() {
        countryList.forEach((item) => {
            item.style.pointerEvents = 'auto';
            item.style.color = 'black';
        });
    }

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const today = new Date();

    const monthDisplay = document.getElementById('monthDisplay');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');

    function displayMonth() {
        monthDisplay.textContent = months[currentMonth] + ' ' + currentYear;
        updateMonthButtons();
    }
    

    function saveMonth() {
        const selectedMonth = {
            month: currentMonth + 1,
            year: currentYear
        };
        // Implement save logic if needed
    }

    function updateMonthButtons() {
        if (currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
            nextMonthBtn.disabled = true;
        } else {
            nextMonthBtn.disabled = false;
        }
    }

    displayMonth();

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateDaysInMonth(); // Update days in month when month/year changes
        displayMonth();
        saveMonth();
        loadChartData();
        generateDays();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        if (!(currentYear === today.getFullYear() && currentMonth === today.getMonth())) {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateDaysInMonth(); // Update days in month when month/year changes
            displayMonth();
            saveMonth();
            loadChartData();
            generateDays();
        }
    });
    

    const daysContainer = document.getElementById('daysContainer');
    const prevDayBtn = document.getElementById('prevDayBtn');
    const nextDayBtn = document.getElementById('nextDayBtn');

    let currentDay = new Date().getDate();
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const savedDays = JSON.parse(localStorage.getItem('savedDays')) || {};

    function updateDaysInMonth() {
        daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    }
    

    function generateDays() {
        daysContainer.innerHTML = '';
        let startDay = currentDay - 2;
        if (startDay < 1) startDay = 1;
        let endDay = startDay + 4;
        if (endDay > daysInMonth) {
            endDay = daysInMonth;
            startDay = endDay - 4;
            if (startDay < 1) startDay = 1;
        }
        for (let i = startDay; i <= endDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
    
            // Check if the day is in the future and apply the background color
            const isFutureDay = new Date(currentYear, currentMonth, i) > today;
            if (isFutureDay) {
                dayElement.style.backgroundColor = '#808080';
            } else {
                if (i === currentDay) {
                    dayElement.classList.add('center-slide');
                }
                if (isDaySaved(selectedCountry, currentYear, currentMonth, i)) {
                    dayElement.classList.add('saved-day');
                }
            }
    
            daysContainer.appendChild(dayElement);
        }
        updateDayButtons();
    }
    

    
    function updateDay(newDay) {
        if (newDay < 1) {
            currentDay = 1;
        } else if (newDay > daysInMonth) {
            currentDay = daysInMonth;
        } else {
            currentDay = newDay;
        }
    
        if (currentDay < 1) {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateDaysInMonth();
            currentDay = daysInMonth;
        } else if (currentDay > daysInMonth) {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            currentDay = 1;
            updateDaysInMonth();
        }
    
        generateDays();
        saveDay();
        setSliderValueForDay(currentDay);
    }
    
    
    
    function setSliderValueForDay(day) {
        const key = getMonthlyDataKey();
        const dayData = monthlyData[key]?.data.find(point => point.x === day);
        const percentage = dayData ? dayData.y : 0;
        rangeSlider.value = percentage;
        sliderPercentage.textContent = percentage + '%';
    }
    
    function addDataToChart(day, percentage) {
        const key = getMonthlyDataKey();
        if (!monthlyData[key]) {
            monthlyData[key] = { data: [] };
        }
        const existingIndex = monthlyData[key].data.findIndex(point => point.x === day);
        if (existingIndex === -1) {
            monthlyData[key].data.push({ x: day, y: percentage });
        } else {
            monthlyData[key].data[existingIndex] = { x: day, y: percentage };
        }
        loadChartData();
        updateDayStyle(day);
        setSliderValueForDay(day); // Ensure slider is updated when data is added
    }    

    function updateDayButtons() {
        // Disable nextDayBtn if on the last day of the current month or current day
        if ((currentDay === daysInMonth && !(currentYear === today.getFullYear() && currentMonth === today.getMonth())) ||
            (currentDay === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear())) {
            nextDayBtn.disabled = true;
        } else {
            nextDayBtn.disabled = false;
        }

        // Disable prevDayBtn if on the first day of the current month
        if (currentDay === 1) {
            prevDayBtn.disabled = true;
        } else {
            prevDayBtn.disabled = false;
        }
    }


    function saveDay() {
        const selectedDay = {
            day: currentDay,
            month: currentMonth + 1,
            year: currentYear
        };
        // Implement save logic if needed
    }

    generateDays();

    prevDayBtn.addEventListener('click', () => {
        updateDay(currentDay - 1);
    });

    nextDayBtn.addEventListener('click', () => {
        // Prevent moving past the current day in the current month
        if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && currentDay >= today.getDate()) {
            return;
        }
        updateDay(currentDay + 1);
    });
    
    function isSelectedDayFuture() {
        const selectedDayElement = Array.from(daysContainer.children).find(dayElement => {
            return parseInt(dayElement.textContent) === currentDay;
        });
        return selectedDayElement && selectedDayElement.style.backgroundColor === 'rgb(128, 128, 128)'; // rgb value for #808080
    }
    
    const rangeSlider = document.getElementById('rangeSlider');
    const sliderPercentage = document.getElementById('sliderPercentage');

    rangeSlider.addEventListener('input', function() {
        const value = rangeSlider.value;
        sliderPercentage.textContent = value + '%';
    });

    function savePercentage(percentage) {
        // Implement save logic if needed
    }

    const applyButton = document.getElementById('applyButton');

applyButton.addEventListener('click', function() {
    if (isSelectedDayFuture()) {
        return; // Do nothing if the selected day is in the future
    }

    const selectedPercentage = rangeSlider.value;
    savePercentage(selectedPercentage);
    const selectedMonth = currentMonth + 1;
    const selectedYear = currentYear;
    const selectedDay = currentDay;
    addDataToChart(selectedDay, selectedPercentage);
    markDayAsSaved(selectedCountry, currentYear, currentMonth, currentDay);
    generateDays();
});

function updateApplyButtonState() {
    applyButton.disabled = isSelectedDayFuture();
}

generateDays(); // Call this function to set the initial state of Apply button
updateApplyButtonState(); // Ensure Apply button reflects the state of the current selection


    const monthlyData = {};

    function getMonthlyDataKey() {
        return `${selectedCountry}-${currentYear}-${currentMonth + 1}`;
    }

    function loadChartData() {
        const key = getMonthlyDataKey();
        const monthData = monthlyData[key] || { labels: [], data: [] };
        myChart.data.datasets[0].data = monthData.data;
        myChart.update();
        const selectedMonthLabel = document.getElementById('selectedMonthLabel');
        selectedMonthLabel.textContent = `${months[currentMonth].slice(0, 3)}`;
    }

    const data = {
        datasets: [{
            data: [],
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: '#34B4E3',
            pointBorderColor: '#34B4E3',
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#34B4E3',
            pointHoverBorderColor: '#34B4E3',
            pointHitRadius: 10,
            pointStyle: 'circle'
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    },
                    stepSize: 20,
                    maxTicksLimit: 6
                }
            },
            x: {
                type: 'linear',
                beginAtZero: true,
                min: 1,
                max: 31,
                ticks: {
                    stepSize: 4,
                    callback: function(value) {
                        return value % 1 === 0 ? value : '';
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        const date = new Date(currentYear, currentMonth, context[0].raw.x);
                        return `${date.toDateString()}`;
                    },
                    label: function(context) {
                        return `Percentage: ${context.raw.y}%`;
                    }
                }
            }
        }
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });

    function addDataToChart(day, percentage) {
        const key = getMonthlyDataKey();
        if (!monthlyData[key]) {
            monthlyData[key] = { data: [] };
        }
        const existingIndex = monthlyData[key].data.findIndex(point => point.x === day);
        if (existingIndex === -1) {
            monthlyData[key].data.push({ x: day, y: percentage });
        } else {
            monthlyData[key].data[existingIndex] = { x: day, y: percentage };
        }
        loadChartData();
        updateDayStyle(day);
    }

    function updateDayStyle(day) {
        const dayElements = daysContainer.querySelectorAll('div');
        dayElements.forEach((dayElement) => {
            if (parseInt(dayElement.textContent) === day) {
                dayElement.classList.add('saved-day');
            }
        });
    }

    function markDayAsSaved(country, year, month, day) {
        const key = `${country}-${year}-${month}-${day}`;
        savedDays[key] = true;
        localStorage.setItem('savedDays', JSON.stringify(savedDays));
    }

    function isDaySaved(country, year, month, day) {
        const key = `${country}-${year}-${month}-${day}`;
        return savedDays[key] || false;
    }
});
// ===========