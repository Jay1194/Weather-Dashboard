//Create a Variable to Store the API Key
var APIKey = "030315a07ff75a445c30f1d122ec064c";

//Variables for the API Call (user input for the city)
var city;


// refernce to input element
var cityInputEl = document.querySelector("#city");

// reference to form element
var cityFormEl = document.querySelector("#city-form");


//current city apended
var currentCityEl = document.querySelector("#curCity");

//current date appended
var currentDateEl = document.querySelector("#curDate")

// current temperature appended
var currentTempEl = document.querySelector("curTemp")

//current wind speed appended
var currentWindEl = document.querySelector("#curWind")

// current humidity appended
var currentHumEl = document.querySelector("#curHum")


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
            displayCurrentWeather(city);
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
var displayCurrentWeather = function(curCity) {

    // clear old content before displaying new content
    currentCityEl.textContent = "";
    currentCityEl.textContent = curCity.toUpperCase();

    //format city name
    var cityName = curCity.name;

    // create a span element 
    var titleEl = document.createElement("span");
    titleEl.textContent = cityName;

    // append container (current city name)
    currentCityEl.appendChild(titleEl);
   
}



   

