var Tour = require('./models/tour.js');
var User = require('./models/user.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');



module.exports = function(app) {

  app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));

  // app.use(cookie('secret'));

  var restrict = function(req, res, next) {
    if (req.session.userId !== undefined) {
      next();
    } else {
      console.log("Access denied!");
      res.send({isAuth: false});
      // res.redirect('/login');
    }
  };

  app.post('/search', function(req,res) {
    var location = req.body.data
    Tour.findOne({"location": location}, function(err, data) {
      if (err) {
        console.log('error');
        res.send(err)
      } else {
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
        username: req.body.data.username,
        email: req.body.data.email,
        password: req.body.data.password
    };
    User.create(user, function(err, newUser) {
      if(err) return next(err);
      req.session.regenerate(function () {
        req.session.userId = newUser._id;
        res.send(user);
      });
    });
  });

  app.post('/signin', function (req, res, next) {
    var name = req.body.data.username;
    var password = req.body.data.password;

    User.findOne({username: name, password: password}, function(err, user) {
      if(err) return next(err);
      if(!user) return res.send('Incorrect username or password');
      req.session.regenerate(function () {
        req.session.userId = user._id;
        res.send(user);
      });
    });
  });

  app.get('/logout', function (req, res) {
    req.session.destroy(function() {
      res.redirect('/welcome');
    });
  });
};