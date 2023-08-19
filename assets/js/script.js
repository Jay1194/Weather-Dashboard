//Create a Variable to Store the API Key
var APIKey = "030315a07ff75a445c30f1d122ec064c";

//Variables for the API Call (user input for the city)
var city;

// refernce to input element
var cityInputEl = document.querySelector("#city");

// reference to form element
var cityFormEl = document.querySelector("#city-form");



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
        //info sent to function
        console.log(data, city)
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
getCurrentWeather("las vegas");








   

