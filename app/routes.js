var Tour = require('./models/tour.js');
var User = require('./models/user.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');



module.exports = function(app) {

  app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));


  var restrict = function(req, res, next) {
    if (req.session.userId !== undefined) {
      next();
    } else {
      console.log("Access denied!");
      res.send({isAuth: false});
      // res.redirect('/login');
    }
  };
  
// checks the valid inputs adn creates a new object with valid keys
  app.post('/search', function(req,res) {
    var inputObj = req.body.data
    var newObj = {};
    for (var key in inputObj) {
      if (inputObj[key] !== "") {
        newObj[key] = inputObj[key]
      }
    }
//setting up the price based on the $ amount
    if(newObj.price !== undefined) {
      if (newObj.price === "$") {
       newObj.price = {$lt: 26};
      } else if (newObj.price === "$$") {
        newObj.price = {$lt: 51};
      } else if (newObj.price === "$$$") {
        newObj.price = {$lt: 76};
      } else if (newObj.price === "$$$$") {
        newObj.price = {$lt: 101};
      }
    };

    Tour.find(newObj, function(err, data) {
      console.log("datainfind:", data)
      if (err) {
        console.log('error');
        res.send(err)
      } else {
        console.log("I got calledbefore data and data is", data)
        res.send(data);
      }
    });
  });


  app.get('/session', restrict,  function(req,res) {
    res.send({isAuth:true});
  });

 
  app.post('/createTour', function(req,res, next) {
    console.log('reqbody',req.body);
    var newTour = {
      name: req.body.name,
      createdBy: req.body.createdBy,
      location: req.body.location,
      description: req.body.description,
      date: req.body.date,
      price: req.body.price
    };
    Tour.create(newTour, function(err, tour) {
      if(err) return next(err);
      User.findOne({_id : req.session.userId}, function(err, user) {
        if(err) return next(err);
        user.createdTours.push(tour._id);
        user.save(function(err, user) {
          if(err) return next(err);
          console.log("tour.createdByis", tour.createdBy)
          tour.createdBy = user.username
          tour.save(function(err, tour){
            res.send(user);
          })
        });
      })
    });
  });

  // Add a tour's ID to the user's attendingTours property when the user "Joins" the tour
  app.post('/joinTour', restrict, function(req, res) {
    // Find the currently logged in user
    User.findOne({_id: req.session.userId}, function(err, user){
      if (err) {
        res.send(err);
      } else {
        // Find the specified tour, given its ID
        Tour.findOne({_id: req.body.data}, function(err, tour) {
          if (err) {
            res.send(err);
          } else {
            user.attendingTours.push(tour._id);
            user.save(function(err, user) {
              if(err) {
                return next(err);
              } else {
                console.log(user);
                res.send(user);
              }
            });
          }
        })
      }
    })
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
    var username = req.body.data.username;
    var password = req.body.data.password;
    var email = req.body.data.email;
    //check to see if a user exists already:
    User.findOne({username: username})
      .exec(function(err, user) {
        if (user) {
          console.log('Account already exists.');
          res.send('Account already exists.');
        } else {
          //if user does not exist, create and save the user:
          var newUser = User({
              username: username,
              email: email,
              password: password,
              createdTours: [],
              attendingTours: []
          });
          User.hashPassword(password, function(hash) {
            if(err) return next(err);
            newUser.password = hash;
            newUser.save(function(err, newUser) {
              req.session.regenerate(function () {
                req.session.userId = newUser._id;
                res.send(newUser);
              });
            })
          });
        }
      })
  })

  app.post('/signin', function (req, res, next) {
    var name = req.body.data.username;
    var password = req.body.data.password;

    //find the user first:
    User.findOne({username: name}, function(err, user) {
      if(err) return next(err);
      if(!user) return res.send('Username and/or password invalid.');
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
          res.send('Username and/or password invalid.');
        }
      });
    });
  });

  app.get('/logout', function (req, res) {
    req.session.destroy(function() {
      res.send('hey');
    });
  });

  // Fetch information for a specific tour, given its id
  app.post('/fetchTourInfo', function(req, res) {
    var id = req.body.data;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      Tour.findOne({_id: id}, function(err, data) {
        console.log("datainserver:", data);
        if (err) {
          throw err;
        } else {
          res.send(data);
        }
      });
    }
  });

  app.post('/aboutMeEdit', function(req, res) {
    var aboutMe = req.body.data;
    User.findOne({_id: req.session.userId}, function(err, user){
      if (err) {
        throw err;
      } else {
        user.aboutMe = aboutMe;
        user.save(function(err, user) {
          if(err) {
            return next(err);
          } else {
            res.send(user);
          }
        });
      }
    })
  })
}



