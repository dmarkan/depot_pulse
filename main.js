// DATE
const date = new Date();
let day = date.getDate();
let month = date.toLocaleString('default', { month: 'long' });
let year = date.getFullYear();
let dayDisplay = document.getElementById("dayDisplay");
let monthDisplay = document.getElementById("monthDisplay");
let yearDisplay = document.getElementById("yearDisplay");

window.onload = () => {
    dayDisplay.innerHTML = day;
    monthDisplay.innerHTML = month + "&nbsp";
    yearDisplay.innerHTML = year;
};
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