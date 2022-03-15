var axios = require('axios');
//var sensorsID = ['14465', '14464', '14474', '14473', '14472', '14471', '14470', '14469', '14468', '14467', '14466', '14461', '14460', '14450', '14451', '14463', '14462', '14459', '14458', '14457', '14456', '14455', '14454', '14449', '14435', '14413', '14436', '14433', '14434', '14432', '14431', '14430', '14429', '14428', '14426', '14427', '14425', '14424', '14423', '14422', '14421', '14420', '14419', '14418', '14417', '14415', '14416', '14414', '14412', '14409'];
var sensorsID = ['14465'];
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "almabike",
  password: "almabike",
  database: "almabike_db"
});

sensorsID.forEach(elem => {
  console.log("ID sensore: "+elem);
  axios({
    method: 'get',
    url: 'https://api.smartcitizen.me/v0/devices/'+elem,
    headers: { }})
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

});

