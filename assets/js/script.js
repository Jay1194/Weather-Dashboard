
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
        get5DayForcast(citys);
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

// fetch 5 day forcast 
var get5DayForcast = function (city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey

    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {
       //the response data is converted to JSON,
       if (response.ok) {
        response.json().then(function(data) {
            // next 5 days dates display
            get5DayStats(data.list, city);
            // show city and all data from api for 40 day forcast
            console.log(data.list, city);
    });
// custom alert message to let the user know that their search was unsuccessful
  } else {
    alert("Error: City not found");
  }
});
};


// 5 day dates
var get5DayStats = function (data) {

// control dates
var currentDate = new Date(new Date().getTime() + 24 * 60 * 60);
var day = currentDate.getDate() 
var month = currentDate.getMonth() +1
var year = currentDate.getFullYear()
//console.log( day + "/" + month + "/" + year )

// select all elements with data keys
var dates = document.querySelectorAll('#date');

// future dates
for (var i = 0; i < dates.length; i++) {
    var tomorrowDate = new Date(year, month -1, day + i + 1);
    var dayNumber = i + i;
    var dayString = "day" + dayNumber;

dates[i].textContent = tomorrowDate.toLocaleDateString(); // Update the displayed date
dates[i].dataset.data = dayString; // Set the dataset attribute
}
};

















// access to each card in an array
//var days = document.querySelectorAll('#day');
//console.log(days);

// acces to inside of every article
//days.forEach( d => {
   // console.log(d.dataset);
//})





   

