const db = require('../database')

function findAll() {

    const sql = `SELECT * FROM servos LIMIT 400;`
    return db.query(sql).then(res => res.rows)
}

function findOwners() {
    const sql = `SELECT DISTINCT owner FROM servos;`
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

function getNearestStations(givenLat, givenLong) {
    const sql = `SELECT id, name, address,owner, logo_url, lat, long, 
    6371 * 2 * ASIN(SQRT(POWER(SIN(RADIANS(${givenLat} - lat) / 2), 2) +
    COS(RADIANS(${givenLat})) * COS(RADIANS(lat)) *
    POWER(SIN(RADIANS(${givenLong} - long) / 2), 2))) AS distance
    FROM servos
    ORDER BY distance
    LIMIT 10;`
    console.log(sql)
    return db.query(sql).then (res => res.rows)
}

function getNearestStationsByBounds({ maxLong, maxLat, minLong, minLat }) {
    const sql = `SELECT * FROM servos WHERE long > ${minLong} AND lat < ${maxLat} AND long < ${maxLong} AND lat > ${minLat};`
    return db.query(sql).then (res => res.rows)
}

const Servo = {
    findAll,
    findOwners,
    getRandomStation,
    getStats,
    getTotalNumRecords,
    getNearestStations,
    getNearestStationsByBounds
}

module.exports = Servo;