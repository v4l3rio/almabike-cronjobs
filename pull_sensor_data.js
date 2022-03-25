var axios = require('axios');
var mysql = require('mysql');

const csv = require('csv-parser');
const fs = require('fs');

let values = [];

fs.createReadStream('22-03-14.CSV')
  .pipe(csv())
  .on('data', (row) => {
    values.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });


var con = mysql.createConnection({
    host: "localhost",
    user: "almabike",
    password: "almabike",
    database: "almabike_db"
});

/*
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO `device`(`id`, `uuid`, `name`, `description`, `state`, `last_reading_at`, `exposure`, `latitude`, `longitude`, `city`) VALUES ?";
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});
*/