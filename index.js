"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mysql_1 = require("mysql");
var cors_1 = require("cors");
var app = (0, express_1["default"])();
var port = 3000;
var con = mysql_1["default"].createConnection({
    host: "localhost",
    user: "almabike",
    password: "almabike",
    database: "almabike_db"
});
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.post('/devices/:device_id/sensors/:sensor_id', function (req, res) {
    var reading = new Reading(null, new Date(req.body.time), parseInt(req.params.device_id, 10), parseInt(req.params.sensor_id, 10), parseFloat(req.body.value));
    var values = [reading.time.toISOString().slice(0, 19).replace('T', ' '), reading.deviceID, reading.sensorID, reading.value];
    console.log("CONN! - Inserimento letture da csv!");
    var sql = "INSERT INTO `readings`(`time`, `device_id`, `sensor_id`, `value`) VALUES (?)";
    con.query(sql, [values], function (queryErr, result) {
        if (queryErr)
            throw queryErr;
        console.log("Number of records inserted: " + result.affectedRows);
        reading.id = result.insertId;
        res.status(201).send(reading);
    });
});
app.get('/alldevices', function (req, res) {
    console.log("CONN! - Richiesti tutti i devices!");
    var sql = "SELECT * FROM `devices`";
    con.query(sql, function (queryErr, result) {
        if (queryErr)
            throw queryErr;
        res.status(201).send(result);
    });
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
