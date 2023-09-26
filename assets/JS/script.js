
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
var departCityNamePrintEl = document.getElementById('Departure-City-Print')
var departWeatherDay1Highel = document.getElementById("departure-day-1-weather-high");
var departWeatherDay1Lowel = document.getElementById("departure-day-1-weather-low");
var departWeatherDay1UVel = document.getElementById("departure-day-1-weather-uv");
var departWeatherDay2Highel = document.getElementById("departure-day-2-weather-high");
var departWeatherDay2Lowel = document.getElementById("departure-day-2-weather-low");
var departWeatherDay2UVel = document.getElementById("departure-day-2-weather-uv");
var departWeatherDay3Highel = document.getElementById("departure-day-3-weather-high");
var departWeatherDay3Lowel = document.getElementById("departure-day-3-weather-low");
var departWeatherDay3UVel = document.getElementById("departure-day-3-weather-uv");
var departWeatherDay4Highel = document.getElementById("departure-day-4-weather-high");
var departWeatherDay4Lowel = document.getElementById("departure-day-4-weather-low");
var departWeatherDay4UVel = document.getElementById("departure-day-4-weather-uv");
var departWeatherDay5Highel = document.getElementById("departure-day-5-weather-high");
var departWeatherDay5Lowel = document.getElementById("departure-day-5-weather-low");
var departWeatherDay5UVel = document.getElementById("departure-day-5-weather-uv");

// arrival city weather area
var arrivalCityWeatherHeaderEl = document.getElementById(
    "arrival-weather-header"
);
var arrivalCityNamePrintEl = document.getElementById("arrival-city-print")
var arrivalWeatherDay1el = document.getElementById("arrival-day-1-weather");
var arrivalWeatherDay1Highel = document.getElementById("arrival-day-1-weather-high");
var arrivalWeatherDay1Lowel = document.getElementById("arrival-day-1-weather-low");
var arrivalWeatherDay1UVel = document.getElementById("arrival-day-1-weather-uv");
var arrivalWeatherDay2Highel = document.getElementById("arrival-day-2-weather-high");
var arrivalWeatherDay2Lowel = document.getElementById("arrival-day-2-weather-low");
var arrivalWeatherDay2UVel = document.getElementById("arrival-day-2-weather-uv");
var arrivalWeatherDay3Highel = document.getElementById("arrival-day-3-weather-high");
var arrivalWeatherDay3Lowel = document.getElementById("arrival-day-3-weather-low");
var arrivalWeatherDay3UVel = document.getElementById("arrival-day-3-weather-uv");
var arrivalWeatherDay4Highel = document.getElementById("arrival-day-4-weather-high");
var arrivalWeatherDay4Lowel = document.getElementById("arrival-day-4-weather-low");
var arrivalWeatherDay4UVel = document.getElementById("arrival-day-4-weather-uv");
var arrivalWeatherDay5Highel = document.getElementById("arrival-day-5-weather-high");
var arrivalWeatherDay5Lowel = document.getElementById("arrival-day-5-weather-low");
var arrivalWeatherDay5UVel = document.getElementById("arrival-day-5-weather-uv");


// departure city weather area
var departureCityWeatherNameEl = document.getElementById(
    "Departure-City-Name-Print"
);
var arrivalCityWeatherNameEl = document.getElementById(
    "Arrival-City-Name-Print"
);


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

                    var requestUrl2 = `https://api.open-meteo.com/v1/forecast?latitude=${departureLat}&longitude=${departureLng}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York`;

                    fetch(requestUrl2)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            var departureDay1tempHigh = data.daily.temperature_2m_max[0]
                            var departureDay1tempLow = data.daily.temperature_2m_min[0]
                            var departureDay1UVIndex = data.daily.uv_index_max[0]
                            departWeatherDay1Highel.textContent = "High: " + departureDay1tempHigh + "°F\n"
                            departWeatherDay1Lowel.textContent = "Low: " + departureDay1tempLow + "°F\n"
                            departWeatherDay1UVel.textContent = "UV Index: " + departureDay1UVIndex

                            var departureDay2tempHigh = data.daily.temperature_2m_max[1]
                            var departureDay2tempLow = data.daily.temperature_2m_min[1]
                            var departureDay2UVIndex = data.daily.uv_index_max[1]
                            departWeatherDay2Highel.textContent = "High: " + departureDay2tempHigh + "°F\n"
                            departWeatherDay2Lowel.textContent = "Low: " + departureDay2tempLow + "°F\n"
                            departWeatherDay2UVel.textContent = "UV Index: " + departureDay2UVIndex


                            var departureDay3tempHigh = data.daily.temperature_2m_max[2]
                            var departureDay3tempLow = data.daily.temperature_2m_min[2]
                            var departureDay3UVIndex = data.daily.uv_index_max[2]
                            departWeatherDay3Highel.textContent = "High: " + departureDay3tempHigh + "°F\n"
                            departWeatherDay3Lowel.textContent = "Low: " + departureDay3tempLow + "°F\n"
                            departWeatherDay3UVel.textContent = "UV Index: " + departureDay3UVIndex


                            var departureDay4tempHigh = data.daily.temperature_2m_max[3]
                            var departureDay4tempLow = data.daily.temperature_2m_min[3]
                            var departureDay4UVIndex = data.daily.uv_index_max[3]
                            departWeatherDay4Highel.textContent = "High: " + departureDay4tempHigh + "°F\n"
                            departWeatherDay4Lowel.textContent = "Low: " + departureDay4tempLow + "°F\n"
                            departWeatherDay4UVel.textContent = "UV Index: " + departureDay4UVIndex

                            var departureDay5tempHigh = data.daily.temperature_2m_max[4]
                            var departureDay5tempHigh = data.daily.temperature_2m_max[4]
                            var departureDay5tempLow = data.daily.temperature_2m_min[4]
                            var departureDay5UVIndex = data.daily.uv_index_max[4]
                            departWeatherDay5Highel.textContent = "High: " + departureDay5tempHigh + "°F\n"
                            departWeatherDay5Lowel.textContent = "Low: " + departureDay5tempLow + "°F\n"
                            departWeatherDay5UVel.textContent = "UV Index: " + departureDay5UVIndex

                            console.log(departureDay1tempHigh)


                        });


                    return
                })


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

                    var requestUrl2 = `https://api.open-meteo.com/v1/forecast?latitude=${arrivalLat}&longitude=${arrivalLng}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York`;

                    fetch(requestUrl2)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            var arrivalDay1tempHigh = data.daily.temperature_2m_max[0]
                            var arrivalDay1tempLow = data.daily.temperature_2m_min[0]
                            var arrivalDay1UVIndex = data.daily.uv_index_max[0]
                            arrivalWeatherDay1Highel.textContent = "High: " + arrivalDay1tempHigh + "°F\n"
                            arrivalWeatherDay1Lowel.textContent = "Low: " + arrivalDay1tempLow + "°F\n"
                            arrivalWeatherDay1UVel.textContent = "UV Index: " + arrivalDay1UVIndex

                            var arrivalDay2tempHigh = data.daily.temperature_2m_max[1]
                            var arrivalDay2tempLow = data.daily.temperature_2m_min[1]
                            var arrivalDay2UVIndex = data.daily.uv_index_max[1]
                            arrivalWeatherDay2Highel.textContent = "High: " + arrivalDay2tempHigh + "°F\n"
                            arrivalWeatherDay2Lowel.textContent = "Low: " + arrivalDay2tempLow + "°F\n"
                            arrivalWeatherDay2UVel.textContent = "UV Index: " + arrivalDay2UVIndex


                            var arrivalDay3tempHigh = data.daily.temperature_2m_max[2]
                            var arrivalDay3tempLow = data.daily.temperature_2m_min[2]
                            var arrivalDay3UVIndex = data.daily.uv_index_max[2]
                            arrivalWeatherDay3Highel.textContent = "High: " + arrivalDay3tempHigh + "°F\n"
                            arrivalWeatherDay3Lowel.textContent = "Low: " + arrivalDay3tempLow + "°F\n"
                            arrivalWeatherDay3UVel.textContent = "UV Index: " + arrivalDay3UVIndex


                            var arrivalDay4tempHigh = data.daily.temperature_2m_max[3]
                            var arrivalDay4tempLow = data.daily.temperature_2m_min[3]
                            var arrivalDay4UVIndex = data.daily.uv_index_max[3]
                            arrivalWeatherDay4Highel.textContent = "High: " + arrivalDay4tempHigh + "°F\n"
                            arrivalWeatherDay4Lowel.textContent = "Low: " + arrivalDay4tempLow + "°F\n"
                            arrivalWeatherDay4UVel.textContent = "UV Index: " + arrivalDay4UVIndex

                            var arrivalDay5tempHigh = data.daily.temperature_2m_max[4]
                            var arrivalDay5tempHigh = data.daily.temperature_2m_max[4]
                            var arrivalDay5tempLow = data.daily.temperature_2m_min[4]
                            var arrivalDay5UVIndex = data.daily.uv_index_max[4]
                            arrivalWeatherDay5Highel.textContent = "High: " + arrivalDay5tempHigh + "°F\n"
                            arrivalWeatherDay5Lowel.textContent = "Low: " + arrivalDay5tempLow + "°F\n"
                            arrivalWeatherDay5UVel.textContent = "UV Index: " + arrivalDay5UVIndex

                            console.log(arrivalDay1tempHigh)


                        });


                    return
                })

        });
}