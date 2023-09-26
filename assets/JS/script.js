// api's to be used
//  https://openskynetwork.github.io/opensky-api/rest.html 
//  https://open-meteo.com/

//-------------------------------------------------------------------------------------------
// Variable Declaration area*********

//global var for input values
var flightInputVal = document.querySelector("#flight-search-input").value;
var departureCityVal = document.querySelector("#departure-search-input").value;
var arrivalCityVal = document.querySelector("#arrival-search-input").value;

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
var departWeatherDay1el = document.getElementById("departure-day-1");
var departWeatherDay2el = document.getElementById("departure-day-2");
var departWeatherDay3el = document.getElementById("departure-day-3");
var departWeatherDay4el = document.getElementById("departure-day-4");
var departWeatherDay5el = document.getElementById("departure-day-5");

// arrival city weather area
var arrivalCityWeatherHeaderEl = document.getElementById(
    "arrival-weather-header"
);
var arrivalCityNamePrintEl = document.getElementById("arrival-city-print")
var arrivalWeatherDay1el = document.getElementById("arrival-day-1");
var arrivalWeatherDay2el = document.getElementById("arrival-day-2");
var arrivalWeatherDay3el = document.getElementById("arrival-day-3");
var arrivalWeatherDay4el = document.getElementById("arrival-day-4");
var arrivalWeatherDay5el = document.getElementById("arrival-day-5");


// departure city weather area
var departureCityWeatherNameEl = document.getElementById(
    "Departure-City-Name-Print"
);
var arrivalCityWeatherNameEl = document.getElementById(
    "Arrival-City-Name-Print"
);




// Declaring the "search object" so it can be prepared for later use in the API's
//and for storage/ recall of previous searches

var previousFlights = [''];

function searchFormSubmit(event) {
    event.preventDefault()
   var flightInputVal = document.querySelector("#flight-search-input").value;
   var departureCityVal = document.querySelector("#departure-search-input").value;
   var arrivalCityVal = document.querySelector("#arrival-search-input").value;

// flightNumberPrintEl.textContent = "Flight Number:\n" +  flightInputVal;
// departureCityPrintEl.textContent = "Departure City:\n" + departureCityVal;
// arrivalCityPrintEl.textContent = "Arrival City:\n" +  arrivalCityVal;
// departCityNamePrintEl.textContent = departureCityVal
// arrivalCityNamePrintEl.textContent =  arrivalCityVal


    console.log("tacos");
    console.log(flightInputVal);
    console.log(departureCityVal);
    console.log(arrivalCityVal);

    var previousFlightsObj = {
        number: flightInputVal,
        departure: departureCityVal,
        arrival: arrivalCityVal,
    };

    previousFlights.unshift(previousFlightsObj)

    localStorage.setItem("previousFlights", JSON.stringify(previousFlightsObj))
    console.log("tacos")
    console.log(previousFlightsObj)
    console.log(previousFlights)
    

    flightNumberSearchEl.textContent = ('')
    departureCitySearchEl.textContent = ('')
    arrivalCitySearchEl.textContent = ('')

    // fetchDepartures()
    // fetchArrivals()
    // geoFetch()
    // geoFetch2()
    flightFetch()
   
    console.log(flightFetch)
}

function retrieveSearch() {
    var previousSearch = JSON.parse(localStorage.getItem("previousFlights"));

    if (previousSearch === null) {
        previousSearchTableEl.setAttribute('style', "display:none;")
    }

    console.log(previousSearch);
}

function displayPreviousSearch() {
    retrieveSearch();
    renderPreviousSearch();
    console.log("tacos")
}



function renderPreviousSearch() {
    // retrieve local storage
    // Clear todoList element and update todoCountSpan
    previousSearchTableEl.innerHTML = "";

    var previousFlightsObj = JSON.parse(localStorage.getItem("previousFlightsObj"))

    if (previousFlightsObj === null) {
        previousSearchTableEl.setAttribute('style', "display:none;")
    }

    console.log(previousFlightsObj);

    // Render a new li for each todo
    for (var i = 0; i < 3; i++) {
        console.log(previousFlightsObj)
        //   var previousFlightsObj = previousFlightsObj[i];

        // var rowEl = document.createElement('tr')
        // rowEl.textContent = i + 1;
        // var numberEl = document.createElement('td')
        // numberEl.textContent = previousFlightsObj.number;
        // console.log(numberEl)
        // var departureEl = document.createElement('td')
        // departureEl.textContent = previousFlightsObj.departure;
        // console.log(departureEl)
        // var arrivalEl = document.createElement('td')
        // arrivalEl.textContent = previousFlightsObj.arrival;
        // console.log(arrivalEl)


        // rowEl.appendChild(numberEl, departureEl, arrivalEl);
        // previousSearchTableEl.appendChild(rowEl);




    }
}
displayPreviousSearch;

// modalStartBtnEl.addEventListener("click", displayPreviousSearch);
modalStartBtnEl.addEventListener("click", retrieveSearch);
modalStartBtnEl.addEventListener("click", displayPreviousSearch);
modalSearchBtnEl.addEventListener("click", searchFormSubmit);

// api's to be used
//  https://airlabs.co
//  https://open-meteo.com/

// // Flight API Section********




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
       departureCityWeatherNameEl
        var departureGate = data.response.dep_gate
        var departureTime = data.response.dep_time
        var departureCity = data.response.dep_city
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

            var departureDay2tempHigh = data.daily.temperature_2m_max[1]

            var departureDay3tempHigh = data.daily.temperature_2m_max[2]

            var departureDay4tempHigh = data.daily.temperature_2m_max[3]

            var departureDay5tempHigh = data.daily.temperature_2m_max[4]



            var departureDay1tempLow = data.daily.temperature_2m_min[0]

            var departureDay2tempLow = data.daily.temperature_2m_min[1]

            var departureDay3tempLow = data.daily.temperature_2m_min[2]

            var departureDay4tempLow = data.daily.temperature_2m_min[3]

            var departureDay5tempLow = data.daily.temperature_2m_min[4]







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


        // var arrivalLat = data.response[0].lat
        // var arrivalLng = data.response[0].lng
        // console.log(arrivalLat)
        // console.log(arrivalLng)
        return

})   

      
});
}
