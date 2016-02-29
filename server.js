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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// var headers = defaultCorsHeaders;
// var headers['Content-Type'] = "text/plain"

// response.writehead(statusCode, headers);

// var defaultCorsHeaders = {
//  "access-control-allow-origin": "https://tour-allure.herokuapp.com/",
//  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//  "access-control-allow-headers": "content-type, accept",
//  "access-control-max-age": 10 // Seconds.
// };

app.use(express.static(__dirname + '/public'));

require('./app/routes')(app);

var port = process.env.PORT || 8080;

app.listen(port);

console.log("You are connected to the port ", port);

exports = module.exports = app;