// import { findAll } from "../../models/servo"

import { fetchStations } from "../servos_api.js"

export function dragUpdate (map) {
    map.addListener("dragend", () => {
        console.log("dragging");
        fetchStations
    })
}

dragUpdate(map);