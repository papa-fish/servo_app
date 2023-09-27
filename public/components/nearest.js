import { fetchStations, fetchNearestStationsByLatLong } from "../servos_api.js";

const nearestSection = document.querySelector('.nearest-station')

fetchStations()
    .then(renderStations)

function renderStations(stations) {
    for (let i=0; i<10; i++) {
        let html = `
            <img class="logo" src= '../${stations[i].logo_url}'>
            <div>
                <p class="station-details"><b>${stations[i].name} ${stations[i].distance != undefined ?  Math.trunc(stations[i].distance * 1000)+ 'm': ''}</b></p>
                <p class="station-details">${stations[i].address}</p>
            </div>
        `
        const station = document.createElement('div')
        station.classList.add("individual-station")
        station.innerHTML = html
        nearestSection.appendChild(station)
    }
}

export function fetchNearestStations(lat, long) {
    fetchNearestStationsByLatLong(lat, long)
    .then(res => {
        // console.log("Nearest stations list", res)

        // Remove the current list of stations
        var individualStations = nearestSection.getElementsByClassName('individual-station');

        while(individualStations[0]) {
            individualStations[0].parentNode.removeChild(individualStations[0]);
        }
        renderStations(res)
    })
}