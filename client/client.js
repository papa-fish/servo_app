import { fetchStations } from "./servos_api.js";

const mapCenter = document.querySelector(".center-location");

let map;

async function initMap() {
  // The location of Uluru
  let position = { lat: -35.9211754139999, lng: 145.638305815 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: position,
    minZoom: 9,
    maxZoom: null,
    mapId: "DEMO_MAP_ID",
  });


  mapCenter.innerHTML =`
  <span> Map Centre </span><br>
  <span>Lat ${position.lat} </span>
  <span>Long ${position.lng} </span>`

  map.addListener("dragend", handleCenter);

  function handleCenter() {
  
    let centerLocation = map.getCenter();
    let lat = centerLocation.lat();
    let long = centerLocation.lng();
 
    mapCenter.innerHTML =`
    <span> Map Centre </span><br>
    <span>Lat ${lat} </span>
    <span>Long ${long} </span>`

  }

  fetchStations().then((stations) => {
    for (let station of stations) {
      let position = { lat: station.lat, lng: station.long };
      console.log(position);
      new AdvancedMarkerElement({
        position: position,
        map: map,
      });
    }
  });
}

initMap();
