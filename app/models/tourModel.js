var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourSchema = new Schema({
 pictureUrl: String,
 name: String,
 createdBy: String,
 attendees: Number,
 streetAddress: String,
 city: String,
 state: String,
 date: Date,
 price: Number,
 description: String,
 LatLng: Array
});

module.exports = mongoose.model('Tour', tourSchema);