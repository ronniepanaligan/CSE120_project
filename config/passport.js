var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');

// Passport config, required for passport
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local-login',new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done){
  User.findOne({'email': email}, function(err, user){
    if(err) {
      return done(err);
    }
    if(!user){
      return done(null, false, { error: 'Your login details were wrong'})
    }

    return done(null, user);

  });
}));
