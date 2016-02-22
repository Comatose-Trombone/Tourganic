var Tour = require('./models/tour.js');

module.exports = function(app) {

  app.post('/search', function(req,res) {
    console.log(req.body);
    Tour.findOne({"location": "San Francisco"}, function(err, data) {
      if (err) {
        console.log('error');
        res.send(err)
      } else {
        res.send(data);
      }
    })

  });

  app.post('/profile', function(req,res) {
    console.log('profile data', req.body);
      res.send(200)
  });
};