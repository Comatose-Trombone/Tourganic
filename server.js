var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var db = require('./config/db.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

var port = process.env.PORT || 8080;

app.listen(port);

console.log("You are connected to the port ", port);

exports = module.exports = app;