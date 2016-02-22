var Tour = require('./models/tour.js');

module.exports = function(app) {

  app.post('/search', function(req,res) {
    console.log('data', req.body);

    Tour.findOne({"location": "San Francisco"}, function(err, data) {
      if (err) {
        console.log('error');
        res.send(err)
      } else {
        res.send(data);
      }
    })

  });

  app.get('/profile', function(req,res) {
    if (err) {
      console.log('error', err);
    } else {
      console.log('getProfile post works');
      res.send(200)
    }
  })
};