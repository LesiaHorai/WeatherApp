let now = new Date();
let currentData = document.querySelector("#currentdata");
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
currentData.innerHTML = `${day} ${hours}:${minutes}`;

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let searchCity = document.getElementById("search-city-input").value;
    getWeather(searchCity);
  });

function getWeather(city) {
  let apiKey = "t30b14d043f4785o44a6db20dfb9221a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then((response) => {
    displayWeather(response);
  });
}

function displayWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureValue = document.querySelector("#temperatureValue");
  temperatureValue.innerHTML = temperature;

  let humidity = response.data.temperature.humidity;
  let humidityValue = document.querySelector("#humidityValue");
  humidityValue.innerHTML = humidity;

  let wind = response.data.wind.speed;
  let windValue = document.querySelector("#windValue");
  windValue.innerHTML = wind;

  let city = response.data.city;
  let cityValue = document.querySelector("#cityValue");
  cityValue.innerHTML = city;

  let description = response.data.condition.description;
  let descriptionValue = document.querySelector("#descriptionValue");
  descriptionValue.innerHTML = description;

  let iconUrl = response.data.condition.icon_url;
  let iconValue = document.querySelector("#icon_url");
  iconValue.src = iconUrl;
}
