document.addEventListener('DOMContentLoaded', function() {
    var soket1 = "wss://pulse.oximio.com:8987";
    var webSocket = new WebSocket(soket1);
    var ConectId='1';
    let storedEmail = '';
    let storedStatus ='';                                        // Добавлено
    let storedPassword = '';
    let storedGroup ='';
    let Token ='';  
    let Percent1=[];
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
    const countryList0 = document.getElementById('country-list');                                      //  Добавлено
    const countryList = document.querySelectorAll('.country-list li');
    const daysContainer = document.getElementById('daysContainer');
    const prevDayBtn = document.getElementById('prevDayBtn');
    const nextDayBtn = document.getElementById('nextDayBtn');
    const monthDisplay = document.getElementById('monthDisplay');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn'); 
    const applyButton = document.getElementById('applyButton');  
    const rangeSlider = document.getElementById('rangeSlider');
    const sliderPercentage = document.getElementById('sliderPercentage'); 
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const today = new Date();
    let currentDay = new Date().getDate();
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); 
    const savedDays = {};

    // BACKEND: Fetch stored email and password from the database instead of localStorage
    // if (data.type == 'getStorage')
    const mainScreenDisplay = document.getElementById('main-screen-display');
    let selectedCountry = 'Georgia';
    let selectedFlag = 'images/georgia-flag.png'; // Default flag
    let isAdmin = false;
    
    // Apply styles initially when the DOM content is fully loaded
    document.addEventListener('DOMContentLoaded', applyChartStyles);
    
    // Listen for orientation changes
    window.addEventListener('resize', applyChartStyles);

    // BACKEND: Replace this section with a database query to check if the user is an admin
    // if (data.type == 'getStorage')  
    displayMonth();
    updateApplyButtonState(); // Ensure Apply button reflects the state of the current selection
    const monthlyData = {};
    const data = {
        datasets: [{
            data: [],
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#34B4E3',
            pointBorderColor: '#34B4E3',
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#34B4E3',
            pointHoverBorderColor: '#34B4E3',
            pointHitRadius: 7,
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


        webSocket.onmessage = function (e) {
            if (e.data instanceof Blob) {
                reader = new FileReader();
                reader.onload = () => {
                    Decoder(reader.result);
                };
                reader.readAsText(e.data);
            } else {
                Decoder(e.data);    
            }
        };
        webSocket.onopen = function (e) {    
        };
    
        function Decoder(reader) { 
            const data = JSON.parse(reader);

            if (data.type == 'connection') {
                ConectId=data.id;   
                fetch('https://checkip.amazonaws.com/')
                .then((res) => res.text())
                .then((data) =>{
                    webSocket.send(JSON.stringify({
                       'type': 'getStorage',
                       'id':ConectId, 
                       'ip':data        
                    }));  
                } );
                     
            }
            

            if (data.type == 'reconect') {

                window.location.reload();
            }

            if (data.type == 'getStorage') {

                if (data.status=='ok'){
                    console.log(data);                                             // Добавлено
                    storedEmail = data.storedEmail;                                 
                    storedStatus = data.storedStatus;                             // Добавлено
                    storedPassword = data.storedPassword;
                    storedGroup = data.storedGroup;
                    Token=data.token;
                    console.log(storedStatus)                                      // Добавлено
                    if (storedStatus=='read'){                                     // Добавлено  
                        applyButton.style.visibility = 'hidden';                 // Добавлено
                        rangeSlider.style.visibility = 'hidden';                    
                    }
                        loginScreen.style.display = 'none';                        // Добавлено
                        mainScreen.style.display = 'flex';   
                        if (storedGroup=="Admin"){
                            storedGroup="Georgia,Hungary,Israel,Kenya,Serbia,South_Africa,Turkiye,Ukraine_B,Ukraine_K"
                        }                 
                        var array0 = storedGroup.split(',');
                        console.log(array0)
                    if (array0.length>1) {
                        isAdmin = true;
                       for (a=0; a<array0.length;a++){
                        let li = document.createElement("li");
                            li.setAttribute('data-flag',"images/"+array0[a].toLowerCase()+"-flag.png");
                            li.className='country0';
                            li.innerText=array0[a];
                        let img  = document.createElement("img");  
                            img.src = "images/"+array0[a].toLowerCase()+"-flag.png";
                            img.setAttribute('alt',array0[a]+' Flag');
                            li.insertBefore(img, li.firstChild);
                     countryList0.appendChild(li);                     
                        }
 
                        updateDropdownButton(selectedCountry, selectedFlag);
                        mainScreenDisplay.style.display = 'block';

                        let  delta=false;
                        for (b=0;b<array0.length;b++){
                            if(array0[b]==data.active){
                                delta=true;
                            }
                        }
                        console.log(delta)
                        if (delta==true){
                           selectedCountry = data.active;
                        }else{
                            selectedCountry = array0[0];
                        } 
                        selectedFlag = `images/${selectedCountry.toLowerCase()}-flag.png`;
                        updateDropdownButton(selectedCountry, selectedFlag);
                    } else {
                        mainScreenDisplay.style.display = 'block';
                        selectedCountry = storedGroup;
                        selectedFlag = `images/${selectedCountry.toLowerCase()}-flag.png`;
                        updateDropdownButton(selectedCountry, selectedFlag);
                        disableCountrySelection();
                    }               
                    webSocket.send(JSON.stringify({
                        'type': 'get_day',
                        'id':ConectId, 
                        'token':Token,
                        'month':currentMonth,
                        'year':currentYear,
                        'country':selectedCountry 
                    })); 

                }else{
                    loginScreen.style.display = 'flex';
                    mainScreen.style.display = 'none';
                    if (data.status=='error_login'){
                        errorMessage.innerText="Incorrect email or password" ;
                        setTimeout(sayHi, 2000);
                    }
                }
            }

            if (data.type == 'get_day') {                
                if (data.status=='ok'){

                   const returnedTarget = Object.assign(savedDays, data.days);

                   generateDays();
                   loadChartData()
                }else{

                } 
            }       
            
            if (data.type == 'set_per') {                
                if (data.status=='ok'){
                    loadChartData() ;
                    webSocket.send(JSON.stringify({
                        'type': 'get_day',
                        'id':ConectId, 
                        'token':Token,
                        'month':currentMonth,
                        'year':currentYear,
                        'country':selectedCountry 
                    }));
                }else{

                } 
            }  
            
            if (data.type == 'get_per') {                
                if (data.status=='ok'){
                    Percent1=data.data;
                    myChart.data.datasets[0].data = data.data;    
                    myChart.update();
                    const selectedMonthLabel = document.getElementById('selectedMonthLabel');
               //     selectedMonthLabel.textContent = `${months[currentMonth].slice(0, 3)}`;
                    setSliderValueForDay(currentDay);
                }else{

                }
            }    

        }
        
 

    

    function applyChartStyles() {
       
    }
    

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        fetch('https://checkip.amazonaws.com/')
        .then((res) => res.text())
        .then((data) =>{
            webSocket.send(JSON.stringify({
                'type': 'getUser',
                'id':ConectId, 
                'login':email,
                'password':password,       
               'ip':data        
            }));  
        } );

        // BACKEND: Validate login credentials against the database
        //if (data.type == 'getStorage')

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
        webSocket.send(JSON.stringify({
            'type': 'delIp',
            'id':ConectId,
            'token':Token     
        }));  
    });



    countryList0.onclick = function fn(e) {
        e = e || event;
        var target = e.target || e.srcElement;
        const countryName = target.innerText;
        selectedFlag = target.getAttribute('data-flag');
        console.log(selectedFlag);
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
        loadChartData(); // BACKEND: Load chart data from the database for the selected country      
    };


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
            loadChartData(); // BACKEND: Load chart data from the database for the selected country         
            
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

    function sayHi() {
        errorMessage.innerText="" ;
     };

    function displayMonth() {
        monthDisplay.textContent = months[currentMonth] + ' ' + currentYear;
        updateMonthButtons();
    }
    

    function saveMonth() {
        webSocket.send(JSON.stringify({
            'type': 'get_day',
            'id':ConectId, 
            'token':Token,
            'month':currentMonth,
            'year':currentYear,
            'country':selectedCountry 
        })); 
        const selectedMonth = {
            month: currentMonth + 1,
            year: currentYear
        };
        if (currentYear === today.getFullYear() && currentMonth === today.getMonth()){
            if (currentDay<today.getDate()){
              let delta =today.getDate()-currentDay;             
              for (a=0;a<delta;a++){                             
             nextDayBtn.click();                
              }
           }else{
               let delta =currentDay-today.getDate(); 
               console.log("Delta-"+delta)
               for (a=0;a<delta;a++){                           
               prevDayBtn.click();
               }
           }              
       }

    }

    function updateMonthButtons() {
        if (currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
            nextMonthBtn.disabled = true;
        } else {
            nextMonthBtn.disabled = false;
        }
    }


    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateDaysInMonth(); // Update days in month when month/year changes
        displayMonth();
        saveMonth(); // BACKEND: Save month data to the database
        loadChartData(); // BACKEND: Load chart data from the database for the updated month
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
            saveMonth(); // BACKEND: Save month data to the database
            loadChartData(); // BACKEND: Load chart data from the database for the updated month
            generateDays();
            
        }
    });
    

    function updateDaysInMonth() {
        
        daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        if(storedStatus=='w&r'){                                                                                                         // Добавлено
            let temp=false;                                                                                                                   // Добавлено
            const date=new Date();                                                                                                            // Добавлено
            if (((currentMonth==date.getMonth())&&(currentYear==date.getFullYear())&&(storedStatus=='w&r'))){        // Добавлено
                 temp=true;                                                                                                                    // Добавлено
            }else{                                                                                                                             // Добавлено
                if ((currentMonth+1==date.getMonth())&&(currentYear==date.getFullYear())&&(date.getDate()<6)){                               // Добавлено
                     temp=true;                                                                                                                   // Добавлено
                }                                                                                                                            // Добавлено
            }                                                                                                                                 // Добавлено
            if (temp==true){                                                                                                                  // Добавлено
                applyButton.style.visibility = 'visible';  
                rangeSlider.style.visibility = 'visible';                                                                                    // Добавлено
            }else{                                                                                                                            // Добавлено
                applyButton.style.visibility = 'hidden';  
                rangeSlider.style.visibility = 'hidden';                                                                                     // Добавлено  
            }                                                                                                                                 // Добавлено
        }                                                                                                                                   // Добавлено
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
                dayElement.style.color = '#BDBDBD';
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
        saveDay(); // BACKEND: Save day data to the database
        setSliderValueForDay(currentDay);
    }
    
    
    
    function setSliderValueForDay(day) {
        const key = getMonthlyDataKey();
         // Example backend: Fetch percentage data for the day
        // Replace with backend API call to get percentage data
        const dayData = monthlyData[key]?.data.find(point => point.x === day);
        const percentage = Percent1[currentDay].y;
        rangeSlider.value = percentage;
        sliderPercentage.textContent = percentage + '%';
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
    // Example backend: Save selected day
    // Implement save logic via backend API call
    }
    
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
    
 
    rangeSlider.addEventListener('input', function() {
        const value = rangeSlider.value;
        sliderPercentage.textContent = value + '%';
    });

    function savePercentage(percentage,sday,smonth,syear) {
        let country1=selectedCountry.replace(/ /,'_');
        webSocket.send(JSON.stringify({
            'type': 'set_per',
            'id':ConectId,
            'login':storedEmail,
            'percent':percentage,
            'day':sday,
            'month':smonth,
            'year':syear,
            'country':selectedCountry,
            'token':Token     
        }));  
    // Example backend: Save percentage
    // Implement save logic via backend API call
    }

applyButton.addEventListener('click', function() {
    let temp=false;
    var date = new Date();
    if (((currentMonth==date.getMonth())&&(currentYear==date.getFullYear()))||(storedGroup=='Admin')){
        temp=true
    }else{
         if ((currentMonth+1==date.getMonth())&&(currentYear==date.getFullYear())&&(currentDay<6)){
         temp=true
         }
    }   
  
    if (temp==true){
        if (isSelectedDayFuture()) {
            return; // Do nothing if the selected day is in the future
        }
       const selectedMonth = currentMonth + 1;
       const selectedYear = currentYear;
       const selectedDay = currentDay;
       const selectedPercentage = rangeSlider.value;
       savePercentage(selectedPercentage,selectedDay,currentMonth,selectedYear); // Example backend: Save percentage for the day    
       addDataToChart(selectedDay, selectedPercentage);
       generateDays();
    }
    
});

function updateApplyButtonState() {
    applyButton.disabled = isSelectedDayFuture();
}

    function getMonthlyDataKey() {
        return `${selectedCountry}-${currentYear}-${currentMonth + 1}`;
    }

    function loadChartData() {
       // Example backend: Load chart data for the selected month
        // Fetch data from the backend 
 
      webSocket.send(JSON.stringify({
        'type': 'get_per',
        'id':ConectId,
        'month':currentMonth,
        'year':currentYear,
        'country':selectedCountry,
        'token':Token     
    }));
      
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
            loadChartData(); // Example backend: Load chart data
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

    function isDaySaved(country, year, month, day) {
        const key = `${country}-${year}-${month}-${day}`;
        return savedDays[key] || false;
    }
});
