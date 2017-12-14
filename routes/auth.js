var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var bcrypt = require('bcryptjs');

module.exports = function(app) {

  app.post('/auth/login', passport.authenticate('local-login'), function(req, res){
    console.log(res.data);
    console.log('req',req.user);
    res.status(200).json({
      message: "User is logged in",
      user: req.user
    })
  });

  app.post('/auth/logout', function(req, res) {
    req.logout();
    res.json({
      message: 'deleted'
    })
  })

  app.post('/auth/signup')
}
