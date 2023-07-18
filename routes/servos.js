const express = require('express')
const router = express.Router()

const Servo = require('../models/servo')


router.get('/stations/all', (req,res) => {
    console.log('Inside routes stations/all');
    Servo.findAll().then(stations => res.json(stations))
}
)

module.exports = router;