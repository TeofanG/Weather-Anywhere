import {setFavIcon} from "./script.js";
const weatherBody = document.querySelector(".weatherBody");
const weatherImg = document.querySelector(".weatherImg");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humValue");
const windSpeed = document.querySelector(".windSpeedValue");
const minTemp = document.querySelector(".minTemp");
const maxTemp = document.querySelector(".maxTemp");
const cityName = document.querySelector(".city");
const sunriseTime = document.querySelector(".sunriseTime");
const sunsetTime = document.querySelector(".sunsetTime");
const locationNotFound = document.querySelector(".locationNotFound");
const pageBg = document.body.style;
let weatherData;

export async function checkWeather(city) {
  const api_key = "7bafe6af3ee919cb06d13efd38ae670d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  weatherData = await fetch(`${url}`).then((response) => response.json());
  let sunrise, sunset, currentTime;

  console.log(weatherData);

  /*extracting sunrise,sunset and current time in the specified location
  also preventing browser from parsing the time to the local time*/

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

function setWeatherInfo(sunrise, sunset) {
  locationNotFound.style.display = "none";
  weatherBody.style.display = "block";
  cityName.innerHTML = `${weatherData.name}`;
  temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  description.innerHTML = `${weatherData.weather[0].description}`;
  humidity.textContent = `${weatherData.main.humidity}%`;
  windSpeed.textContent = `${weatherData.wind.speed} km/h`;
  //minTemp.textContent = `${Math.round(weatherData.main.temp_min - 273.15)} °C`;
  //maxTemp.textContent = `${Math.round(weatherData.main.temp_max - 273.15)} °C`;
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

function setTheme(isDaytime) {
  switch (
    weatherData.weather[0].main //changing weather themes depending on the current weather status
  ) {
    case "Clouds":
      weatherImg.src = "../assets/images/clouds.png";
      if (isDaytime) {
        pageBg.backgroundImage = "url('../assets/themes/cloudy_day.gif')";
      } else {
        pageBg.backgroundImage = "url('../assets/themes/cloudy_night.png')";
      }
      break;
    case "Clear":
      weatherImg.src = "../assets/images/clear.png";
      if (isDaytime) {
        pageBg.backgroundImage = "url('../assets/themes/clear_day.png')";
      } else {
        pageBg.backgroundImage = "url('../assets/themes/clear_night.png')";
      }
      break;
    case "Rain":
      weatherImg.src = "../assets/images/rain.png";
      if (isDaytime) {
        pageBg.backgroundImage = "url('../assets/themes/rainy_day.gif')";
      } else {
        pageBg.backgroundImage = "url('../assets/themes/rainy_night.gif')";
      }
      break;
    case "Mist":
      weatherImg.src = "../assets/images/mist.png";
      if (isDaytime) {
        pageBg.backgroundImage = "url('../assets/themes/misty_day.png')";
      } else {
        pageBg.backgroundImage = "url('../assets/themes/misty_night.png')";
      }
      break;
    case "Snow":
      weatherImg.src = "../assets/images/snow.png";
      if (isDaytime) {
        pageBg.backgroundImage = "url('../assets/themes/snowy_day.gif')";
      } else {
        pageBg.backgroundImage = "url('../assets/themes/snowy_night.gif')";
      }
      break;
  }
}

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


export { weatherData };
