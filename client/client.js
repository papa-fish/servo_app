  
  import {fetchStations } from './servos_api.js'

  
  
  let map
  
  async function initMap() {
    // The location of Uluru
    let position = { lat: -35.9211754139999, lng: 145.638305815 }
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary('maps')
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
  
    // The map, centered at Uluru
    map = new Map(document.getElementById('map'), {
      zoom: 13,
      center: position,
      minZoom: 9,
      maxZoom: null,
      mapId: 'DEMO_MAP_ID',
    })

    fetchStations().then(stations => 
      {
        for (let station of stations) {
          let position = { lat: station.lat, lng: station.long }
          new AdvancedMarkerElement({
            position: position,
            map: map,
          })
        }
      })
  }
  
  initMap()
  
