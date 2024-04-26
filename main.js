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

//   DAYS
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
  h2.innerHTML = percentageByValue;
}
calc();



  