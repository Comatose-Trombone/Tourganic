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



  app.get('/profile', function(req,res) {
      User.findOne({name: session.username}, function(err, data){
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(data);
        }
      })
  });
};

