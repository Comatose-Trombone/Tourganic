var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourSchema = new Schema({
  name: String,
  location: String
});

module.exports = mongoose.model('Tour', tourSchema);