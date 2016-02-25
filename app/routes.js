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


  app.get('/session', restrict,  function(req,res) {
    console.log("Iamstill here")
    res.send({isAuth:true});
  });

 
  app.post('/createEvent', function(req,res, next) {
    console.log('reqbody',req.body);
    var events = {
      name: req.body.name,
      createdBy: req.body.username, //{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      location: req.body.location,
      price: req.body.price,
      date: req.body.date
    };
    Tour.create(events, function(err, events) {
      if(err) return next(err);
      console.log('tour created!');
      res.send(events);
    });

  })

  app.get('/profile', restrict, function(req,res) {
    console.log('foobar');
    User.findOne({_id: req.session.userId}, function(err, data){
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.send(data);
      }
    })
  });

  app.post('/signup', function (req, res, next) {
    var username = req.body.data.username;
    var password = req.body.data.password;
    var email = req.body.data.email;
    //check to see if a user exists already:
    User.findOne({username: username})
      .exec(function(err, user) {
        if (user) {
          console.log('Account already exists');
          res.redirect('/signup');
        } else {
          //if user does not exist, create and save the user:
          var newUser = User({
              username: username,
              email: email,
              password: password,
              createdEvents: ["56ce5cfef60e2f4441e098de"]
          });
          newUser.save(function(err, newUser) {
            if(err) return next(err);
            //generate a session for the user:
            req.session.regenerate(function () {
              req.session.userId = newUser._id;
              console.log('newuser', newUser);
              res.send(user);
            });
          });
        }
      })
  });

  app.post('/signin', function (req, res, next) {
    var name = req.body.data.username;
    var password = req.body.data.password;

    //find the user first:
    User.findOne({username: name}, function(err, user) {
      if(err) return next(err);
      if(!user) return res.send('Username does not exist in our records.');
      //checks entered PW with the saved hashed/salted PW (defined in user.js)
      //isMatch is a boolean value.
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) { return next(err); }
        else if (isMatch) {
          req.session.regenerate(function () {
            req.session.userId = user._id;
            res.send(user);
          });
        } 
        else {
          res.redirect('/signin');
        }
      })
    });
  });

  app.get('/logout', function (req, res) {
    req.session.destroy(function() {
      res.send('hey');
    });
  });

  // Fetch information for a specific tour, given its id
  app.post('/fetchTourInfo', function (req, res) {
    var id = req.body.data;
    Tour.findOne({_id: id}, function(err, data) {
      if (err) {
        throw err;
      } else {
        res.send(data);
      }
    });
  });
}



