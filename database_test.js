const Servo = require('./models/servo')



// Servo.findAll().then(res => console.log(res))

Servo.findOwners().then(res => console.log(res))