//Create a Variable to Store the API Key
var APIKey = "030315a07ff75a445c30f1d122ec064c";
//Variables for the API Call (user input for the city)
var city;

// refernce to input element
var cityInputEl = document.querySelector("#city");
// reference to form element
var cityFormEl = document.querySelector("#city-form");

// Todays Date
var currentDateEl = document.querySelector("#curDate");
// Icon
var currentIconEl = document.querySelector("#icon")

//current city apended
var currentCityEl = document.querySelector("#curCity");
// current box container
var currentBoxEl = document.querySelector("#currentBox")
// current icon
var currentIconEl = document.querySelector("#icon")
// current temperature appended
var currentTempEl = document.querySelector("#curTemp");
//current wind speed appended
var currentWindEl = document.querySelector("#curWind");
// current humidity appended
var currentHumEl = document.querySelector("#curHum");


//Make the API Call Using Fetch to get current weather
var getCurrentWeather = function(city) {
    // store the OpenWeather Current Weather Data URL and the necessary variables
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    // make a request to the url
    fetch(queryURL)
    .then(function(response) {
//the response data is converted to JSON,
        if (response.ok) {
        response.json().then(function(data) {
            displayCurrentWeather(city, data, data, data, data);
    })
// custom alert message to let the user know that their search was unsuccessful
  } else {
    alert("Error: City not found");
  }
})
//Catch Network Errors (notify user to ensure they don't this the app is broken)
.catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to server");
});
};


// executed upon a form submission browser event
var formSubmitHandler = function(event) {
    event.preventDefault();
   
    // get value from input element
    var citys = cityInputEl.value.trim();

    // send value over to getCurrentWeather()
    if (citys) {
        getCurrentWeather(citys); 
        // clears form out
        cityInputEl.value = "";

        // No HTTP request without a city, if we accidentally left the <input> field blank!
    } else {
        alert("Please enter a city name!");
    }
};
// submit event listener
cityFormEl.addEventListener("submit", formSubmitHandler);


// Dynamically present data for current weather box
var displayCurrentWeather = function(citys, temper, windS, humid, icons) {

    //current city
    currentCityEl.textContent = "";
    currentCityEl.textContent = citys.toUpperCase();

    //format current box
    var cityName = citys.name
    var curTemper = (temper.main.temp / 4.19); 
    var curWind = windS.wind.speed;
    var curHumid = humid.main.humidity;
    //var curIcon = icons.weather.icon;
    //console.log(curIcon)

    // format the date
    currentDateEl.textContent = "";
    var date = new Date();
    currentDateEl.textContent = date.getFullYear() + "/"+ date.getMonth() + "/"+ date.getDate();

    //icon displayed
    //currentIconEl.textContent = "";
    //var iconSearch = document.createElement("i");
    //iconSearch.innerHTML = curIcon;
    //currentIconEl.appendChild(iconSearch);
   
    // create span elements 
    var citySearch = document.createElement("span");
    citySearch.textContent = cityName;

    // append container (current city name)
    currentCityEl.appendChild(citySearch);

    // current temperature
    currentTempEl.textContent = "";
    var tempSearch = document.createElement("span");
    tempSearch.textContent = "Temperature: " + Math.round(curTemper) +"°F";
    currentTempEl.appendChild(tempSearch);

    //current wind speed
    currentWindEl.textContent = "";
    var windSearch = document.createElement("span");
    windSearch.textContent = "Wind: " + Math.round(curWind) +" mph";
    currentWindEl.appendChild(windSearch);

    // current humidity
    currentHumEl.textContent = "";
    var humiditySearch = document.createElement("span");
    humiditySearch.textContent = "Humidity: " + curHumid +"%";
    currentHumEl.appendChild(humiditySearch);
};


// 5 day forcast 

   

