import "./style.css";

// require("dotenv").config();

// fetch Data from API
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "b1ea2c963a3032b8e3e9a9c970cc75a4"

//grab the input from searchbox and grab the button

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");


async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();
  console.log(data)
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = data.main.temp + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed;
}
searchBtn.addEventListener("click",()=>{
  checkWeather(searchBox.value)
})
