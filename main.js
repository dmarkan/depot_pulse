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



  