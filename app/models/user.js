var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bluebird = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
 username: String,
 email: String,
 password: String,
 createdEvents: Array,
 attendingEvents: Array
});


var User = mongoose.model('User', userSchema);

//add a function to the User model to compare password
User.comparePassword = function(candidatePW, savedPW, cb) {
  bcrypt.compare(candidatePW, savedPW, function(err, doesMatch) {
    if (err) {
      console.log('Username and/or password are invalid.');
      cb(err, null);
    } else {
      console.log('Username and password match. You are logged in!')
      cb(null, doesMatch);
    }
  })
}


//before saving, we want to hash the password, and save that instead.
//code is sampled from Shortly-Deploy
var salt = bcrypt.genSaltSync(10);
userSchema.pre('save', function(next) {
  var cipher = bluebird.promisify(bcrypt.hash);
  return cipher(this.password, salt, null).bind(this)
  .then(function(hash) {
    this.password = hash;
    next();
  });
});



module.exports = User;