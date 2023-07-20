export function fetchStations() {
    return fetch('/api/stations/all').then(res => res.json())
}

export function fetchStats(){
    return fetch('/api/stats').then(res => res.json())
}

export function fetchRandomStation(){
    return fetch('/api/stations/random').then(res => res.json())
}

export function fetchStationsByBound(queryParams) {
    return fetch('/api/stations/bounds?' + new URLSearchParams(queryParams))
}

export function fetchNearestStationsByLatLong(lat, long) {
    return fetch(`/api/stations/nearest?lat=${lat}&long=${long}`).then(res => res.json())
}