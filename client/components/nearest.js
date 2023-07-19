import { fetchStations } from "../servos_api.js";

const nearestSection = document.querySelector('.nearest-station')

fetchStations()
    .then(renderStations)

function renderStations(stations) {
    for (let i=0; i<10; i++) {
        let html = `
            <img class="logo" src= '../${stations[i].logo_url}'>
            <div>
                <p class="station-details"><b>${stations[i].name}</b></p>
                <p class="station-details">${stations[i].address}</p>
            </div>
        `
        const station = document.createElement('div')
        station.classList.add("individual-station")
        station.innerHTML = html
        nearestSection.appendChild(station)
    }
}