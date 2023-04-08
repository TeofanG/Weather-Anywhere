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

//const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector(".weather-body");

export async function checkWeather(city) {
  const api_key = "7bafe6af3ee919cb06d13efd38ae670d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weatherData = await fetch(`${url}`).then((response) => response.json());

  const sunrise = new Date((weatherData.sys.sunrise + weatherData.timezone) * 1000).toISOString();//.toISOString(); //stop browser to convert sunrise/sunset time
  const sunset = new Date((weatherData.sys.sunset + weatherData.timezone) * 1000).toISOString(); //from a city to the local time

  /*if(weatherData.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }*/

  //location_not_found.style.display = "none";
  weatherBody.style.display = "block";
  temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  description.innerHTML = `${weatherData.weather[0].description}`;
  cityName.innerHTML = `${weatherData.name}`;
  humidity.textContent = `${weatherData.main.humidity}%`;
  windSpeed.textContent = `${weatherData.wind.speed}Km/H`;
  sunriseTime.textContent = `${sunrise.split("T")[1].split(".")[0].split(":")[0] + ":" + sunrise.split("T")[1].split(".")[0].split(":")[1]}`;
  sunsetTime.textContent = `${sunset.split("T")[1].split(".")[0].split(":")[0] + ":" + sunset.split("T")[1].split(".")[0].split(":")[1]}`;

  switch (weatherData.weather[0].main) {
    case "Clouds":
      weatherImg.src = "../assets/images/clouds.png";
      break;
    case "Clear":
      weatherImg.src = "../assets/images/clear.png";
      break;
    case "Rain":
      weatherImg.src = "../assets/images/rain.gif";
      break;
    case "Mist":
      weatherImg.src = "../assets/images/mist.png";
      break;
    case "Snow":
      weatherImg.src = "../assets/images/snow.png";
      break;
  }
  console.log(weatherData);
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
  inputBox.value = "";
});
