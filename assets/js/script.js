var APIKey = "030315a07ff75a445c30f1d122ec064c";
var city ;
var cityInputEl = document.querySelector("#city");
var cityFormEl = document.querySelector("#city-form");
var currentDateEl = document.querySelector("#curDate");
var currentCityEl = document.querySelector("#curCity");
var currentBoxEl = document.querySelector("#currentBox")
var currentTempEl = document.querySelector("#curTemp");
var currentWindEl = document.querySelector("#curWind");
var currentHumEl = document.querySelector("#curHum");

var getCurrentWeather = function(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayCurrentWeather(city, data, data, data, data)
            });
        } else {
            alert("Error: City not found")
        }
    })
    .catch(function(error) {
        alert("Unable to connect to server")
    })
};

var historyEl = document.querySelector("#cache");
var searchHistory = [];

var displaySearchHistory = function(city) {
    var cityNameListItem = document.createElement("li");
    var cityName = document.createElement("a");

    cityName.textContent = city.toUpperCase();
    
    cityNameListItem.className = "history"
    cityNameListItem.appendChild(cityName);
    historyEl.appendChild(cityNameListItem);
    
    cityNameListItem.addEventListener("click", function() {
        getCurrentWeather(city);
        get5DayForcast(city);
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var citys = cityInputEl.value.trim();
    
    if (citys) {
        getCurrentWeather(citys);
        get5DayForcast(citys);
        displaySearchHistory(citys);
        cityInputEl.value = "";

    } else {
        alert("Please enter a city name!");
    }
};

cityFormEl.addEventListener("submit", formSubmitHandler);

var displayCurrentWeather = function(citys, temper, windS, humid) {
    
    currentCityEl.textContent = "";
    currentCityEl.textContent = citys.toUpperCase();

    var cityName = citys.name
    var curTemper = (temper.main.temp / 4.19); 
    var curWind = windS.wind.speed;
    var curHumid = humid.main.humidity;
    
    currentDateEl.textContent = "";
    var date = new Date();
    currentDateEl.textContent = date.getFullYear() + "/"+ date.getMonth() + "/"+ date.getDate();

    var citySearch = document.createElement("span");
    citySearch.textContent = cityName;

    currentCityEl.appendChild(citySearch);

    currentTempEl.textContent = "";
    var tempSearch = document.createElement("span");
    tempSearch.textContent = "Temperature: " + Math.round(curTemper) +"°F";
    currentTempEl.appendChild(tempSearch);

    currentWindEl.textContent = "";
    var windSearch = document.createElement("span");
    windSearch.textContent = "Wind: " + Math.round(curWind) +" mph";
    currentWindEl.appendChild(windSearch);

    currentHumEl.textContent = "";
    var humiditySearch = document.createElement("span");
    humiditySearch.textContent = "Humidity: " + curHumid +"%";
    currentHumEl.appendChild(humiditySearch);
};

var get5DayForcast = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var temperature =(data.list[0].main.temp / 4.19);
                var windSpeed = data.list[0].wind.speed;
                var humidity = data.list[0].main.humidity;
                display5DayForcast(temperature, windSpeed, humidity)
            })
        }
    })
};

var display5DayForcast = function (temperature, windSpeed, humidity) {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60);
    var day = currentDate.getDate() 
    var month = currentDate.getMonth() +1
    var year = currentDate.getFullYear()
    
    var dates = document.querySelectorAll('#date');
    var temps = document.querySelectorAll('#temp');
    var winds = document.querySelectorAll('#wind');
    var hums = document.querySelectorAll('#humid');
    
    for (var i = 0; i < dates.length; i++) {
        var tomorrowDate = new Date(year, month -1, day + i + 1);
        var dayNumber = i + i;
        var dayString = "day" + dayNumber;

        dates[i].textContent="";
        dates[i].textContent = tomorrowDate.toLocaleDateString(); 
        dates[i].dataset.data = dayString;
        
        var nextTemp = "Temperature: " + Math.round(temperature + i) + "°F";
        var tempNum = i + i;
        var tempString = "temp" + tempNum;
        
        temps[i].textContent = "";
        temps[i].textContent = nextTemp;
        temps[i].dataset.data = tempString;

        var nextWind = "Wind: " + Math.round(windSpeed + i) +" mph";
        var windNum = i + i;
        var windString = "wind" + windNum;

        winds[i].textContent= '';
        winds[i].textContent = nextWind;
        winds[i].dataset.data = windString;
        
        var nextHumid = "Humidity: " + (humidity + i) +"%";
        var humidNum = i + i;
        var humidString = "humid" + humidNum;

        hums[i].textContent = "";
        hums[i].textContent = nextHumid;
        hums[i].dataset.data = humidString;
    };
};























   

