import { checkWeather, weatherData } from "./weather.js";
const favCities = [];
const favButton = document.getElementById("add2fav");
const inputBox = document.querySelector(".inputBox");
const searchBtn = document.querySelector(".searchButton");
const favSection = document.querySelector(".favSection");
const goToFavButton = document.querySelector("header").children[0];

//this function checks if the given city is already added to favorites
function checkFavorite(data) {
  let flag = 0;
  favCities.forEach((item) => {
    if (data == item.name) {
      flag = 1;
      return;
    }
  });
  if (flag) {
    return true;
  } else {
    return false;
  }
}

//this function add current city to the favorite section of the page
function addToFavSection(weatherData) {
  //add city to favorites array
  favCities.push(weatherData);

  //insert an element with weather info for the city
  let favElem = document.createElement("div");
  favElem.setAttribute("class", "favElem");
  favElem.setAttribute("title", `${weatherData.name}`);
  favElem.style.backgroundImage =  document.body.style.backgroundImage;

  //insert city name
  let city = document.createElement("span");
  city.textContent = `${weatherData.name}`;
  favElem.appendChild(city);

  //insert temperature
  let temp = document.createElement("span");
  temp.setAttribute("class", "favTemp");
  temp.textContent = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  favElem.appendChild(temp);

  favSection.appendChild(favElem);

  //show weather info of the favorite city when it is clicked
  favElem.addEventListener("click", () => {
    checkWeather(weatherData.name);
  });
}

//this function remove a city from favorites
function removeFromFav(cityName) {
  favCities.forEach((item) => {
    if (cityName == item.name) {
      let elem = document.querySelector(`[title=${weatherData.name}]`);
      console.log(elem);
      elem.remove();
      favCities.splice(favCities.indexOf(item), 1);
      setFavIcon();
    }
  });
}

//adding or removing city from favorites when the fav button is clicked
favButton.addEventListener("click", () => {
  if (checkFavorite(weatherData.name)) {
    removeFromFav(weatherData.name);
    if(favCities.length==0) goToFavButton.style.display = "none";
    setFavIcon();
  } else {
    addToFavSection(weatherData);
    if(favCities.length==1) goToFavButton.style.display = "block";
    setFavIcon();
  }
});

//set fav icon of the city
export function setFavIcon() {
  if (checkFavorite(weatherData.name)) {
    favButton.firstElementChild.src = "../../assets/icons/favorited.png";
    favButton.firstElementChild.title = "Remove city from favorites.";
  } else {
    favButton.firstElementChild.src = "../../assets/icons/add_favorite.png";
    favButton.firstElementChild.title = "Add city to favorites.";
  }
}

// allows submiting search by clicking on the search button
searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
  inputBox.value = "";
});

// allows submiting search by pressing Enter key
inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkWeather(inputBox.value);
    inputBox.value = "";
  }
});

//show/hide favorites locations on click
goToFavButton.addEventListener("click", () => {
  if(favSection.style.display == "flex") {
    favSection.style.display = "none";
  }
  else{
    favSection.style.display = "flex";
  }
});