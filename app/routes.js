var Tour = require('./models/tour.js');
var User = require('./models/user.js');
var session = require('express-session');


var restrict = function(req, res, next) {
  if (req.session.userId !== undefined) {
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

  app.post('/createEvent', function(req,res) {
    var events = {
      name: req.body.name,
      createdBy: req.body.username, //{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      location: req.body.location,
      price: req.body.price,
      date: req.body.date
    };
    Tour.create(events, function(err, events) {
      if(err) return next(err);
      res.redirect('/profile');
    });

  })

  app.get('/profile', restrict, function(req,res) {
    User.findOne({_id: req.session.userId}, function(err, data){
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(data);
      }
    })
  });

  app.post('/signup', function (req, res, next) {
    var user = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    User.create(user, function(err, newUser) {
      if(err) return next(err);
      req.session.regenerate(function () {
        req.session.userId = newUser._id;
        res.redirect('./profile');
      });
    });
  });

  app.post('/login', function (req, res, next) {
    var name = req.body.username;
    var password = req.body.password;

    User.findOne({name: name, password: password}, function(err, user) {
       if(err) return next(err);
       if(!user) return res.send('Incorrect username or password');
       req.session.regenerate(function () {
         req.session.userId = user._id;
         res.redirect('/profile');
       });
    });
  });

  app.get('/logout', function (req, res) {
    req.session.destroy(function() {
      res.redirect('/welcome');
    });
  });
};