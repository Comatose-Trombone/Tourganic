var Tour = require('./models/tour.js');
var User = require('./models/user.js');

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

  app.post('/signup', function (req, res, next) {
     var user = {
         name: req.body.username,
         email: req.body.email,
         password: req.body.password
     };
     User.create(user, function(err, newUser) {
        if(err) return next(err);
        // req.session.user = email;
        return res.redirect('./profile');
     });
  });

  app.post('/login', function (req, res, next) {
     var name = req.body.username;
     var password = req.body.password;

     User.findOne({name: name, password: password}, function(err, user) {
        if(err) return next(err);
        if(!user) return res.send('Incorrect username or password');

        // req.session.user = email;
        return res.redirect('./profile');
     });
  });

  app.get('/logout', function (req, res) {
     req.session.user = null;
     res.redirect('./welcome')
  });

};