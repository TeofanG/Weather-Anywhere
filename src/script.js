const inputBox = document.querySelector(".inputBox");
const searchBtn = document.querySelector(".searchButton");
const weatherImg = document.querySelector(".weatherImg");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".weatherInfo");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");
const cityName = document.querySelector(".city");

//const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


export async function checkWeather(city){
    //https://api.openweathermap.org/data/2.5/weather?q=Bucharest&appid=7bafe6af3ee919cb06d13efd38ae670d
    const api_key = "7bafe6af3ee919cb06d13efd38ae670d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weatherData = await fetch(`${url}`).then(response => response.json());


    /*if(weatherData.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");weather_img.
        return;
    }*/

    //location_not_found.style.display = "none";
    //weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    cityName.innerHTML = `${weatherData.name}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;


    switch(weatherData.weather[0].main){
        case 'Clouds':
            weatherImg.src = "../assets/images/clouds.png";
            break;
        case 'Clear':
            weatherImg.src = "../assets/images/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "../assets/images/rain.gif";
            break;
        case 'Mist':
            weatherImg.src = "../assets/images/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "../assets/images/snow.png";
            break;

    }

    console.log(weatherData);
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(inputBox.value);
    inputBox.value = "";
});
