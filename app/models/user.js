var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  createdEvents: [],
  attendingEvents: []
});

module.exports = mongoose.model('User', userSchema);