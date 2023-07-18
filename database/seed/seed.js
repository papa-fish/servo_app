require('dotenv').config()
const db = require('../index')

console.log('DATABASE URL', process.env.DATABASE_URL)

const fs = require("fs");
const readline = require("readline");

const stream = fs.createReadStream("./database/seed/stations.csv");
const reader = readline.createInterface({ input: stream });

let data = [];

reader.on("line", row => {
  // This will split a row string into an array
  // And then push into the data array
  data.push(row.split(","));

  const sql = `INSERT INTO servos(featuretype, description, class, fid, name, operationalstatus, owner, industryid, address, suburb, state, spatialconfidence, revised, comment, lat,long) VALUES ('${data[0][1]}','${data[0][2]}','${data[0][3]}',${data[0][4]}, '${data[0][5]}','${data[0][6]}','${data[0][7]}',${data[0][8] || 0},'${data[0][9]}','${data[0][10]}','${data[0][11]}',${data[0][12]},${data[0][13]},'${data[0][14]}','${data[0][15]}','${data[0][16]}');`;
    db.query(sql).then(() => console.log('row inserted'))
});

reader.on("close", () => {
  //  Reached the end of file
  console.log(data);
});