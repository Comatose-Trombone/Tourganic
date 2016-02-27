var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourSchema = new Schema({
 name: String,
 createdBy: String, //{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 attendees: Array,
 streetAddress: String,
 city: String,
 state: String,
 price: Number,
 description: String,
 LatLng: Array
});

module.exports = mongoose.model('Tour', tourSchema);