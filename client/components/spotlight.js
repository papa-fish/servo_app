
import { fetchRandomStation } from "../servos_api.js";

const spotlightSection = document.querySelector('.spotlight')

getSpotLightInfo()

function getSpotLightInfo() {
    fetchRandomStation()
    .then(station => { 
        renderSpotlightInfo(station)
    })
    .then (() => {
        const refreshLink = document.querySelector('.refresh-link')
        refreshLink.addEventListener('click', handleRefreshClick)
    })
    
}


function renderSpotlightInfo(station) {
    const spotlightInfoSection = document.createElement('section')
    spotlightInfoSection.classList.add('spotlight-info')
    const template = `
    <header class="spotlight-header">
    <div>spotlight</div>
    </header>
    <div class="spotlight-refresh"><a class="refresh-link" href="">refresh</a></div>
    <div class="spotlight-logo"><img src= '../${station.logo_url}'></div>
    <div class="spotlight-nameAddress">
    <div class="spotlight-name">${station.name}</div>
    <div class="spotlight-address">${station.address}</div>
    </div>
    `
    spotlightInfoSection.innerHTML = template
    spotlightSection.appendChild(spotlightInfoSection)
}

function handleRefreshClick(event) {
    event.preventDefault();
    fetchRandomStation()
    .then(station => { 
        const stationName = spotlightSection.querySelector('.spotlight-name')
        const stationAddress = spotlightSection.querySelector('.spotlight-address')
        const stationLogo = spotlightSection.querySelector('.spotlight-logo')
        stationName.textContent = station.name;
        stationAddress.textContent = station.address;
        stationLogo.firstChild.src = station.logo_url;
    })
 
}



