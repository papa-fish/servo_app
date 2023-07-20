import { fetchStations, fetchStationsByBound } from "./servos_api.js";
import { mapCentreLocation } from "./components/map_centre.js";
import { userLocation } from "./components/user_location.js";
import { spotlightClick } from "./components/spotlight.js";

let map, infoWindow;

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
  
  const bounds = map.getBounds();
  renderMarkersByBound(bounds)
}

initMap();

function renderMarkersByBound(bounds) {
  fetchStationsByBound({
    maxLong: bounds.Ha.hi,
    maxLat: bounds.Va.hi,
    minLong: bounds.Ha.lo,
    minLat: bounds.Va.lo,
  })
  .then((stations) => {
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