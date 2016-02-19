var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourSchema = new Schema({
  location: String
});

module.exports = mongoose.model('Tour', tourSchema);