var axios = require('axios');
var sensorsID = ['14465','14464', '14474', '14473', '14472', '14471', '14470', '14469', '14468', '14467', '14466', '14461', '14460', '14450', '14451', '14463', '14462', '14459', '14458', '14457', '14456', '14455', '14454', '14449', '14435', '14413', '14436', '14433', '14434', '14432', '14431', '14430', '14429', '14428', '14426', '14427', '14425', '14424', '14423', '14422', '14421', '14420', '14419', '14418', '14417', '14415', '14416', '14414', '14412', '14409'];
//var sensorsID = ['14465'];
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "almabike",
  password: "almabike",
  database: "almabike_db"
});


function makeGetRequest(deviceID) {
  return new Promise(function (resolve, reject) {
    axios({
        method: 'get',
        url: 'https://api.smartcitizen.me/v0/devices/' + deviceID,
        headers: {}
      })
      .then(function (response) {
        console.log('Processing Request');
        resolve([
          response.data.id,
          response.data.uuid,
          response.data.name,
          response.data.description,
          response.data.state,
          new Date(response.data.last_reading_at),
          response.data.data.location.exposure,
          JSON.stringify(response.data.data.location.latitude),
          JSON.stringify(response.data.data.location.longitude),
          response.data.data.location.city,
        ]);
      })
      .catch(function (error) {
        console.log(error);
        reject();
      });
  });
}

async function main() {
  let values = await Promise.all(sensorsID.map(id => makeGetRequest(id)));
  console.log(values);

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO `device`(`id`, `uuid`, `name`, `description`, `state`, `last_reading_at`, `exposure`, `latitude`, `longitude`, `city`) VALUES ?";
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
  
}
main();
