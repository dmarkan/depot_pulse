document.addEventListener('DOMContentLoaded', function() {
    const validEmail = 'admin@oximio.com';
    const validPassword = 'admin123';

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

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    let selectedCountry = 'Georgia';

    // Check for stored credentials
    if (storedEmail === validEmail && storedPassword === validPassword) {
        loginScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
        logo.style.display = 'none';
    } else {
        loginScreen.style.display = 'flex';
        mainScreen.style.display = 'none';
    }

    // Handle login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        if (email === validEmail && password === validPassword) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            loginScreen.style.display = 'none';
            mainScreen.style.display = 'flex';
            logo.style.display = 'none';
        } else {
            errorMessage.textContent = 'Incorrect email or password';
        }
    });

    // Show country selection popup
    dropdownButton.addEventListener('click', function() {
        countryPopup.style.display = 'flex';
    });

    // Show profile popup
    profileButton.addEventListener('click', function() {
        profileEmail.textContent = `${storedEmail}`;
        profilePopup.style.display = 'flex';
    });

    // Close popups
    closeButton[0].addEventListener('click', function() {
        countryPopup.style.display = 'none';
    });

    closeButton[1].addEventListener('click', function() {
        profilePopup.style.display = 'none';
    });

    // Logout
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        window.location.reload();
    });

    // Handle country selection
    countryList.forEach(function(countryItem) {
        countryItem.addEventListener('click', function() {
            const countryName = countryItem.textContent.trim();
            const countryFlag = countryItem.querySelector('img').cloneNode(true);

            countryFlag.style.width = '20px';
            countryFlag.style.height = 'auto';

            dropdownButton.innerHTML = '';
            dropdownButton.appendChild(countryFlag);
            dropdownButton.insertAdjacentText('beforeend', countryName);
            dropdownButton.insertAdjacentHTML('beforeend', '<span class="dropdown-icon">&#9660;</span>');

            countryPopup.style.display = 'none';

            selectedCountry = countryName;
            loadChartData();
        });
    });

    // Month navigation and display
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

        // Backend integration placeholder
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
        displayMonth();
        saveMonth();
        loadChartData();
    });

    nextMonthBtn.addEventListener('click', () => {
        if (!(currentYear === today.getFullYear() && currentMonth === today.getMonth())) {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            displayMonth();
            saveMonth();
            loadChartData();
        }
    });

    // Day navigation and display
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
            startDay = endDay - 4;
            if (startDay < 1) startDay = 1;
        }
        for (let i = startDay; i <= endDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            if (i === currentDay) {
                dayElement.classList.add('center-slide');
            }
            daysContainer.appendChild(dayElement);
            dayElement.addEventListener('click', () => {
                updateDay(i);
            });
        }
        updateDayButtons();
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

    function updateDayButtons() {
        if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && currentDay === today.getDate()) {
            nextDayBtn.disabled = true;
        } else {
            nextDayBtn.disabled = false;
        }
    }

    function saveDay() {
        const selectedDay = {
            day: currentDay,
            month: currentMonth + 1,
            year: currentYear
        };

        // Backend integration placeholder
    }

    generateDays();

    prevDayBtn.addEventListener('click', () => {
        updateDay(currentDay - 1);
    });

    nextDayBtn.addEventListener('click', () => {
        updateDay(currentDay + 1);
    });

    // Range slider functionality
    const rangeSlider = document.getElementById('rangeSlider');
    const sliderPercentage = document.getElementById('sliderPercentage');

    rangeSlider.addEventListener('input', function() {
        const value = rangeSlider.value;
        sliderPercentage.textContent = value + '%';
    });

    function savePercentage(percentage) {
        // Backend integration placeholder
    }

    const applyButton = document.getElementById('applyButton');

    applyButton.addEventListener('click', function() {
        const selectedPercentage = rangeSlider.value;
        savePercentage(selectedPercentage);

        const selectedMonth = currentMonth + 1;
        const selectedYear = currentYear;
        const selectedDay = currentDay;

        // Backend integration placeholder

        addDataToChart(selectedDay, selectedPercentage);
    });

    // Chart data management
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
                    label: function(context) {
                        return context.dataset.label + ': ' + context.raw.y.toFixed(2) + '%';
                    }
                }
            }
        },
        onResize: function(chart) {
            const ctx = chart.ctx;
            ctx.font = '14px Arial';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.fillText(months[currentMonth], 10, chart.height - 10);
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
});

