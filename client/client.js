import { fetchStations, fetchStationsByBound } from "./servos_api.js";
import { mapCentreLocation } from "./components/map_centre.js";
import { userLocation } from "./components/user_location.js";
import { spotlightClick } from "./components/spotlight.js";

let map, infoWindow;
let markers = [];

async function initMap() {
  let position = { lat: -35.9211754139999, lng: 145.638305815 };
  const { Map } = await google.maps.importLibrary("maps");


  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: position,
    minZoom: 9,
    maxZoom: null,
    mapId: "DEMO_MAP_ID",
  });

  google.maps.event.addListener(map, 'idle', function() {
    const bounds = map.getBounds();
    renderMarkersByBound(bounds)
  })

  mapCentreLocation(position, map)
  userLocation(map, infoWindow)
  spotlightClick(map, infoWindow)
  
  // const bounds = map.getBounds();
  // renderMarkersByBound(bounds);
}
initMap();

function renderMarkersByBound(bounds) {
  // console.log(bounds)
  fetchStationsByBound({
    maxLong: bounds.Ia.hi,
    maxLat: bounds.Ua.hi,
    minLong: bounds.Ia.lo,
    minLat: bounds.Ua.lo,
  })
  .then((stations) => {

    // Remove the previous markers first
    removeMarkers();

    for (let station of stations) {
      let position = { lat: station.lat, lng: station.long };
      
      const marker = new google.maps.Marker({
        position: position,
        map,
        icon: {
          url: `${station.logo_url}`,
          scaledSize: new google.maps.Size(35, 35),
        }
      });

      markers.push(marker);

      const contentString =`<h4>${station.name}</h4><p>${station.address}</p>`;
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
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

function removeMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}