const apiKey = "3d048a1532d5ab61392ae2ff16f9db8a";
const currentTemp = document.querySelector(".temperature");
const cityName = document.querySelector(".city-name");
const humidity_val = document.querySelector(".humidity-value");
const wind_speed = document.querySelector(".wind-speed");
const humidity_icon = document.querySelector(".humidity-icon");
const wind_icon = document.querySelector(".wind-icon");
const wheatherIcon = document.querySelector("#weather--icon");
const searchText = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const feelsLikeVal = document.querySelector(".feels-like");
const pressure = document.querySelector(".pressure");
const cloudness = document.querySelector(".cloudness");
const dateAndTime = document.querySelector(".date--time");
let endPoint = "weather";
function showLoader() {
  document.getElementById("loader").style.opacity = "1";
  document.getElementById("loader").style.visibility = "visible";
}
function hideLoader() {
  document.getElementById("loader").style.opacity = "0";
  document.getElementById("loader").style.visibility = "hidden";
}
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  const city = searchText.value;
  fetchWeatherData(endPoint, city);
});
async function fetchCoordinates(city) {
  const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(geocodeUrl);
  const data = await response.json();
  if (data.cod === 200) {
    return { lat: data.coord.lat, lon: data.coord.lon };
  } else {
    throw new Error("Invalid city name or unable to get coordinates.");
  }
}
async function fetchWeatherData(endPoint, city) {
  const { lat, lon } = await fetchCoordinates(city);
  showLoader();
  let weatherUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    if (data.cod === 200) {
      hideLoader();
      currentTemp.innerHTML = `${Math.trunc(data.main.temp)} °C`;
      cityName.innerHTML = data.name;
      humidity_val.innerHTML = `${data.main.humidity} %`;
      wind_speed.innerHTML = `${data.wind.speed} km/h`;
      wheatherIcon.src = `./assests/weather/${getWheatherIcon(
        data.weather[0].id
      )}`;
      feelsLikeVal.innerHTML = `${Math.trunc(data.main.feels_like)} °C`;
      pressure.innerHTML = `${data.main.pressure} hPa`;
      displayTime();
    }
  } catch (error) {
    hideLoader();
  }
}
function getWheatherIcon(id) {
  if (id <= 232) return "thunderstorm.svg";
  if (id <= 321) return "drizzle.svg";
  if (id <= 531) return "rain.svg";
  if (id <= 622) return "snow.svg";
  if (id <= 721) return "atmosphere.svg";
  if (id <= 800) return "clear.svg";
  else return "clouds.svg";
}
function displayTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const formattedTime = now.toLocaleString("en-US", options);
  dateAndTime.textContent = formattedTime;
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getCurrentPosition(latitude, longitude);
    },
    function (error) {
      console.error("Error Code: " + error.code + " - " + error.message);
    }
  );
} else {
}
function getCurrentPosition(latitude, longitude) {
  const apiKey = "5eeb8b5528a7413c965093fd0c4b4800";
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const cityName = data.features[0].properties.county;
      fetchWeatherData(endPoint, cityName);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
