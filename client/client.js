  
  // import {fetchStations } from './servos_api.js'

  // fetchStations().then(res => console.log(res))
  
  
  let map
  
  async function initMap() {
    // The location of Uluru
    let position = { lat: -33.8717, lng: 151.2067 }
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary('maps')
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
  
    // The map, centered at Uluru
    map = new Map(document.getElementById('map'), {
      zoom: 13,
      center: position,
      mapId: 'DEMO_MAP_ID',
    })
  
  //   for (let e of results) {
  //     let position = { lat: e.location.lat, lng: e.location.long }
  //     const marker = new AdvancedMarkerElement({
  //       position: position,
  //       map: map,
  //     })
  //   }
  }
  
  initMap()
  