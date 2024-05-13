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

// CHART
document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("chartCanvas");
  var ctx = canvas.getContext("2d");

  function setCanvasSize() {
      var canvasWidth = window.innerWidth * 0.8;
      var canvasHeight = window.innerHeight * 0.4;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
  }

  setCanvasSize();

  window.addEventListener('resize', function() {
      setCanvasSize();
      drawChart();
  });

  function drawChart() {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.1, canvas.height * 0.1);
      ctx.lineTo(canvas.width * 0.1, canvas.height * 0.9);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.1, canvas.height * 0.9);
      ctx.lineTo(canvas.width * 0.9, canvas.height * 0.9);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "10px Arial";
      ctx.textAlign = "right";
      ctx.fillStyle = "#000";
      ctx.fillText("100%", canvas.width * 0.08, canvas.height * 0.1 + 5);
      ctx.fillText("80%", canvas.width * 0.08, canvas.height * 0.3 + 5);
      ctx.fillText("60%", canvas.width * 0.08, canvas.height * 0.5 + 5);
      ctx.fillText("40%", canvas.width * 0.08, canvas.height * 0.7 + 5);
      ctx.fillText("20%", canvas.width * 0.08, canvas.height * 0.9 + 5);
      ctx.fillText("0%", canvas.width * 0.08, canvas.height * 0.95 + 5);

      ctx.textAlign = "center";
      var xPositions = [1, 5, 9, 13, 17, 21, 24, 27, 30];
      var spacingFactor = 0.95 / 33;
      xPositions.forEach(function(position) {
          ctx.fillText(position, canvas.width * (0.1 + position * spacingFactor), canvas.height * 0.95 + 10);
      });
  }

  drawChart();
});

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
