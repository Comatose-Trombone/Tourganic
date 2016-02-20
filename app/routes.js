var Tour = require('./models/tour.js');

module.exports = function(app) {

  app.post('/search', function(req,res) {
    Tour.findOne({"location": "San Francisco"}, function(err, data) {
      if (err) {
        res.send(err)
      } else {
        res.send(data);
      }
    })
});
};