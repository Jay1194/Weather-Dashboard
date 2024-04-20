const API_KEY = "030315a07ff75a445c30f1d122ec064c"; 

document.querySelector("#city-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let city = document.querySelector("#city").value.trim().toLowerCase();
    if (city) {
        fetchWeather(city);
        document.querySelector("#city").value = ""; 
    } else {
        alert("Please enter a city name!");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    fetchWeather('San Francisco');
});

function fetchWeather(city) {
    getCurrentWeather(city)
        .then(data => {
            if (!searchHistory.includes(city)) { 
                updateSearchHistory(city);
            }
            displayCurrentWeather(city, data);
            get5DayForecast(city);
        })
        .catch(error => {
            alert("Unable to connect to the weather service: " + error.message);
        });
}

function getCurrentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        });
}

function displayCurrentWeather(city, data) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.querySelector("#curCity").textContent = `${city.toUpperCase()} (${new Date().toLocaleDateString()})`;
    document.querySelector("#icon").src = iconUrl;
    document.querySelector("#curTemp").textContent = `Temperature: ${data.main.temp}°C`;
    document.querySelector("#curWind").textContent = `Wind: ${data.wind.speed} km/h`;
    document.querySelector("#curHum").textContent = `Humidity: ${data.main.humidity}%`;
}

function get5DayForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => display5DayForecast(data.list))
        .catch(error => console.error("Failed to fetch data", error));
}

function display5DayForecast(forecasts) {
    const forecastContainer = document.querySelector("#forecastContainer");
    forecastContainer.innerHTML = ''; 
    forecastContainer.style.display = 'flex'; 
    forecastContainer.style.justifyContent = 'space-around'; 
    forecastContainer.style.flexWrap = 'wrap'; 

    forecasts.filter((_, index) => index % 8 === 0).forEach(forecast => {
        const forecastDiv = document.createElement('div');
        forecastDiv.className = 'card text-white bg-dark cards'; 
        const date = new Date(forecast.dt_txt).toLocaleDateString();
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

        forecastDiv.innerHTML = `
            <div class="card-body">
                <h5>Date: <span>${date}</span></h5>
                <img src="${iconUrl}" alt="Weather icon">
                <h5>Temp: <span>${forecast.main.temp.toFixed(1)}°C</span></h5>
                <h5>Wind: <span>${forecast.wind.speed.toFixed(1)} km/h</span></h5>
                <h5>Humidity: <span>${forecast.main.humidity}%</span></h5>
            </div>
        `;

        forecastContainer.appendChild(forecastDiv);
    });
}

function updateSearchHistory(city) {
    searchHistory.push(city);
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory)); 
    displaySearchHistory(); 
}

function displaySearchHistory() {
    const historyUl = document.querySelector("#cache");
    historyUl.innerHTML = ''; 
    searchHistory.forEach(city => {
        const cityLi = document.createElement("li");
        cityLi.textContent = city;
        cityLi.classList.add("history");
        cityLi.addEventListener("click", () => fetchWeather(city)); 
        historyUl.appendChild(cityLi); 
    });
}

let searchHistory = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
displaySearchHistory(); 
