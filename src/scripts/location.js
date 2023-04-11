import { checkWeather } from "./weather.js";
let userLocation = navigator.geolocation;

//get location of the user in terms of latitude and longitude
export function geolocator() {
  if (userLocation) {
    userLocation.getCurrentPosition(getLocation);
  } else {
    ("The geolocation API is not supported by your browser.");
  }
}

//transform latitude and longitude values into a location name and then display information of the current weather
async function getLocation(data) {
  const latitude = data.coords.latitude;
  const longitude = data.coords.longitude;
  //now comes a very secured api key
  const apiKey = "7bafe6af3ee919cb06d13efd38ae670d"; 
  const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;

  const locationData = await fetch(`${apiUrl}`).then((response) =>
    response.json()
  );
  checkWeather(locationData[0].name);
}

geolocator();