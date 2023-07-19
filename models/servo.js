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


function getRandomStation(totalRecords) {
    const randomOffset = Math.floor(Math.random()*totalRecords)
    sql = `SELECT * FROM servos LIMIT 1 OFFSET ${randomOffset};`
    return db.query(sql).then(res => res.rows[0])
}

function getStats() {
    const sql = `SELECT owner, COUNT(id) AS total FROM servos GROUP BY owner ORDER BY total DESC`
    return db.query(sql).then(res => res.rows)
}

function getTotalNumRecords() {
    const sql = `SELECT count(*) FROM servos;`
    return db.query(sql).then(res => res.rows[0])
}


const Servo = {
    findAll,
    findOwners,
    getRandomStation,
    getStats,
    getTotalNumRecords
}

module.exports = Servo;