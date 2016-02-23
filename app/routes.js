var Tour = require('./models/tour.js');
var User = require('./models/user.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');



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
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    //check to see if a user exists already
    User.findOne({username: username})
      .exec(function(err, user) {
        if (user) {
          console.log('Account already exists');
          res.redirect('/signup');
        } else {
          var newUser = User({
              username: username,
              email: email,
              password: password
          });
          newUser.save(function(err, newUser) {
            if(err) return next(err);
            req.session.regenerate(function () {
              req.session.userId = newUser._id;
              res.send(user);
            });
          });
        }
      })
  });

  app.post('/signin', function (req, res, next) {
    var name = req.body.data.username;
    var password = req.body.data.password;

    //find the user first
    User.findOne({username: name}, function(err, user) {
      if(err) return next(err);
      if(!user) return res.send('Username does not exist in our records.');
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) {
          console.log('Username and/or password is invalid.');
          //not sure about the res.redirect
          res.redirect('/');
        } else {
          req.session.regenerate(function () {
            req.session.userId = user._id;
            res.send(user);
          });
        }
      })
    });

    app.get('/logout', function (req, res) {
      req.session.destroy(function() {
        res.redirect('/welcome');
      });
    });
  });

};



