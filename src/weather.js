const inputBox = document.querySelector(".inputBox");     
const searchBtn = document.querySelector(".searchButton");
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
const pageBg = document.body.style;
let isDaytime;

export async function checkWeather(city) {
  const api_key = "7bafe6af3ee919cb06d13efd38ae670d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weatherData = await fetch(`${url}`).then((response) => response.json());

  if (weatherData.cod == `404`) {             //handling api error or incorrect given location(error message to user)
    weatherBody.style.display = "none";
    locationNotFound.style.display = "block";
    return;
  }

  const sunrise = new Date(                                         //extracting sunrise,sunset and current time in the specified location 
    (weatherData.sys.sunrise + weatherData.timezone) * 1000         //also preventing browser from parsing the time to the local time
  ).toISOString();
  const sunset = new Date(
    (weatherData.sys.sunset + weatherData.timezone) * 1000
  ).toISOString();
  const currentTime = new Date(
    (weatherData.dt + weatherData.timezone) * 1000
  ).toISOString();

  if (
    sunrise.valueOf() < currentTime.valueOf() &&
    currentTime < sunset.valueOf()
  ) {
    isDaytime = true;
  } else {
    isDaytime = false;
  }

  console.log(currentTime);

  locationNotFound.style.display = "none";
  weatherBody.style.display = "block";
  temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  description.innerHTML = `${weatherData.weather[0].description}`;
  cityName.innerHTML = `${weatherData.name}`;
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

  switch (
    weatherData.weather[0].main           //changing weather themes depending on the current weather status
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
  console.log(weatherData);
}

// allow submiting search by clicking on the search button or by pressing "Enter" key

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
  inputBox.value = "";
});

inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkWeather(inputBox.value);
    inputBox.value = "";
  }
});
