// Variable Declaration area*********
var flightNumberSearchEl = document.getElementById('flight-search-input')
var departureCitySearchEl = document.getElementById('departure-search-input')
var arrivalCitySearchEl = document.getElementById('arrival-search-input')
var flightNumberPrintEl = document.getElementById('flight-number-print')
var departureCityPrintEl =document.getElementById('departure-city-print')
var arrivalCityPrintEl = document.getElementById('arrival-city-print')
var currentFlightStatusPrintEl = document.getElementById('Current-flight-status')
var departureCityWeatherHeaderEl = document.getElementById('departure-weather-header')
var departWeatherDay1el = document.getElementById('departure-day-1')
var departWeatherDay2el = document.getElementById('departure-day-2')
var departWeatherDay3el = document.getElementById('departure-day-3')
var departWeatherDay4el = document.getElementById('departure-day-4')
var departWeatherDay5el = document.getElementById('departure-day-5')
var arrivalCityWeatherHeaderEl = document.getElementById('arrival-weather-header')
var arrivalWeatherDay1el = document.getElementById('arrival-day-1')
var arrivalWeatherDay2el = document.getElementById('arrival-day-2')
var arrivalWeatherDay3el = document.getElementById('arrival-day-3')
var arrivalWeatherDay4el = document.getElementById('arrival-day-4')
var arrivalWeatherDay5el = document.getElementById('arrival-day-5')
var searchTableBodyEl = document.getElementById('table-body')
var clearSearchHistoryBtnEl = document.getElementById('clear-search-history')
var cancelModalBtnEl = document.getElementById('modal-cancel')
var modalSearchBtnEl = document.getElementById('modal-searchTableBodyEl')






// api's to be used
//  https://openskynetwork.github.io/opensky-api/rest.html 
//  https://open-meteo.com/




// Flight API Section********

const departures = 'https://opensky-network.org/api/flights/departure?airport=EDDF&begin=1517227200&end=1517230800'

//pulls data on 50 EST departures based on airport and displays it to the console.
function showDepartures() {
    fetch(departures)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched Data:', data);
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}
showDepartures()


// Weather API Section **************

