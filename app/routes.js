var Tour = require('./models/tour.js');

module.exports = function(app) {

  app.get('/', function(req,res) {
    console.log("I have a get request")
    res.send("hellooooo")
  })

  app.get('/profile', function(req, res) {
    console.log('receiving AJAX req from profile');
    res.send(200);
  })


  app.post('/search', function(req,res) {
    console.log("I got the post request");
    Tour.findOne({"location": "San Francisco"}, function(err, data) {
      if (err) {
        res.send(err)
      } else {
        res.send(data.name);
      }
    })
});
};