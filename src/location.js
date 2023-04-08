import { checkWeather } from "./weather.js";
let userLocation = navigator.geolocation;

function geolocator() {
  if (userLocation) {
    userLocation.getCurrentPosition(getLocation);
  } else {
    ("The geolocation API is not supported by your browser.");
  }
}

async function getLocation(data) {
  const latitude = data.coords.latitude;
  const longitude = data.coords.longitude;
  const apiKey = "7bafe6af3ee919cb06d13efd38ae670d";
  const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;

  const locationData = await fetch(`${apiUrl}`).then((response) =>
    response.json()
  );
  checkWeather(locationData[0].name);
  //console.log(locationData[0].name);
}

geolocator();