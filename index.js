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
currentData.innerHTML = `${day} ${hours < 10 ? "0" + hours : hours}:${
  minutes < 10 ? "0" + minutes : minutes
}`;

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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "t30b14d043f4785o44a6db20dfb9221a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then((response) => {
    displayForecast(response);
  });
}
function displayWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureValue = document.querySelector("#temperatureValue");
  temperatureValue.innerHTML = temperature;

  let humidity = response.data.temperature.humidity;
  let humidityValue = document.querySelector("#humidityValue");
  humidityValue.innerHTML = humidity + "%";

  let wind = response.data.wind.speed;
  let windValue = document.querySelector("#windValue");
  windValue.innerHTML = wind + " km/h";

  let city = response.data.city;
  let cityValue = document.querySelector("#cityValue");
  cityValue.innerHTML = city;
  getForecast(response.data.city);

  let description = response.data.condition.description;
  let descriptionValue = document.querySelector("#descriptionValue");
  descriptionValue.innerHTML = description;

  let iconUrl = response.data.condition.icon_url;
  let iconValue = document.querySelector("#icon_url");
  iconValue.src = iconUrl;

  let weatherCondition = description.toLowerCase();
  let body = document.querySelector("body");

  if (/clouds/.test(weatherCondition)) {
    body.style.backgroundImage = "url('images/cloud.jpg')";
  } else if (/clear/.test(weatherCondition)) {
    body.style.backgroundImage = "url('images/sun.jpg')";
  } else if (/rain/.test(weatherCondition)) {
    body.style.backgroundImage = "url('images/rain.jpg')";
  } else {
    body.style.backgroundImage = "url('images/background.jpg')";
  }
}

function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
