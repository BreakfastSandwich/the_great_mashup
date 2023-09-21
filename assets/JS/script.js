// api's to be used
//  https://openskynetwork.github.io/opensky-api/rest.html 
//  https://open-meteo.com/


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

