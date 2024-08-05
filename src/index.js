function updateWeatherData(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dayElement = document.querySelector("#current-day");
  let dateElement = document.querySelector("#current-date");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  dayElement.innerHTML = formatDay(date);
  dateElement.innerHTML = formatDate(date);
  timeElement.innerHTML = formatTime(date);

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}m/h`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDay(date) {
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
  return day;
}

function formatTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(date) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();

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
