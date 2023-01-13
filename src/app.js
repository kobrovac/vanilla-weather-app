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

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];

}

function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let days = ["Fri", "Sat", "Sun", "Mon"];

    let forecastHTML = `<div class="row">`
    forecast.forEach(function(forecastDay, index) {

        if (index < 6) {
        forecastHTML = forecastHTML + 
    `
        <div class="col-2">
            <div class="weather-forecast-date">
                ${formatDay(forecastDay.time)}
            </div>
                <img src="${forecastDay.condition.icon_url}"
                alt="" width="42"/>
                    <div class="weather-forecast-temperature">
                       <span class="weather-forecast-temperature-max">
                        ${
                            Math.round(forecastDay.temperature.maximum)
                        }° </span>
                        <span class="weather-forecast-temperature-min">
                          ${Math.round(forecastDay.temperature.minimum)
                        }°
                        </span>
                    </div>
        </div>
           
    `;
    };
   });
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "5aadb231294f844bcda7e81c8o0bct7f";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayForecast);
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

    celsiusTemperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    feelsElement.innerHTML = Math.round(response.data.temperature.feels_like);
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src", response.data.condition.icon_url);
    iconElement.setAttribute("alt", response.data.condition.description);

    getForecast(response.data.coordinates);
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


let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Pula");
