var Tour = require('./models/tour.js');
var session = require('express-session');


var restrict = function(req, res, next) {
  if (req.session.user !== undefined) {
    next();
  } else {
    console.log("Access denied!");
    res.send({isAuth: false});
    // res.redirect('/login');
  }
};

module.exports = function(app) {

  app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));

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

  app.get('/profile', restrict, function(req,res) {
      res.send(200)
  });
};