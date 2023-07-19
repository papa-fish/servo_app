const express = require('express')
const router = express.Router()

const Servo = require('../models/servo')


router.get('/stations/all', (req,res) => {
    Servo.findAll().then(stations => res.json(stations))
}
)

router.get('/owners', (req, res) => {
    let owners = []
    Servo.findOwners()
        .then(owner => {
            owner.forEach(item => {
                owners.push(item["owner"])
            })
        })
        .then(() => res.json({owner: owners}))
})

router.get('/stats', (req,res) => {
    let totalStations = 0;
    let totalOwners = 0;
    Servo.getStats()
    .then(stats =>  {
        totalStations = stats.reduce((acc, station) => acc + Number(station.total), 0 )
        totalOwners = stats.length
        const filteredStats = stats.filter(item => item.total > 1)
        const result = {owners: filteredStats, total_owners: totalOwners, total_stations: totalStations}
        return res.json(result)
    })
})

router.get('/stations/random', (req,res) => {
    Servo.getTotalNumRecords()
    .then(dbRes => Servo.getRandomStation(dbRes.count))
    .then(stations => res.json(stations))
})

router.get('/stations/nearest', (req,res) => {
    const { lat, long } = req.query
    Servo.getNearestStations(lat, long)
    .then(stations => {
        console.log(stations);
        return res.json(stations)
    })
})

router.get('/stations/bounds', (req, res) => {
    const { maxLong, maxLat, minLong, minLat } = req.query
    if (!minLong || !maxLong || !minLat || !maxLat) {
        return res.status(400);
    }
    Servo.getNearestStationsByBounds({ maxLong, maxLat, minLong, minLat })
    .then(dbRes => res.json(dbRes))
})

module.exports = router;