function displayTemperature(response) {
    console.log(response.data.temperature.current);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description");
    let feelsElement = document.querySelector("#feels-like");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    feelsElement.innerHTML = Math.round(response.data.temperature.feels_like);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "5aadb231294f844bcda7e81c8o0bct7f";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=Pula&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);