// api's to be used
//  https://openskynetwork.github.io/opensky-api/rest.html 
//  https://open-meteo.com/

//-------------------------------------------------------------------------------------------

// Variable Declaration area*********


// previous searches table found in search modal 
var flightFormEl = document.getElementById('flight-form')
var searchTableBodyEl = document.getElementById('table-body')
var clearSearchHistoryBtnEl = document.getElementById('clear-search-history')
var cancelModalBtnEl = document.getElementById('modal-cancel')
var modalSearchBtnEl = document.querySelector('#modal-search')
var previousSearchNumber = document.getElementById('')
var previousDepartureCity = document.getElementById('')
var previousArrivalCity = document.getElementById('')


// these Var's are the display below the header and above weather 
var flightNumberPrintEl = document.getElementById('flight-number-print')
var departureCityPrintEl = document.getElementById('departure-city-print')
var arrivalCityPrintEl = document.getElementById('arrival-city-print')
var currentFlightStatusPrintEl = document.getElementById('Current-flight-status')

// departure city weather area
var departureCityWeatherHeaderEl = document.getElementById('departure-weather-header')
var departWeatherDay1el = document.getElementById('departure-day-1')
var departWeatherDay2el = document.getElementById('departure-day-2')
var departWeatherDay3el = document.getElementById('departure-day-3')
var departWeatherDay4el = document.getElementById('departure-day-4')
var departWeatherDay5el = document.getElementById('departure-day-5')

// arrival city weather area 
var arrivalCityWeatherHeaderEl = document.getElementById('arrival-weather-header')
var arrivalWeatherDay1el = document.getElementById('arrival-day-1')
var arrivalWeatherDay2el = document.getElementById('arrival-day-2')
var arrivalWeatherDay3el = document.getElementById('arrival-day-3')
var arrivalWeatherDay4el = document.getElementById('arrival-day-4')
var arrivalWeatherDay5el = document.getElementById('arrival-day-5')


// Declaring the "search object" so it can be prepared for later use in the API's
//and for storage/ recall of previous searches

var previousFlightsObj = []






function searchFormSubmit(event) {
    event.preventDefault()
    var flightInputVal = document.querySelector('#flight-search-input').value;
    departureCityVal = document.querySelector('#departure-search-input').value;
    arrivalCityVal = document.querySelector('#arrival-search-input').value;

    console.log("tacos")
    console.log(flightInputVal)
    console.log(departureCityVal)
    console.log(arrivalCityVal)

   

        previousFlightsObj = {
            number: flightInputVal,
            departure: departureCityVal,
            arrival : arrivalCityVal,
        }
    
    localStorage.setItem("previousFlightsObj", JSON.stringify(previousFlightsObj));
    
    fetchDepartures()
    fetchArrivals()
}

flightFormEl.addEventListener('submit', searchFormSubmit);


function storeSearch () {

    previousFlightsObj = {
        number: flightInputVal,
        departure: departureCityVal,
        arrival : arrivalCityVal,
    }

localStorage.setItem("previousFlightsObj", JSON.stringify(previousFlightsObj));

}

//-------------------------------------------------------------------------------------------

// // Flight API Section********

//Departures

function calculateTimeWindowD() {
    const now = new Date()
    const beginTime = Math.floor((now.getTime() / 1000) - 3600) // One-hour window
    const endTime = Math.floor(now.getTime() / 1000)

    return { beginTime, endTime }
}

function calculateTimeWindowA() {
    const now = new Date();
    const beginTime = Math.floor((now.getTime() / 1000) + 1800); // 2-hour window in the future
    const endTime = beginTime + 900; // 2 hours after beginTime

    return { beginTime, endTime }
}

function fetchDepartures() {
    // console.log("airportCode in fetch method" + airportCode)
    const { beginTime, endTime } = calculateTimeWindowD()
    var airportCode = departureCityVal// Get the departure city input value
    const departures = `https://opensky-network.org/api/flights/departure?airport=${airportCode}&begin=${beginTime}&end=${endTime}`
    
    
    fetch(departures)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        // Display the Airport Code in departureCityPrintEl
        departureCityPrintEl.textContent = departureCityVal
    })
    .catch(error => {
        console.error('Fetch Error:', error)
    })

    console.log(departures)
}

//Arrivals

function fetchArrivals() {
    // console.log("airportCode in fetch method" + airportCode)
    const { beginTime, endTime } = calculateTimeWindowD()
    var airportCodeA = arrivalCityVal// Get the departure city input value
    const arrivals = `https://opensky-network.org/api/flights/arrival?airport=${airportCodeA}&begin=${beginTime}&end=${endTime}`
    
    
    fetch(arrivals)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        // Display the Airport Code in departureCityPrintEl
        arrivalCityPrintEl.textContent = arrivalCityVal
    })
    .catch(error => {
        console.error('Fetch Error:', error)
    })

    console.log(arrivals)
}




//-------------------------------------------------------------------------------------------

// // // Weather API Section **************


















































































var departureCity = departureCitySearchEl.textContent;
console.log("departureCity = ",departureCity);
departureCity = "Charlotte";

function geoFetch() {

    var georequest = `https://geocoding-api.open-meteo.com/v1/search?name=${departureCityVal}&count=10&language=en&format=json`;
    fetch(georequest)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);
    });             
    }
    
    // geoFetch();







var requestUrl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York";
function testFetch() {


fetch(requestUrl)
.then(function (response) {
return response.json();
})
.then(function (data) {
console.log(data);
});             
}

// testFetch();