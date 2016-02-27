var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourSchema = new Schema({
 name: String,
 createdBy: String, //{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 attendees: Array,
 location: String,
 date: Date,
 price: Number,
 description: String
});

module.exports = mongoose.model('Tour', tourSchema);