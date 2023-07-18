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

module.exports = router;