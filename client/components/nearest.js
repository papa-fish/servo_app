import { fetchStations } from "../servos_api.js";

const nearestSection = document.querySelector('.nearest-station')

fetchStations()
    .then(renderStations)

function renderStations(stations) {
    for (let i=0; i<10; i++) {
        const station = document.createElement('p')
        const stationAddress = document.createElement('p')
        station.innerHTML = stations[i].owner + ' ' + stations[i].name 
        stationAddress.innerText = stations[i].address
        nearestSection.appendChild(station)
        nearestSection.appendChild(stationAddress)
    }
}