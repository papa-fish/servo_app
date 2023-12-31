import { fetchNearestStations } from "./nearest.js";

const mapCenter = document.querySelector(".center-location");

export async function mapCentreLocation(position, map) {
  const { Geocoder } = await google.maps.importLibrary("geocoding"); 
  const geocoder = new Geocoder()

  geocoder
    .geocode({ location: {lat: position.lat, lng: position.lng}} )
    .then(response => {
      const address = response.results[0].formatted_address
    mapCenter.innerHTML =`
        <h3>MAP CENTRE LOCATION</h3>
        <p>Lat: ${position.lat} </p>
        <p>Long: ${position.lng} </p>
        <p><strong>${address} </strong></p>
    `
  })
    
  map.addListener("idle", () => {
    let centerLocation = map.getCenter();
    let lat = centerLocation.lat();
    let long = centerLocation.lng();

    geocoder
    .geocode({ location: {lat: lat, lng: long}} )
    .then(response => {
      const address = response.results[0].formatted_address
      mapCenter.innerHTML =`
          <h3>MAP CENTRE LOCATION</h3>
          <p>Lat: ${lat} </p>
          <p>Long: ${long} </p>
          <p><strong>${address} </strong></p>
        `
    })
    .then(() => fetchNearestStations(lat, long))
  })
}
