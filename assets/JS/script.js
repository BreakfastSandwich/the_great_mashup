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
var previousSearchNumber = document.getElementById("");
var previousDepartureCity = document.getElementById("");
var previousArrivalCity = document.getElementById("");

// these Var's are the display below the header and above weather
var flightNumberPrintEl = document.getElementById("flight-number-print");
var departureCityPrintEl = document.getElementById("departure-city-print");
var arrivalCityPrintEl = document.getElementById("arrival-city-print");
var currentFlightStatusPrintEl = document.getElementById("Current-flight-status");

// departure city weather area
var departureCityWeatherHeaderEl = document.getElementById(
    "departure-weather-header"
);
var departCityNamePrintEl = document.getElementById('Departure-City-Name-Print')
var departWeatherDay1el = document.getElementById("departure-day-1");
var departWeatherDay2el = document.getElementById("departure-day-2");
var departWeatherDay3el = document.getElementById("departure-day-3");
var departWeatherDay4el = document.getElementById("departure-day-4");
var departWeatherDay5el = document.getElementById("departure-day-5");

// arrival city weather area
var arrivalCityWeatherHeaderEl = document.getElementById(
    "arrival-weather-header"
);
var arrivalCityNamePrintEl = document.getElementById('Arrival-City-Name-Print')
var arrivalWeatherDay1el = document.getElementById("arrival-day-1");
var arrivalWeatherDay2el = document.getElementById("arrival-day-2");
var arrivalWeatherDay3el = document.getElementById("arrival-day-3");
var arrivalWeatherDay4el = document.getElementById("arrival-day-4");
var arrivalWeatherDay5el = document.getElementById("arrival-day-5");


// departure city weather area
var departureCityWeatherHeaderEl = document.getElementById(
    "departure-weather-header"
);




// Declaring the "search object" so it can be prepared for later use in the API's
//and for storage/ recall of previous searches

var previousFlights = [''];

function searchFormSubmit(event) {
    event.preventDefault()
   var flightInputVal = document.querySelector("#flight-search-input").value;
   var departureCityVal = document.querySelector("#departure-search-input").value;
   var arrivalCityVal = document.querySelector("#arrival-search-input").value;

flightNumberPrintEl.textContent = "Flight Number:\n" +  flightInputVal;
departureCityPrintEl.textContent = "Departure City:\n" + departureCityVal;
arrivalCityPrintEl.textContent = "Arrival City:\n" +  arrivalCityVal;
departCityNamePrintEl.textContent = departureCityVal
arrivalCityNamePrintEl.textContent =  arrivalCityVal


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
//  https://openskynetwork.github.io/opensky-api/rest.html
//  https://open-meteo.com/

// // Flight API Section********


//-------------------------------------------------------------------------------------------

// // Flight API Section********

// //Departures

// function calculateTimeWindowD() {
//     const now = new Date()
//     const beginTime = Math.floor((now.getTime() / 1000) - 3600) // One-hour window
//     const endTime = Math.floor(now.getTime() / 1000)

//     return { beginTime, endTime }
// }

// function calculateTimeWindowA() {
//     const now = new Date();
//     const beginTime = Math.floor((now.getTime() / 1000) + 1800); // 30 minute window in the future
//     const endTime = beginTime + 900; // 15 minutes after beginTime

//     return { beginTime, endTime }
// }

// function fetchDepartures() {
//     // console.log("airportCode in fetch method" + airportCode)
//     const { beginTime, endTime } = calculateTimeWindowD()
//     var airportCode = document.querySelector("#departure-search-input").value// Get the departure city input value
//     const departures = `https://opensky-network.org/api/flights/departure?airport=${airportCode}&begin=${beginTime}&end=${endTime}`


//     fetch(departures)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`)
//             }
//             return response.json()
//         })
//         .then(data => {
//             // Display the Airport Code in departureCityPrintEl
//             departureCityPrintEl.textContent = departureCityVal
//         })
//         .catch(error => {
//             console.error('Fetch Error:', error)
//         })

//     console.log(departures)
// }

// //Arrivals

// function fetchArrivals() {
//     // console.log("airportCodeA in fetch method" + airportCodeA)
//     const { beginTime, endTime } = calculateTimeWindowD()
//     var airportCodeA = document.querySelector("#arrival-search-input").value// Get the departure city input value
//     const arrivals = `https://opensky-network.org/api/flights/arrival?airport=${airportCodeA}&begin=${beginTime}&end=${endTime}`


//     fetch(arrivals)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`)
//             }
//             return response.json()
//         })
//         .then(data => {
//             // Display the Airport Code in departureCityPrintEl
//             arrivalCityPrintEl.textContent = arrivalCityVal
//         })
//         .catch(error => {
//             console.error('Fetch Error:', error)
//         })

//     console.log(arrivals)
// }




// //-------------------------------------------------------------------------------------------

// // // // Weather API Section **************



// var departureCity1 = "charlotte";
// console.log("departureCity = ", departureCity1);
// var departureCityVal = departureCity1


// // function geoFetch() {


//     var georequest = `https://geocoding-api.open-meteo.com/v1/search?name=${departureCityVal}&count=10&language=en&format=json`;
//     fetch(georequest)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         });

//         testFetch()

//     // }

// // // geoFetch();







// function testFetch() {
//     var requestUrl = "https://api.open-meteo.com/v1/forecast?latitude=35.22&longitude=-80.84&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York";


//     fetch(requestUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         });
// }

// // testFetch();

// var arrivalCity1 = "atlanta";
// console.log("arrivalCity = ", arrivalCity1);
// var arrivalCityVal = arrivalCity1

// function geoFetch2() {

//     var georequest = `https://geocoding-api.open-meteo.com/v1/search?name=${arrivalCityVal}&count=10&language=en&format=json`;
//     fetch(georequest)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         });

//         testFetch2()
// }

// // geoFetch();








// function testFetch2() {
//     var requestUrl2 = "https://api.open-meteo.com/v1/forecast?latitude=33.74&longitude=-84.38&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York";

//     fetch(requestUrl2)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         });
// }



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
        var departureGate = data.response.dep_gate
        var departureTime = data.response.dep_time
        var departureCity = data.response.dep_city

        var arrivalIATA = data.response.arr_iata
        var arrivalGate = data.response.arr_gate
        var arrivalTime = data.response.arr_time
        var arrivalCity = data.response.arr_city

        
        // console.log(dataResponse)
        var currentFlight = {
            flightDeparture: [
                {
                    departureIATACode: departureIATA ,
                    departureGateCode: departureGate ,
                    departureTimeCode: departureTime , 
                    departureCityCode: departureCity                   
                }
            ],
            flightArrival: [
                {
                    arrivalIATACode: arrivalIATA ,
                    arrivalGateCode: arrivalGate ,
                    arrivalTimeCode: arrivalTime ,
                    arrivalCityCode: arrivalCity 
                }
                
             ]}

             console.log(currentFlight)
             
             var currentFlightArray = JSON.stringify(currentFlight)
             localStorage.setItem("CurrentFlight", currentFlightArray)



  
    
    


        return 
});

        console.log(flightRequest)
      
// console.log(dataResponse)
        // testFetch2()
}





