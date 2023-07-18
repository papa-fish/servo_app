const db = require('../database')

function findAll() {
    const sql = `SELECT * FROM servos LIMIT 400;`
    return db.query(sql).then(res => res.rows)
}

function findOwners() {
    const sql = `SELECT DISTINCT owner FROM servos;`
    // let ownerList = {}
    return db.query(sql).then(owners => owners.rows)
}


const Servo = {
    findAll,
    findOwners
}

module.exports = Servo;