var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  email: String,
  description: String,
  createdEvents: [],
  attendingEvents: []
});

module.exports = mongoose.model('User', userSchema);