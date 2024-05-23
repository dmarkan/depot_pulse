// SELECT COUNTRY
function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.classList.toggle("show");
  document.body.classList.toggle("overlay");
}

function selectCountry(countryName, flagSrc) {
  var dropbtn = document.querySelector(".dropbtn");
  dropbtn.innerHTML = '<img src="' + flagSrc + '" alt="' + countryName + ' Flag" class="flag-icon">' + countryName;
  toggleDropdown();
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdown-content')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
              document.body.classList.remove("overlay");
          }
      }
  }
}

// DATE
document.addEventListener("DOMContentLoaded", function() {
  updateCarousel(new Date());
});

function updateCarousel(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const carouselItem = document.getElementById('carousel-item');
  carouselItem.innerHTML = months[date.getMonth()] + ' ' + date.getFullYear();
}

function prevMonth() {
  const currentDate = new Date(document.getElementById('carousel-item').textContent);
  const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  updateCarousel(newDate);
}

function nextMonth() {
  const currentDate = new Date(document.getElementById('carousel-item').textContent);
  const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  updateCarousel(newDate);
}

// DAYS
document.addEventListener("DOMContentLoaded", function() {
  updateCustomCarousel(15);
});

function updateCustomCarousel(centerDay) {
  const customCarouselItems = document.querySelectorAll('.custom-carousel-item');
  const centerIndex = Math.floor(customCarouselItems.length / 2);

  for (let i = 0; i < customCarouselItems.length; i++) {
      let newDay = centerDay - centerIndex + i;
      if (newDay < 1) {
          newDay = 31 + newDay;
      } else if (newDay > 31) {
          newDay = newDay - 31;
      }
      customCarouselItems[i].textContent = newDay;
      if (i === centerIndex) {
          customCarouselItems[i].classList.add('center-custom-day');
      } else {
          customCarouselItems[i].classList.remove('center-custom-day');
      }
  }
}

function prevDay() {
  const customCarouselItems = document.querySelectorAll('.custom-carousel-item');
  const centerDay = parseInt(customCarouselItems[2].textContent);
  const newCenterDay = centerDay === 1 ? 31 : centerDay - 1;
  updateCustomCarousel(newCenterDay);
}

function nextDay() {
  const customCarouselItems = document.querySelectorAll('.custom-carousel-item');
  const centerDay = parseInt(customCarouselItems[2].textContent);
  const newCenterDay = centerDay === 31 ? 1 : centerDay + 1;
  updateCustomCarousel(newCenterDay);
}

// SLIDER
const range = document.getElementById('range');
const h2 = document.querySelector('h2');
const inputText = document.getElementById('input');

range.oninput = calc;

function calc() {
  const percentageByValue = (range.value * inputText.value) / 100;
  h2.innerHTML = percentageByValue + "%";
}
calc();

// POPUP WINDOW
document.addEventListener("DOMContentLoaded", function() {
  var applyButton = document.querySelector('.apply');
  var popup = document.querySelector('.popup');
  var closeButton = document.querySelector('.close-btn');

  applyButton.addEventListener('click', function() {
      popup.style.display = 'block';
  });

  closeButton.addEventListener('click', function() {
      popup.style.display = 'none';
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Function to create a new Chart.js instance for a specific country
  function createChart(country) {
      var ctx = document.getElementById(`chart-${country}`).getContext('2d');
      var chart = new Chart(ctx, {
          type: 'line', // Use line chart to connect the dots
          data: {
              datasets: [{
                  label: 'Selected Data',
                  backgroundColor: '#34B4E3', // Dot color
                  data: [], // Data points will be added dynamically
                  pointRadius: 5, // Size of the dots
                  pointHoverRadius: 7, // Size of the dots on hover
                  borderColor: '#34B4E3', // Line color
                  borderWidth: 2, // Line width
                  fill: false // Disable fill under the line
              }]
          },
          options: {
              scales: {
                  x: {
                      type: 'linear', // Use linear scale for x-axis
                      ticks: {
                          stepSize: 1, // Step size between ticks
                          precision: 0 // Number of decimal places
                      }
                  },
                  y: {
                      type: 'linear', // Use linear scale for y-axis
                      min: 0, // Minimum value of y-axis
                      max: 100, // Maximum value of y-axis
                      ticks: {
                          stepSize: 20, // Step size between ticks
                          callback: function(value) {
                              return value + '%'; // Append '%' to tick labels
                          }
                      }
                  }
              },
              plugins: {
                  title: {
                      display: true,
                      text: '',
                      position: 'bottom',
                      align: 'start',
                      color: '#082E6A', // Set text color
                      font: {
                          size: 16,
                          weight: 'bold'
                      },
                      padding: {
                          top: 10,
                          left: 0,
                          right: 0,
                          bottom: 0
                      }
                  }
              }
          }
      });
      return chart;
  }

  // Function to update chart data based on selected day and percentage
  function updateChart(chart, day, percentage) {
      // Add or update data point
      chart.data.datasets[0].data.push({ x: day, y: percentage });
      // Update the chart
      chart.update();
  }

  // Function to save data to local storage
  function saveData(country, month, chart) {
      var chartData = chart.data.datasets[0].data;
      var savedData = JSON.parse(localStorage.getItem(country)) || {};
      savedData[month] = chartData;
      localStorage.setItem(country, JSON.stringify(savedData));
  }

  // Function to load data from local storage
  function loadData(country, month, chart) {
      var savedData = JSON.parse(localStorage.getItem(country)) || {};
      var chartData = savedData[month];
      if (chartData) {
          chart.data.datasets[0].data = chartData;
          chart.update();
      }
  }

  // Event listener for applying filter
  document.querySelector('.apply').addEventListener('click', function() {
      // Get selected day from carousel
      var selectedDay = parseInt(document.querySelector('.center-custom-day').textContent);
      // Get selected percentage from slider
      var selectedPercentage = parseInt(document.getElementById('range').value);
      // Get selected country
      var selectedCountry = document.querySelector('.dropbtn').textContent.trim();
      // Get selected month
      var selectedMonth = document.getElementById('carousel-item').textContent.trim();
      // Get chart for the selected country
      var chart = charts[selectedCountry];
      // Update the chart with selected data
      updateChart(chart, selectedDay, selectedPercentage);
      // Save the data to local storage
      saveData(selectedCountry, selectedMonth, chart);
  });

  // Function to check PIN and load data
  function checkPIN() {
      var pinInput = document.querySelector('.pin-input');
      var enteredPIN = pinInput.value;
      var selectedCountry = document.querySelector('.dropbtn').textContent.trim();
      var correctPINs = {
          "Georgia": "1111",
          "Hungary": "2222",
          "Israel": "3333",
          "Serbia": "4444",
          "South Africa": "5555",
          "Turkey": "6666",
          "Ukraine B": "7777",
          "Ukraine K": "8888"
      };
      var correctPIN = correctPINs[selectedCountry];

      if (enteredPIN === correctPIN) {
          alert('Data for selected country SAVED!');
          // Close popup
          document.querySelector('.popup').style.display = 'none';
          // Load data from local storage
          var selectedMonth = document.getElementById('carousel-item').textContent.trim();
          loadData(selectedCountry, selectedMonth, charts[selectedCountry]);
          return true;
      } else {
          alert('Invalid PIN for selected country');
          return false;
      }
  }

  // Event listener for the Apply button in the popup
  document.querySelector('.popup-container .apply-btn').addEventListener('click', checkPIN);

  // Set the slider color
  var rangeSlider = document.getElementById('range');
  rangeSlider.style.backgroundColor = '#808080'; // Set slider color

  // Update slider track color
  rangeSlider.addEventListener('input', function() {
      var value = (rangeSlider.value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min) * 100;
      rangeSlider.style.background = `linear-gradient(to right, #34B4E3 ${value}%, #808080 ${value}%)`;
  });

  // Function to delete all data from local storage
  function deleteAllData() {
      localStorage.clear();
      alert('All data has been deleted.');
      // Clear all charts
      for (var country in charts) {
          charts[country].data.datasets[0].data = [];
          charts[country].update();
      }
  }

  // Create Delete button
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.style.position = 'fixed';
  deleteButton.style.bottom = '10px';
  deleteButton.style.right = '10px';
  deleteButton.style.backgroundColor = '#f44336';
  deleteButton.style.color = '#fff';
  deleteButton.style.border = 'none';
  deleteButton.style.padding = '10px';
  deleteButton.style.cursor = 'pointer';
  deleteButton.style.borderRadius = '5px';
  document.body.appendChild(deleteButton);

  // Add event listener to Delete button
  deleteButton.addEventListener('click', deleteAllData);

  // Object to store all charts
  var charts = {};

  // Add event listener to country dropdown menu
  var countryDropdownItems = document.querySelectorAll('.dropdown-content a');
  countryDropdownItems.forEach(function(item) {
      item.addEventListener('click', function() {
        var selectedCountry = item.textContent.trim();
        // Create a new chart if not already created
        if (!charts[selectedCountry]) {
            var chartContainer = document.createElement('div');
            chartContainer.setAttribute('class', 'chart-container');
            chartContainer.innerHTML = `<canvas id="chart-${selectedCountry}"></canvas>`;
            document.body.appendChild(chartContainer);
            charts[selectedCountry] = createChart(selectedCountry);
        }
        document.querySelector('.dropbtn').textContent = selectedCountry;
        // Hide all charts except the one for the selected country
        for (var country in charts) {
            if (country === selectedCountry) {
                document.getElementById(`chart-${country}`).style.display = 'block';
            } else {
                document.getElementById(`chart-${country}`).style.display = 'none';
            }
        }
        // Load data for the selected country
        var selectedMonth = document.getElementById('carousel-item').textContent.trim();
        loadData(selectedCountry, selectedMonth, charts[selectedCountry]);
    });
});

// Initial load for the selected country
var defaultCountry = "Georgia"; // Set your default country here
charts[defaultCountry] = createChart(defaultCountry);
loadData(defaultCountry, '', charts[defaultCountry]);
});

