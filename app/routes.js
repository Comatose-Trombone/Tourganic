var Tour = require('./models/tour.js');

module.exports = function(app) {

  app.post('/search', function(req,res) {
    var location = req.body.data
    console.log(location)
    Tour.findOne({"location": location}, function(err, data) {
      if (err) {
        console.log('error');
        res.send(err)
      } else {
        console.log(data)
        res.send(data);
      }
    })

  });

  app.post('/profile', function(req,res) {
    console.log('profile data', req.body);
      res.send(200)
  });
};

