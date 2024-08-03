function updateWeatherData(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}m/h`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "a17bt048aac153ed9acb6efaf1a6aobf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeatherData);
}

document.addEventListener("DOMContentLoaded", () => {
  adjustFontSize();
});

function adjustFontSize() {
  let cityNameElement = document.getElementById("#current-city");
  let maxLength = 14;
  let fontSizeMultiplier = 0.9;

  if (cityNameElement.textContent.length > maxLength) {
    let calculatedFontSize = fontSizeMultiplier * maxLength;
    cityNameElement.style.fontSize - `${calculatedFontSize}px`;
  } else {
    cityNameElement.style.fontSize = "";
  }
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

//create function to get units (imperial vs metric) for query

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", search);

searchCity("Portland");
