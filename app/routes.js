var Tour = require('./models/tour.js');
var sessions = require('express-session');

app.use(session({ 
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

var restrict = function(req, res, next) {
  if (req.session.user !== undefined) {
    next();
  } else {
    console.log("Access denied!");
    // res.redirect('/login');
  }
};

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

  app.post('/profile', restrict, function(req,res) {
    console.log('profile data', req.body);
      res.send(200)
  });
};