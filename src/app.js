function formatDate(timestamp) {
    //calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }  
    let minutes = date.getMinutes(); 
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }   
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city")
    let descriptionElement = document.querySelector("#description");
    let feelsElement = document.querySelector("#feels-like");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon")

    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    feelsElement.innerHTML = Math.round(response.data.temperature.feels_like);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", response.data.condition.icon_url);
    iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
    let apiKey = "5aadb231294f844bcda7e81c8o0bct7f";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

search("Pula");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);