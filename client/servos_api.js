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