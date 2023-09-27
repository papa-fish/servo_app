module.exports = function seed() {

  require('dotenv').config()
  const db = require('../index')

  const fs = require("fs");
  const readline = require("readline");

  const stream = fs.createReadStream("./database/seed/stations.csv");
  const reader = readline.createInterface({ input: stream });

  let result;
  reader.on("line", row => {
    result = [];
    let insideQuotes = false;
    let currentElement = '';
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
    
      if (char === ',' && !insideQuotes) {
        result.push(currentElement.trim().replaceAll("'", "''").replaceAll('"', ''));
        currentElement = '';
      } else {
        currentElement += char;
        if (char === '"') {
          insideQuotes = !insideQuotes;
        }
      }
    }
    
    result.push(currentElement.trim());

    const sql = `INSERT INTO servos(featuretype, description, class, fid, name, operationalstatus, owner, industryid, address, suburb, state, spatialconfidence, revised, comment, lat,long) 
    VALUES (
      '${result[1] || ""}',
      '${result[2] || ""}',
      '${result[3] || ""}',
      ${result[4] || 0},
      '${result[5] || ""}',
      '${result[6] || ""}',
      '${result[7] || ""}',
      ${result[8] || 0},
      '${result[9] || ""}',
      '${result[10] || ""}',
      '${result[11] || ""}',
      ${result[12] || 0},
      ${result[13] || 0},
      '${result[14] || ""}',
      ${result[15] || 0},
      ${result[16] || 0}
    );`;
    db.query(sql).then(() => console.log('row inserted'))

  });

  reader.on("close", () => {
    //  Reached the end of file
    console.log(result);
  });

};