function updateWeatherData(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);

  formatDay(date);
  formatDate(date);
  formatTime(date);

  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#current-date");
  let dayElement = document.querySelector("#current-day");
  let timeElement = document.querySelector("#current-time");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}m/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="big-weather-icon" />`;
  timeElement.innerHTML = formatTime(newTime);
  dateElement.innerHTML = formatDate(date);
  dayElement.innerHTML = formatDay(date);
}

function formatDay(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = days[date.getDay()];
  return dayOfWeek;
}

function formatTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let newTime = `${hours}:${minutes}`;
  return newTime;
}

function formatDate(date) {
  const formattedDate = new Date(date);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return `${day} ${month} ${year}`;
}

function searchCity(city) {
  let apiKey = "a17bt048aac153ed9acb6efaf1a6aobf";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeatherData);
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
