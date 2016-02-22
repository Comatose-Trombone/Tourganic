var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  createdEvents: [],
  attendingEvents: []
});

var tourSchema = new Schema({
  name: String,
  createdBy: String, //{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  attendees: [],
  location: String,
  price: Number
});

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Tour', tourSchema);