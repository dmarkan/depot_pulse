// SELECT COUNTRY
function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.classList.toggle("show");
  document.body.classList.toggle("overlay"); // Toggle the "overlay" class on the body
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
              document.body.classList.remove("overlay"); // Remove the "overlay" class from the body
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
  updateCustomCarousel(15); // Start with center day 15
});

function updateCustomCarousel(centerDay) {
  const customCarouselItems = document.querySelectorAll('.custom-carousel-item');
  const centerIndex = Math.floor(customCarouselItems.length / 2);

  for (let i = 0; i < customCarouselItems.length; i++) {
      let newDay = centerDay - centerIndex + i;
      // Adjust for days below 1 and above 31
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
  const centerDay = parseInt(customCarouselItems[2].textContent); // Center item is at index 2
  const newCenterDay = centerDay === 1 ? 31 : centerDay - 1;
  updateCustomCarousel(newCenterDay);
}

function nextDay() {
  const customCarouselItems = document.querySelectorAll('.custom-carousel-item');
  const centerDay = parseInt(customCarouselItems[2].textContent); // Center item is at index 2
  const newCenterDay = centerDay === 31 ? 1 : centerDay + 1;
  updateCustomCarousel(newCenterDay);
}

// SLIDER
const slider = document.getElementById('slider');
const range = document.getElementById('range');
const h2 = document.querySelector('h2');
const inputText = document.getElementById('input');
const inputBy = document.getElementById('inputBy');

// h2.innerHTML = range.value;
range.oninput = calc;

function calc() {
  const percentageByValue = (range.value * inputText.value) / 100;
  h2.innerHTML = percentageByValue + "%";
}
calc();

// CHART
document.addEventListener("DOMContentLoaded", function() {
  // Get canvas element
  var canvas = document.getElementById("chartCanvas");
  var ctx = canvas.getContext("2d");

  // Function to set canvas size
  function setCanvasSize() {
      var canvasWidth = window.innerWidth * 0.8; // 80% of the window width
      var canvasHeight = window.innerHeight * 0.4; // 40% of the window height
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
  }

  // Call the function to set canvas size initially
  setCanvasSize();

  // Redraw the chart whenever the window size changes
  window.addEventListener('resize', function() {
      setCanvasSize();
      drawChart();
  });

  // Function to draw the chart
  function drawChart() {
      // Set background color
      ctx.fillStyle = "#ffffff"; // white
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw y-axis line
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.1, canvas.height * 0.1); // Start from 10% of canvas width and height
      ctx.lineTo(canvas.width * 0.1, canvas.height * 0.9); // Draw vertically to 90% of canvas height
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw x-axis line
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.1, canvas.height * 0.9); // Start from 10% of canvas width and 90% of canvas height
      ctx.lineTo(canvas.width * 0.9, canvas.height * 0.9); // Draw horizontally to 90% of canvas width
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw y-axis ticks
      ctx.font = "10px Arial"; // Smaller font size
      ctx.textAlign = "right";
      ctx.fillStyle = "#000";
      ctx.fillText("100%", canvas.width * 0.08, canvas.height * 0.1 + 5); // Adjusted position
      ctx.fillText("80%", canvas.width * 0.08, canvas.height * 0.3 + 5); // Adjusted position
      ctx.fillText("60%", canvas.width * 0.08, canvas.height * 0.5 + 5); // Adjusted position
      ctx.fillText("40%", canvas.width * 0.08, canvas.height * 0.7 + 5); // Adjusted position
      ctx.fillText("20%", canvas.width * 0.08, canvas.height * 0.9 + 5); // Adjusted position
      ctx.fillText("0%", canvas.width * 0.08, canvas.height * 0.95 + 5); // Adjusted position

      // Draw x-axis ticks
      ctx.textAlign = "center";
      var xPositions = [1, 5, 9, 13, 17, 21, 24, 27, 30];
      var spacingFactor = 0.95 / 33; // 33 is the maximum number
      xPositions.forEach(function(position) {
          ctx.fillText(position, canvas.width * (0.1 + position * spacingFactor), canvas.height * 0.95 + 10);
      });
  }

  // Initial drawing of the chart
  drawChart();
});
