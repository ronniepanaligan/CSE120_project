var express = require('express');
var classRouter = express.Router();
var Class = require('../models/ucmClass');
var User = require('../models/user');
var Schedule = require('../models/schedule');

module.exports = function(app) {
  //These routes handle adding registered classes to a user
  app.post('/api/registerClass', function(req, res) {
    var crn = req.body.crn;
    var ucmID = req.body.ucmID;
    Class.findOne({ 'CRN': crn }, function(err, c) {
      if(err)
        throw err;
      User.findOneAndUpdate({ 'ucmID' : ucmID }, {$push: {registeredClasses: c}},function(err, user) {
        if(err)
          throw err;
      });
    });
    res.json(user);
  });

  //These routes handle user create, delete
  app.get('/api/users', function(req, res) {
    User.find(function(err, users) {
      if(err)
        res.send(err);
      res.json(users);
    });
  });

  app.post('/api/users', function(req, res) {
    User.create({
      ucmID : req.body.ucmID,
      firstName : req.body.firstName,
      lastName : req.body.lastName
    }, function(err, classs) {
      if(err)
        res.send(err);
      User.find(function(err, classes) {
        if(err)
          res.send(err);
      });
    });
    res.json(classes);
  });

  //These routes handle class create, delete, update
  app.get('/api/classes', function(req, res) {
    Class.find(function(err, classes) {
      if(err)
        res.send(err);
      res.json(classes);
    });
  });

  app.post('/api/classes', function(req, res) {
    Class.create({
      crn : req.body.crn,
      courseNum : req.body.courseNum,
      courseTitle : req.body.courseTitle,
      units : req.body.units,
      actv : req.body.actv,
      time : req.body.time,
      room : req.body.room,
      startEnd : req.body.startEnd,
      instructor : req.body.instructor,
      maxEnroll : req.body.maxEnroll,
      actEnroll : req.body.actEnroll,
      seatsAvail : req.body.seatsAvail
    }, function(err, classs) {
      if(err)
        res.send(err);
      Class.find(function(err, classes) {
        if(err)
          res.send(err);
      });
    });
    res.json(classes);
  });

  app.delete('/api/classes/:class_id', function(req, res) {
    Class.remove({
      _id : req.params.class_id
    }, function(err, classs) {
      if (err)
        res.send(err);
      Class.find(function(err, classes) {
        if (err)
          res.send(err)
        res.json(classes);
      });
    });
  });

  //These routes handle schedule create, delete, update
  app.get('/api/schedules', function(req, res) {
    Schedule.find(function(err, schedules) {
      if(err)
        res.send(err);
      res.json(schedules);
    });
  });
};
