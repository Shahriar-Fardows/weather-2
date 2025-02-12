import "./style.css";

// require("dotenv").config();

// fetch Data from API
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "b1ea2c963a3032b8e3e9a9c970cc75a4"

//grab the input from searchbox and grab the button

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")


async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();
  console.log(data)
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = data.main.temp + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";


  if(data.weather[0].main == "Clouds"){
    console.log(data.weather[0].main)
    weatherIcon.src = "/src/images/clouds.png"
  }
  else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "/src/images/clear.png"

  }
  else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "/src/images/rain.png"

  }
  else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "/src/images/drizzle.png"

  }
  else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "/src/images/mist.png"

  }
}
searchBtn.addEventListener("click",()=>{
  checkWeather(searchBox.value)
})
