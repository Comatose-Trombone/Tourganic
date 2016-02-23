var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourSchema = new Schema({
 name: String,
 createdBy: String, //{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 attendees: [],
 location: String,
 price: Number
});

module.exports = mongoose.model('Tour', tourSchema);