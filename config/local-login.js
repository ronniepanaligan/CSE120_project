var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('../models/user');

module.exports = new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done){
  //check if email already exists
  User.findOne({'email': email}, function(err, user){
    if(err) {
      throw err;
    }
    if(!user){
      throw err;
    }


      return done(null, user);

  });
});
