var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var user = require('../models/user');

module.exports = new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done){
  //covert stri
  if(email)
    email = email.toLowerCase();
  //check if email already exists
  User.findOne({'email': email}, function(err, user){
    if(err) {
      throw err;
    }
    if(!user){
      throw err;
    }
    if(bcrypt.compareSync(password, user.password)){
      if(err){
        throw err;
      }
      return done(null, user);
    } else {
      throw err;
    }
  });
});
