import { fetchStations } from "./servos_api.js";
import { mapCentreLocation } from "./components/map_centre.js";

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

  mapCentreLocation(position, map)
 
  fetchStations().then((stations) => {
    for (let station of stations) {
      let position = { lat: station.lat, lng: station.long };
      new AdvancedMarkerElement({
        position: position,
        map: map,
      });
      const contentString =`<h4>${station.name}</h4><p>${station.address}</p>`;
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      const marker = new google.maps.Marker({
        position: position,
        map,
      });
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });

      const stationName =`<h4>${station.name}</h4>`;
      const infoStationNamewindow = new google.maps.InfoWindow({
        content: stationName,
      });
      marker.addListener("mouseover", () => {
        infoStationNamewindow.open({
          anchor: marker,
          map,
        });

        marker.addListener('mouseout', () => {
          infoStationNamewindow.close()
        })
      });
    }
  });
}

initMap();
