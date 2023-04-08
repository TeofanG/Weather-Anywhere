import { getWeather } from "./weather.js";
let latitude=30;
let longitude=10;
/*
function setCoord(position){
    latitude =  
    longitude = position.coords.longitude;
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCoord);
  } else {
    alert("Cant get location");
  }
}
*/

//getCurrentLocation();
//setCoord();

getWeather(
  
).then(renderWeather)

function renderWeather({ current }) {
  renderCurrentWeather(current);
}

function renderCurrentWeather(current) {
  document.querySelector(".temp").textContent = current.currentTemp;
}
