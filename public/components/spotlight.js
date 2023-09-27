
import { fetchRandomStation } from "../servos_api.js";

const spotlightSection = document.querySelector('.spotlight')

let spotlightStation

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
    <div><h3>SPOTLIGHT<h3></div>
    </header>
    <div class="spotlight-refresh"><a class="refresh-link" href="">refresh</a></div>
    <div class="spotlight-logo"><img src= '../${station.logo_url}'></div>
    <div class="spotlight-nameAddress">
    <div><a href="" class="spotlight-name">${station.name}</a></div>
    <div class="spotlight-address">${station.address}</div>
    </div>
    `
    spotlightInfoSection.innerHTML = template
    spotlightSection.appendChild(spotlightInfoSection)
    spotlightStation = station
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
        spotlightStation = station
    })
 
}

export function spotlightClick(map) {
    spotlightSection.addEventListener('click', (event) => {
        event.preventDefault()
        if (!event.target.classList.contains('spotlight-name')) return

        map.setCenter({lat: spotlightStation.lat, lng: spotlightStation.long})

        const marker = new google.maps.Marker({
            position: {lat: spotlightStation.lat, lng: spotlightStation.long},
                map,
                icon: {
                    url: `${spotlightStation.logo_url}`,
                    scaledSize: new google.maps.Size(35, 35),
                }
        })
        
        const contentString =`<h4>${spotlightStation.name}</h4><p>${spotlightStation.address}</p>`;
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        })

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        })
        infowindow.open(map,marker)
    })
}