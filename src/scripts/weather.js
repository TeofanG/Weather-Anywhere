import { setFavIcon } from "./script.js";
const weatherBody = document.querySelector(".weatherBody");
const weatherImg = document.querySelector(".weatherImg");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humValue");
const windSpeed = document.querySelector(".windSpeedValue");
const cityName = document.querySelector(".city");
const sunriseTime = document.querySelector(".sunriseTime");
const sunsetTime = document.querySelector(".sunsetTime");
const locationNotFound = document.querySelector(".locationNotFound");
let pageBg = document.body.style;
let weatherData;

export async function checkWeather(city) {
  //again a very secured api key no one can access it
  const api_key = "7bafe6af3ee919cb06d13efd38ae670d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  weatherData = await fetch(`${url}`).then((response) => response.json());
  let sunrise, sunset, currentTime;

  //console.log(weatherData);

  /*extracting sunrise,sunset and current time in the specified location
  also preventing browser from converting the time to the local time*/

  if (weatherData.cod == `404`) {
    weatherBody.style.display = "none";
    locationNotFound.style.display = "block";
    return;
  } else {
    sunrise = new Date(
      (weatherData.sys.sunrise + weatherData.timezone) * 1000
    ).toISOString();
    sunset = new Date(
      (weatherData.sys.sunset + weatherData.timezone) * 1000
    ).toISOString();
    currentTime = new Date(
      (weatherData.dt + weatherData.timezone) * 1000
    ).toISOString();
    setWeatherInfo(sunrise, sunset);
    setTheme(checkIsDaytime(sunrise, sunset, currentTime));
    setFavIcon(weatherData.name);
  }
}

//this function checks if it's day or night to display proper theme and images
function checkIsDaytime(sunrise, sunset, currentTime) {
  if (
    sunrise.valueOf() < currentTime.valueOf() &&
    currentTime < sunset.valueOf()
  ) {
    return true;
  } else {
    return false;
  }
}

//set weather information like temperature, humidity, or wind speed
function setWeatherInfo(sunrise, sunset) {
  locationNotFound.style.display = "none";
  weatherBody.style.display = "block";
  cityName.innerHTML = `${weatherData.name}`;
  temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  description.innerHTML = `${weatherData.weather[0].description}`;
  humidity.textContent = `${weatherData.main.humidity}%`;
  windSpeed.textContent = `${weatherData.wind.speed} km/h`;

  sunriseTime.textContent = `${
    sunrise.split("T")[1].split(".")[0].split(":")[0] +
    ":" +
    sunrise.split("T")[1].split(".")[0].split(":")[1]
  }`;
  sunsetTime.textContent = `${
    sunset.split("T")[1].split(".")[0].split(":")[0] +
    ":" +
    sunset.split("T")[1].split(".")[0].split(":")[1]
  }`;
}

//changing weather themes depending on the current weather status
function setTheme(isDaytime) {
  switch (
    weatherData.weather[0].main 
  ) {
    case "Clouds":
      if (isDaytime) {
        pageBg.backgroundImage = "url('../../assets/themes/cloudy_day.gif')";
        weatherImg.src = "../../assets/images/day/clouds.png";
      } else {
        pageBg.backgroundImage = "url('../../assets/themes/cloudy_night.png')";
        weatherImg.src = "../../assets/images/night/clouds.png";
      }
      break;
    case "Clear":
      if (isDaytime) {
        pageBg.backgroundImage = "url('../../assets/themes/clear_day.png')";
        weatherImg.src = "../../assets/images/day/clear.png";
      } else {
        pageBg.backgroundImage = "url('../../assets/themes/clear_night.png')";
        weatherImg.src = "../../assets/images/night/clear.png";
      }
      break;
    case "Rain":
      if (isDaytime) {
        pageBg.backgroundImage = "url('../../assets/themes/rainy_day.gif')";
        weatherImg.src = "../../assets/images/day/rain.png";
      } else {
        pageBg.backgroundImage = "url('../../assets/themes/rainy_night.gif')";
        weatherImg.src = "../../assets/images/night/rain.png";
      }
      break;
    case "Mist":
      if (isDaytime) {
        pageBg.backgroundImage = "url('../../assets/themes/misty_day.png')";
        weatherImg.src = "../../assets/images/day/mist.png";
      } else {
        pageBg.backgroundImage = "url('../../assets/themes/misty_night.png')";
        weatherImg.src = "../../assets/images/night/mist.png";
      }
      break;
    case "Snow":
      if (isDaytime) {
        pageBg.backgroundImage = "url('../../assets/themes/snowy_day.gif')";
        weatherImg.src = "../../assets/images/day/snow.png";
      } else {
        pageBg.backgroundImage = "url('../../assets/themes/snowy_night.gif')";
        weatherImg.src = "../../assets/images/night/snow.png";
      }
      break;
    case "Drizzle":
      if (isDaytime) {
        pageBg.backgroundImage = "url('../../assets/themes/rainy_day.gif')";
        weatherImg.src = "../../assets/images/day/drizzle.png";
      } else {
        pageBg.backgroundImage = "url('../../assets/themes/rainy_night.gif')";
        weatherImg.src = "../../assets/images/night/drizzle.png";
      }
      break;
    default: pageBg.backgroundImage = "url('../../assets/themes/default.png')";
  }
}

export { weatherData };
