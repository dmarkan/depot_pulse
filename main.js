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
  // Get elements
  var applyButton = document.querySelector('.apply');
  var popup = document.querySelector('.popup');
  var closeButton = document.querySelector('.close-btn');
  var countryPIN = {
    "Georgia": "1111",
    "Hungary": "2222",
    "Israel": "3333",
    "Serbia": "4444",
    "South Africa": "5555",
    "Turkey": "6666",
    "Ukraine B": "7777",
    "Ukraine K": "8888"
  };

  // Apply button click event
  applyButton.addEventListener('click', function() {
      // Show popup
      popup.style.display = 'block';
      // Get selected country
      var selectedCountry = document.querySelector('.dropbtn').textContent.trim();
      // Get PIN for selected country
      var pinInput = document.querySelector('.pin-input');
      pinInput.placeholder = 'Enter PIN for ' + selectedCountry;
      pinInput.value = '';
      pinInput.dataset.pin = countryPIN[selectedCountry];
  });

  // Close button click event
  closeButton.addEventListener('click', function() {
      // Hide popup
      popup.style.display = 'none';
  });

  // Apply button in popup click event
  var applyPopupButton = document.querySelector('.popup-container .apply-btn');
  applyPopupButton.addEventListener('click', function() {
      var pinInput = document.querySelector('.pin-input');
      var enteredPIN = pinInput.value;
      var correctPIN = pinInput.dataset.pin;
      if (enteredPIN === correctPIN) {
          alert('Data for selected country SAVED!');
          // Close popup
          popup.style.display = 'none';
          // Set background color for selected day
          var selectedDay = document.querySelector('.center-custom-day');
          selectedDay.style.backgroundColor = '#DFF7E3';
      } else {
          alert('Invalid PIN country');
      }
  });

  // Add event listener to each carousel item
  var carouselItems = document.querySelectorAll('.custom-carousel-item');
  carouselItems.forEach(function(item) {
      item.addEventListener('click', function() {
          // Reset background color for all items
          carouselItems.forEach(function(item) {
              item.style.backgroundColor = '#fff'; // Reset background color
          });
          // Set background color for the clicked item
          item.style.backgroundColor = '#DFF7E3';
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Initialize Chart.js
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
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
                      callback: function(value, index, values) {
                          return value + '%'; // Append '%' to tick labels
                      }
                  }
              }
          }
      }
  });

  // Function to update chart data based on selected day and percentage
  function updateChart(day, percentage) {
      // Add or update data point
      myChart.data.datasets[0].data.push({x: day, y: percentage});
      // Update the chart
      myChart.update();
  }

  // Event listener for applying filter
  document.querySelector('.apply').addEventListener('click', function() {
      // Get selected day from carousel
      var selectedDay = parseInt(document.querySelector('.center-custom-day').textContent);
      // Get selected percentage from slider
      var selectedPercentage = parseInt(document.getElementById('range').value);
      // Update the chart with selected data
      updateChart(selectedDay, selectedPercentage);
  });
});
