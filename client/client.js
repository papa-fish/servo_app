let results = [
    {
      name: 'Sydney Harbour Bridge',
      location: { lat: -33.8523, long: 151.2108 },
    },
    {
      name: 'Queen Victoria Building',
      location: { lat: -35.8717, long: 151.2067 },
    },
    { name: 'Central Station', location: { lat: -33.8832, long: 151.207 } },
    { name: 'Chinatown', location: { lat: -33.879, long: 151.2043 } },
    { name: 'Sydney Opera House', location: { lat: -33.8568, long: 151.2153 } },
    {
      name: 'Sea Life Sydney Aquarium',
      location: { lat: -33.8696, long: 151.2021 },
    },
  ]
  
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
  
    for (let e of results) {
      let position = { lat: e.location.lat, lng: e.location.long }
      const marker = new AdvancedMarkerElement({
        position: position,
        map: map,
      })
    }
  }
  
  initMap()
  