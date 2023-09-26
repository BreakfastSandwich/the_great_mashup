
//-------------------------------------------------------------------------------------------
// Variable Declaration area*********

//global var for input values
var flightInputVal = document.querySelector("#flight-search-input").value;

// these Var's are connected to the user input form on the search modal
var flightNumberSearchEl = document.querySelector("#flight-search-input");
var departureCitySearchEl = document.querySelector("#departure-search-input");
var arrivalCitySearchEl = document.querySelector("#arrival-search-input");

// previous searches table found in search modal
var flightFormEl = document.getElementById("flight-form");
var previousSearchTableEl = document.getElementById('previous_searches')
var searchTableBodyEl = document.getElementById("table-body");
var clearSearchHistoryBtnEl = document.getElementById("clear-search-history");
var cancelModalBtnEl = document.getElementById("modal-cancel");
var modalSearchBtnEl = document.querySelector("#modal-search");
var modalStartBtnEl = document.getElementById("Modal-Start");


// these Var's are the display below the header and above weather
var flightNumberPrintEl = document.getElementById("flight-number-print");
var departureCityPrintEl = document.getElementById("departure-city-print");
var arrivalCityPrintEl = document.getElementById("arrival-city-print");
var currentFlightStatusPrintEl = document.getElementById("Current-flight-status");
var departureIATAEl = document.getElementById("departure-IATA");
var arrivalIATAEl = document.getElementById("arrival-IATA");
var departureGatePrintEl = document.getElementById("departure-gate")
var arrivalGatePrintEl = document.getElementById("arrival-gate")


// departure city weather area
var departureCityWeatherHeaderEl = document.getElementById(
    "departure-weather-header"
);
var departureCityWeatherNameEl = document.getElementById(
    "Departure-City-Name-Print"
);
var departCityNamePrintEl = document.getElementById('Departure-City-Print')


var departWeatherDay1Highel = document.getElementById("departure-day-1-weather-high");
var departWeatherDay1Lowel = document.getElementById("departure-day-1-weather-low");
var departWeatherDay1UVel = document.getElementById("departure-day-1-weather-uv");
var departWeatherDay1Percipel = document.getElementById("departure-day-1-weather-rain")

var departWeatherDay2Highel = document.getElementById("departure-day-2-weather-high");
var departWeatherDay2Lowel = document.getElementById("departure-day-2-weather-low");
var departWeatherDay2UVel = document.getElementById("departure-day-2-weather-uv");
var departWeatherDay2Percipel = document.getElementById("departure-day-2-weather-rain")

var departWeatherDay3Highel = document.getElementById("departure-day-3-weather-high");
var departWeatherDay3Lowel = document.getElementById("departure-day-3-weather-low");
var departWeatherDay3UVel = document.getElementById("departure-day-3-weather-uv");
var departWeatherDay3Percipel = document.getElementById("departure-day-3-weather-rain")

var departWeatherDay4Highel = document.getElementById("departure-day-4-weather-high");
var departWeatherDay4Lowel = document.getElementById("departure-day-4-weather-low");
var departWeatherDay4UVel = document.getElementById("departure-day-4-weather-uv");
var departWeatherDay4Percipel = document.getElementById("departure-day-4-weather-rain")

var departWeatherDay5Highel = document.getElementById("departure-day-5-weather-high");
var departWeatherDay5Lowel = document.getElementById("departure-day-5-weather-low");
var departWeatherDay5UVel = document.getElementById("departure-day-5-weather-uv");
var departWeatherDay5Percipel = document.getElementById("departure-day-5-weather-rain")

// arrival city weather area
var arrivalCityWeatherHeaderEl = document.getElementById(
    "arrival-weather-header"
);
var arrivalCityNamePrintEl = document.getElementById("arrival-city-print")
var arrivalCityWeatherNameEl = document.getElementById(
    "Arrival-City-Name-Print"
);

var arrivalWeatherDay1el = document.getElementById("arrival-day-1-weather");
var arrivalWeatherDay1Highel = document.getElementById("arrival-day-1-weather-high");
var arrivalWeatherDay1Lowel = document.getElementById("arrival-day-1-weather-low");
var arrivalWeatherDay1UVel = document.getElementById("arrival-day-1-weather-uv");
var arrivalWeatherDay1Percipel = document.getElementById("arrival-day-1-weather-rain")

var arrivalWeatherDay2Highel = document.getElementById("arrival-day-2-weather-high");
var arrivalWeatherDay2Lowel = document.getElementById("arrival-day-2-weather-low");
var arrivalWeatherDay2UVel = document.getElementById("arrival-day-2-weather-uv");
var arrivalWeatherDay2Percipel = document.getElementById("arrival-day-2-weather-rain")

var arrivalWeatherDay3Highel = document.getElementById("arrival-day-3-weather-high");
var arrivalWeatherDay3Lowel = document.getElementById("arrival-day-3-weather-low");
var arrivalWeatherDay3UVel = document.getElementById("arrival-day-3-weather-uv");
var arrivalWeatherDay3Percipel = document.getElementById("arrival-day-3-weather-rain")

var arrivalWeatherDay4Highel = document.getElementById("arrival-day-4-weather-high");
var arrivalWeatherDay4Lowel = document.getElementById("arrival-day-4-weather-low");
var arrivalWeatherDay4UVel = document.getElementById("arrival-day-4-weather-uv");
var arrivalWeatherDay4Percipel = document.getElementById("arrival-day-4-weather-rain")

var arrivalWeatherDay5Highel = document.getElementById("arrival-day-5-weather-high");
var arrivalWeatherDay5Lowel = document.getElementById("arrival-day-5-weather-low");
var arrivalWeatherDay5UVel = document.getElementById("arrival-day-5-weather-uv");
var arrivalWeatherDay5Percipel = document.getElementById("arrival-day-5-weather-rain")


// departure city weather area




// Declaring the "search object" so it can be prepared for later use in the API's
//and for storage/ recall of previous searches

var previousFlightInputs = [];

function searchFormSubmit(event) {
    event.preventDefault()
    var flightInputVal = document.querySelector("#flight-search-input").value;


    // Add the flight input value to the beginning of the previousFlightInputs array
    previousFlightInputs.unshift(flightInputVal);

    // Limit the previousFlightInputs array to store only the last three flight input values
    if (previousFlightInputs.length > 3) {
        previousFlightInputs.pop();
    }

    // Store the updated previousFlightInputs array in local storage
    localStorage.setItem("previousFlightInputs", JSON.stringify(previousFlightInputs));

    // Call the function to display previous flight inputs
    displayPreviousFlightInputs();

    console.log("tacos");
    console.log(flightInputVal);

    flightFetch()

    console.log(flightFetch)
}

//displays the last 3 search inputs

function displayPreviousFlightInputs() {
    var previousInputs = JSON.parse(localStorage.getItem("previousFlightInputs"));

    // Clear the previous flight input list
    previousSearchTableEl.innerHTML = "";

    if (previousInputs && previousInputs.length > 0) {
        // Loop through the previous flight inputs and create list items
        for (var i = 0; i < previousInputs.length; i++) {
            var input = previousInputs[i];
            var listItem = document.createElement("li");
            listItem.textContent = input;
            previousSearchTableEl.appendChild(listItem);
        }
    } else {
        // If there are no previous flight inputs, hide the list
        previousSearchTableEl.style.display = "none";
    }
}

// Call the function to display previous flight inputs when the page loads
displayPreviousFlightInputs();


modalSearchBtnEl.addEventListener("click", searchFormSubmit);


function flightFetch() {

    var flightInputVal = document.querySelector("#flight-search-input").value;
    var flightRequest = `https://airlabs.co/api/v9/flight?flight_iata=${flightInputVal}&api_key=035b966b-2063-4785-bf81-c2d76bf2f0f0`

    fetch(flightRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            var departureIATA = data.response.dep_iata
            departureIATAEl.textContent = departureIATA
            var departureGate = data.response.dep_gate
            var departureTime = data.response.dep_time
            var departureCity = data.response.dep_city
            departureCityWeatherNameEl.textContent = departureCity
            var flightIATA = data.response.flight_iata
            flightNumberPrintEl.textContent = flightIATA
            var flightstatus = data.response.status
            currentFlightStatusPrintEl.textContent = flightstatus
            departureCityPrintEl.textContent = departureCity;
            departureGatePrintEl.textContent = departureGate


            var arrivalIATA = data.response.arr_iata
            arrivalIATAEl.textContent = arrivalIATA
            var arrivalGate = data.response.arr_gate
            var arrivalTime = data.response.arr_time
            var arrivalCity = data.response.arr_city
            arrivalCityNamePrintEl.textContent = arrivalCity
            arrivalGatePrintEl.textContent = arrivalGate
            arrivalCityWeatherNameEl.textContent = arrivalCity



            departureLocation(departureIATA)
            arrivalLocation(arrivalIATA)

        });
}


function departureLocation(departureIATA) {
    var departureRequest = `https://airlabs.co/api/v9/cities?city_code=${departureIATA}&api_key=035b966b-2063-4785-bf81-c2d76bf2f0f0`
    console.log(departureRequest)

    fetch(departureRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var departureLat = data.response[0].lat
            var departureLng = data.response[0].lng
            console.log(departureLat)
            console.log(departureLng)


            departureWeather(departureLat, departureLng)
            return
        })
}




function departureWeather(departureLat, departureLng) {
    var requestUrl2 = `https://api.open-meteo.com/v1/forecast?latitude=${departureLat}&longitude=${departureLng}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York`;

    fetch(requestUrl2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var departuretempHigh = data.daily.temperature_2m_max
            var departuretempLow = data.daily.temperature_2m_min
            var departureUVIndex = data.daily.uv_index_max
            var departurePercip = data.daily.precipitation_probability_max


            departWeatherDay1Highel.textContent = "High: " + departuretempHigh[0] + "°F\n"
            departWeatherDay1Lowel.textContent = "Low: " + departuretempLow[0] + "°F\n"
            departWeatherDay1UVel.textContent = "UV Index: " + departureUVIndex[0]
            departWeatherDay1Percipel.textContent = "Rain Chance: " + departurePercip[0] + "%"


            departWeatherDay2Highel.textContent = "High: " + departuretempHigh[1] + "°F\n"
            departWeatherDay2Lowel.textContent = "Low: " + departuretempLow[1] + "°F\n"
            departWeatherDay2UVel.textContent = "UV Index: " + departureUVIndex[1]
            departWeatherDay2Percipel.textContent = "Rain Chance: " + departurePercip[1] + "%"


            departWeatherDay3Highel.textContent = "High: " + departuretempHigh[2] + "°F\n"
            departWeatherDay3Lowel.textContent = "Low: " + departuretempLow[2] + "°F\n"
            departWeatherDay3UVel.textContent = "UV Index: " + departureUVIndex[2]
            departWeatherDay3Percipel.textContent = "Rain Chance: " + departurePercip[2] + "%"



            departWeatherDay4Highel.textContent = "High: " + departuretempHigh[3] + "°F\n"
            departWeatherDay4Lowel.textContent = "Low: " + departuretempLow[3] + "°F\n"
            departWeatherDay4UVel.textContent = "UV Index: " + departureUVIndex[3]
            departWeatherDay4Percipel.textContent = "Rain Chance: " + departurePercip[3] + "%"


            departWeatherDay5Highel.textContent = "High: " + departuretempHigh[4] + "°F\n"
            departWeatherDay5Lowel.textContent = "Low: " + departuretempLow[4] + "°F\n"
            departWeatherDay5UVel.textContent = "UV Index: " + departureUVIndex[4]
            departWeatherDay5Percipel.textContent = "Rain Chance: " + departurePercip[4] + "%"




        });
}


function arrivalLocation(arrivalIATA) {
    var arrivalRequest = `https://airlabs.co/api/v9/cities?city_code=${arrivalIATA}&api_key=035b966b-2063-4785-bf81-c2d76bf2f0f0`

    console.log(arrivalIATA)
    console.log(arrivalRequest)

    fetch(arrivalRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            var arrivalLat = data.response[0].lat
            var arrivalLng = data.response[0].lng
            console.log(arrivalLat)
            console.log(arrivalLng)

            arrivalWeather(arrivalLat, arrivalLng)


            return
        })
}



function arrivalWeather(arrivalLat, arrivalLng) {


    var requestUrl2 = `https://api.open-meteo.com/v1/forecast?latitude=${arrivalLat}&longitude=${arrivalLng}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York`;

    fetch(requestUrl2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var arrivaltempHigh = data.daily.temperature_2m_max
            var arrivaltempLow = data.daily.temperature_2m_min
            var arrivalUVIndex = data.daily.uv_index_max
            var arrivalPercip = data.daily.precipitation_probability_max



            arrivalWeatherDay1Highel.textContent = "High: " + arrivaltempHigh[0] + "°F\n"
            arrivalWeatherDay1Lowel.textContent = "Low: " + arrivaltempLow[0] + "°F\n"
            arrivalWeatherDay1UVel.textContent = "UV Index: " + arrivalUVIndex[0]
            arrivalWeatherDay1Percipel.textContent = "Rain Chance: " + arrivalPercip[0] + "%"


            arrivalWeatherDay2Highel.textContent = "High: " + arrivaltempHigh[1] + "°F\n"
            arrivalWeatherDay2Lowel.textContent = "Low: " + arrivaltempLow[1] + "°F\n"
            arrivalWeatherDay2UVel.textContent = "UV Index: " + arrivalUVIndex[1]
            arrivalWeatherDay2Percipel.textContent = "Rain Chance: " + arrivalPercip[1] + "%"



            arrivalWeatherDay3Highel.textContent = "High: " + arrivaltempHigh[2] + "°F\n"
            arrivalWeatherDay3Lowel.textContent = "Low: " + arrivaltempLow[2] + "°F\n"
            arrivalWeatherDay3UVel.textContent = "UV Index: " + arrivalUVIndex[2]
            arrivalWeatherDay3Percipel.textContent = "Rain Chance: " + arrivalPercip[2] + "%"


            arrivalWeatherDay4Highel.textContent = "High: " + arrivaltempHigh[3] + "°F\n"
            arrivalWeatherDay4Lowel.textContent = "Low: " + arrivaltempLow[3] + "°F\n"
            arrivalWeatherDay4UVel.textContent = "UV Index: " + arrivalUVIndex[3]
            arrivalWeatherDay4Percipel.textContent = "Rain Chance: " + arrivalPercip[3] + "%"


            arrivalWeatherDay5Highel.textContent = "High: " + arrivaltempHigh[4] + "°F\n"
            arrivalWeatherDay5Lowel.textContent = "Low: " + arrivaltempLow[4] + "°F\n"
            arrivalWeatherDay5UVel.textContent = "UV Index: " + arrivalUVIndex[4]
            arrivalWeatherDay5Percipel.textContent = "Rain Chance: " + arrivalPercip[4] + "%"




        });

}