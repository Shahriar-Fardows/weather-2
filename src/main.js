import "./style.css";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const apiKey = "b1ea2c963a3032b8e3e9a9c970cc75a4";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to fetch weather data
async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    const data = await response.json();
    
    if (data.cod === "404") {
      alert("City not found! Please enter a valid city name.");
      return;
    }

    updateWeatherUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to fetch weather data using latitude and longitude
async function checkWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(`${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const data = await response.json();

    updateWeatherUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to update the UI
function updateWeatherUI(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  const weatherCondition = data.weather[0].main.toLowerCase();
  const weatherImages = {
    clouds: "./public/images/clouds.png",
    clear: "./public/images/clear.png",
    rain: "./public/images/rain.png",
    drizzle: "./public/images/drizzle.png",
    mist: "./public/images/mist.png",
  };

  weatherIcon.src = weatherImages[weatherCondition] || "./public/images/clear.png";
}

// Function to get the user's location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        checkWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.warn("Geolocation denied. Defaulting to New York.");
        checkWeather("New York"); // If user denies location, default to New York
      }
    );
  } else {
    console.warn("Geolocation not supported. Defaulting to New York.");
    checkWeather("New York"); // If geolocation is not supported, default to New York
  }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Fetch weather on page load
window.onload = getUserLocation;
