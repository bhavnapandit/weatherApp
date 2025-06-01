const inputBox = document.querySelector(".input-box");
const weather_img = document.querySelector(".weather-img");
const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const date = document.querySelector(".date");
let newDate = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
async function checkWeather(city_name) {
  
  const api_key = "01b4a8ba9459b5ec419f0580288d9386";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );
  if (weather_data.cod === `404`) {
    weather_img.src="img/error.png";
    description.innerHTML = `INVALID CITY`;
    humidity.innerHTML = `0 %`;
    temperature.innerHTML = `0 °C`;
    wind_speed.innerHTML = `0 Km/H`;
  }

  humidity.innerHTML = `${weather_data.main.humidity}%`;
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  // console.log(newDate.getDay());

  date.innerHTML = days[newDate.getDay()];
  console.log(weather_data.cod);

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src="img/cloud.png";
      break;
    case "Clear":
      weather_img.src="img/clear.png";
      break;
    case "Rain":
      weather_img.src="img/rain.png";
      if (weather_data.weather[0].description == "heavy rain") {
        document.querySelector(".alert_message").style.display = "block";
      }
      break;
    case "Mist":
      weather_img.src="img/mist.png";
      break;
    case "Snow":
      weather_img.src="img/snow.png";
      if (weather_data.weather[0].description == "heavy snow") {
        document.querySelector(".alert_message").style.display = "block";
      }
      break;
  }
}
// console.log(searchBtn);
searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
