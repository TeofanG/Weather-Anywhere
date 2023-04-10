import { checkWeather, weatherData } from "./weather.js";
const favCities = [];
const favButton = document.getElementById("add2fav");
const inputBox = document.querySelector(".inputBox");
const searchBtn = document.querySelector(".searchButton");
const favSection = document.querySelector(".favSection");
const seeFavButton = document.querySelector("header").children[0];

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
  favCities.push(weatherData);

  let favElem = document.createElement("div");
  favElem.setAttribute("class","favElem");
  favElem.setAttribute("title",`${weatherData.name}`);
  favElem.style.background =   document.body.style.backgroundImage;

  let city = document.createElement("span");
  city.textContent = `${weatherData.name}`;
  favElem.appendChild(city);

  let temp = document.createElement("span");
  temp.setAttribute("class","favTemp");
  temp.textContent = `${Math.round(weatherData.main.temp - 273.15)}°C`;
  favElem.appendChild(temp);
  
  favSection.appendChild(favElem);

  favElem.addEventListener("click",() =>{
    checkWeather(weatherData.name);
  })
}

//this function remove a city from favorites
function removeFromFav(cityName) {
  favCities.forEach((item) => {
    if (cityName == item.name) {
      const sel = document.querySelector(`[title=${weatherData.name}]`);
  console.log(sel);
  sel.remove();
      favCities.splice(favCities.indexOf(item), 1);
      setFavIcon();
    }
  });
}

//adding or removing city from favorites when the fav button is clicked
favButton.addEventListener("click", () => {
  if (checkFavorite(weatherData.name)) {
    removeFromFav(weatherData.name);
    //removeFromFavSection(weatherData.id);
    setFavIcon();
  } else {
   
    addToFavSection(weatherData);
    setFavIcon();
  }
});

export function setFavIcon() {
  if (checkFavorite(weatherData.name)) {
    favButton.firstElementChild.src = "../assets/icons/favorited.png";
    favButton.firstElementChild.title = "Remove city from favorites.";
  } else {
    favButton.firstElementChild.src = "../assets/icons/add_favorite.png";
    favButton.firstElementChild.title = "Add city to favorites.";

  }
}

// allows submiting search by clicking on the search button
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

seeFavButton.addEventListener("mouseover",()=>{
  console.log(seeFavButton);
  favSection.style.display = "flex";
})