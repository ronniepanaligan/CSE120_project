var express = require('express');
var classRouter = express.Router();
var Class = require('../models/ucmClass');
var User = require('../models/user');
var Schedule = require('../models/schedule');
var Subject = require('../models/classSubject');
var Queue = require('../models/ClassQueue');
var rc = require('../models/reqClasses');

module.exports = function(app) {
  /***********************************************
  THESE ROUTES HANDLE REGISTERING FOR A CLASS
  ***********************************************/
  /*
  1. Check if class is full
  2. If full, add crn to class' registerQueue
  3. If not, add to user's registeredClasses
  */

  app.get('/testing', function(req, res){
    days = 'WF';
    days1 = 'MW'
    for(var i = 0; i < days.length; i++){
      if(days1.indexOf(days[i]) > -1)
        console.log('hi')
    }
  })

  app.post('/api/registerClass', function(req, res) {
    var c_id = req.body.crn;
    var ucmID = req.body.ucmID;

    //1. Check if class is isFull
    Class.findOne({ 'crn' : c_id}, function(err, c){
      var start = c.startTime.values;
      var end = c.endTime.values;
      var days = c.days;

      if(c.seatsAvail <= 0){
        //2. If full, add crn to class's registerQueue
        Queue.findOneAndUpdate({ 'crn' : c_id }, {$push: {registerQueue: ucmID}}, function(err, qu) {
          User.findOneAndUpdate({ 'ucmID' : ucmID }, {$push: {inQueue: c_id}}, function(err, a) {
          });
          //finished registering
          return res.json({"msg" : "User added to queue!"});
        });
      } else {
        //3. If not, check if class conflicts with another registered class
        User.findOne({ 'ucmID' : ucmID }, function(err, u){
          var conflict = false;

          //loop through registered class to check for conflicts
          var registeredClasses = u.registeredClasses.map((item) => {

            var start1 = item.startTime.values;
            var end1 = item.endTime.values;
            var days1 = item.days;

            //check if classes have similar Days
            for(var i = 0; i < days.length; i++){
              if(days1.indexOf(days[i]) > -1){
                conflict = true;
                return res.json({'msg':'error'});
              }
            }
            //Hour1 is already registered class, Hour is class user attempting to register for
            if(!(start < start1 && end < start1) || (start > end1 && start > start1)){
              conflict = true;
            }
          });
          //No conflicts found, register for class
          if(!conflict){
            User.findOneAndUpdate({ 'ucmID' : ucmID }, {$push: {registeredClasses: c}},function(err, user) {
              if(err)
                return res.send(err);
              return res.json(user);
            });
          } else {
            //there was a conflict, do not register
            console.log(u);
            res.json({'msg' : 'Conflicts'});
          }
        });
      }
    });
  });

  app.post('/api/registerClass/remove', function(req, res) {
    var ucmID = req.body.ucmID;
    var crn = req.body.crn;

    Class.findOne({ 'crn' : crn }, function(err, c) {
      if(err)
        throw err;
      console.log(c);

      User.findOneAndUpdate({ 'ucmID' : ucmID }, {$pull: {registeredClasses: c}},function(err, user) {
        if(err)
          throw err;
        res.json(user);
      });
    });
  })


  /***********************************************
  THESE ROUTES HANDLE SAVING A CLASS
  ***********************************************/
  //add a class to savedClasses
  app.post('/api/saveClass', function(req, res) {
    var ucmID = req.body.ucmID;
    var crn = req.body.crn;

    Class.findOne({ 'crn' : crn }, function(err, c) {
      if(err)
        throw err;
      console.log(c);

      User.findOne({ 'ucmID' : ucmID }, function(err, user) {
        //check to see if User has already saved the class
        if(err)
          res.send(err);
        var savedClasses = user.savedClasses;
        var contains = false;
        for(let i = 0; i < savedClasses.length; i++){
          if(savedClasses[i].crn == crn){
            contains = true;
          }
        }
        if(!contains){
          User.findOneAndUpdate({ 'ucmID' : ucmID }, {$push: {savedClasses: c}},function(err, u) {
            if(err)
              res.send(err);
            res.json({'msg' : 'Successfully saved class'});
          });
        } else {
          res.json({'msg' : 'Error: User already saved class'})
        }
      });
    });
  });

  //remove a class from savedClasses
  app.post('/api/saveClass/remove', function(req, res) {
    var ucmID = req.body.ucmID;
    var crn = req.body.crn;

    Class.findOne({ 'crn' : crn }, function(err, c) {
      if(err)
        throw err;
      console.log(c);

      User.findOneAndUpdate({ 'ucmID' : ucmID }, {$pull: {savedClasses: c}},function(err, user) {
        if(err)
          throw err;
        res.json(user);
      });
    });
  })

  /***********************************************
  THESE ROUTES HANDLE GETTING, CREATING, DELETING USERS
  ***********************************************/
  //get ALL users
  app.get('/api/users', function(req, res) {
    User.find(function(err, users) {
      if(err)
        res.send(err);
      res.json(users);
    });
  });

  //get user with specific ucmID
  app.get('/api/users/:user_id', function(req, res) {
    User.findOne({
      ucmID: req.params.user_id
    }, function(err, user) {
      if(err)
        res.send(err);
      res.json(user);
    });
  });

  //delete user with specific ucmID
  app.delete('/api/users/:user_id', function(req, res) {
    User.remove({
      _id : req.params.user_id
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
      });
    });

  //create a new user
  app.post('/api/users', function(req, res) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      ucmID : req.body.ucmID,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      major: req.body.major
    }, function(err, user) {
      if(err)
        res.send(err);

    });
  });

  /***********************************************
  THESE ROUTES HANDLE GETTING, CREATING, DELETING CLASSES
  ***********************************************/
  //get ALL classes
  app.get('/api/classes', function(req, res) {
    Class.find(function(err, classes) {
      if(err)
        res.send(err);
      res.send(classes);
    });
  });

  app.get('/api/lectures', function(req, res) {
    Class.find({
      actv: 'LECT'
    }, function(err, classes) {
      if(err)
        res.send(err);
      res.json(classes);
    });
  });

  //get a class with specific crn
  app.get('/api/classes/:crn', function(req, res) {
    const crn = req.params.crn;

    Class.findOne({'crn' : crn}, function(err, c) {
      if(err)
        res.send(err);
      res.send(c);
    })
  })

  //create a new class
  app.post('/api/classes', function(req, res) {
    Class.create({
      crn : req.body.crn,
      subject : req.body.subject,
      courseNum : req.body.courseNum,
      courseTitle : req.body.courseTitle,
      units : req.body.units,
      actv : req.body.actv,
      room : req.body.room,
      days : req.body.days,
      startTime : {
        time : req.body.startTime,
        values: req.body.startValue
      },
      endTime : {
        time : req.body.endTime,
        values: req.body.endValue
      },
      instructor : req.body.instructor,
      maxEnroll : req.body.maxEnroll,
      actEnroll : req.body.actEnroll,
      seatsAvail : req.body.seatsAvail
    }, function(err, c) {
      if(err)
        res.send(err);

      Queue.create({
        crn : req.body.crn,
        capacity : req.body.maxEnroll,
        actual : req.body.actEnroll,
      }, function(err, q){
        if(err)
          res.send(err);
        res.json(c);
      });
    });
  });

  //delete a class with specific crn
  app.delete('/api/classes/:crn', function(req, res) {
    Class.remove({
      crn : req.params.crn
    }, function(err, classs) {
      if (err)
        res.send(err);
      Class.find(function(err, classes) {
        if (err)
          res.send(err)
        Queue.remove({
          crn: req.params.crn
        }, function(err, results){
          res.json(classes);
        });
      });
    });
  });

  /***********************************************
  THESE ROUTES HANDLE GETTING CLASS QUEUES
  ***********************************************/
  app.get('/api/queues', function(req, res) {
    Queue.find(function(err, q){
      if(err)
        res.send(err);
      res.json(q);
    });
  });

  app.post('/api/dequeue', function(req, res){
    var crn = req.body.crn;
    var ucmID = req.body.ucmID;
    Queue.findOneAndUpdate({crn:crn}, {$pull: {registerQueue: ucmID}}, function(err, q){
      if(err)
        res.send(err)
      res.json(err)
    })
  })

  app.post('/api/dequeueUser', function(req, res){
    var crn = req.body.crn;
    var ucmID = req.body.ucmID;

    User.findOneAndUpdate({ucmID:ucmID}, {$pull: {inQueue: crn}}, function(err, q){
      if(err)
        res.send(err)
      res.json(q)
    })
  })
  /***********************************************
  THESE ROUTES HANDLE GETTING, CREATING, DELETING SUBJECTS
  ***********************************************/
  //create a new subject
  app.post('/api/subjects', function(req, res) {
    Subject.create({
      title: req.body.title,
      subCode: req.body.subCode
    }, function(err, subject) {
      if(err)
        res.send(err);
      res.json(subject);
    });
  });

  //get all subjects
  app.get('/api/subjects', function(req, res) {
    Subject.find(function(err, subjects) {
      if(err)
        res.send(err);
      res.json(subjects);
    })
  });

  app.delete('/api/subjects/:sub', function(req, res) {
    Subject.remove({subCode:req.params.sub}, function(err, subjects) {
      if(err)
        res.send(err);
      res.json(subjects);
    })
  });
  /***********************************************
  THESE ROUTES HANDLE GETTING, CREATING, DELETING REQUIRED CLASSES
  ***********************************************/
  //Get ALL reqClasses
  app.get('/api/reqClass', function(req, res) {
    rc.find(function(err, rc){
      if(err)
        res.send(err);
      res.json(rc);
    });
  });

  //get one
  app.get('/api/reqClass/:crn', function(req, res) {
    rc.findOne({ crn : req.params.crn }, function(err, rc){
      if(err)
        res.send(err);
      res.json(rc);
    });
  });

  //Create reqClass class
  app.post('/api/reqClass', function(req, res) {
    rc.create({
      crn : req.body.crn
    }, function(err, rc){
      if(err)
        console.log(err);
      res.json(rc);
    });
  });

  //add labs
  app.post('/api/reqClass/labs', function(req, res) {
    var lab = req.body.lab;

    Class.findOne({ crn : lab }, function(err, c){
      rc.findOneAndUpdate({ crn : req.body.lect }, {$push : {labs: c}}, function(err, rc){
        if(err)
          res.send(err);
        res.json(rc);
      });
    });
  });

  //add discussions
  app.post('/api/reqClass/disc', function(req, res) {
    var d = req.body.disc;

    rc.findOneAndUpdate({ crn : req.body.lect }, {$push : {discussions: d}}, function(err, rc){
      if(err)
        res.send(err);
      res.json(rc);
    });
  });

  //delete
  app.delete('/api/reqClass/:crn', function(req, res) {
    var crn = req.params.crn;

    rc.remove({ crn : crn }, function(err, r){
      if(err)
        res.send(err);
      res.json(r);
    });
  });

  /***********************************************
  THESE ROUTES HANDLE GETTING, CREATING, DELETING SCHEDULES
  ***********************************************/
  //get ALL schedules
  app.get('/api/schedules', function(req, res) {
    Schedule.find(function(err, schedules) {
      if(err)
        res.send(err);
      res.json(schedules);
    });
  });


app.post('/api/updateClass', function(req,res){
  Class.findOneAndUpdate({ crn : req.body.crn}, { $inc: { actEnroll: -1, seatsAvail: 1} }, function(err, c){
      Queue.findOne({ crn : req.body.crn }, function(err, q){
        var data = q.registerQueue;
        var ucmID = q[0];
        var newData = data.shift();
        Queue.findOneAndUpdate({ crn : req.body.crn }, {registerQueue : newData}, function(err, qu){

        })
      })
      res.json(c);
  });
});

app.post('/api/incClass', function(req,res){
  Class.findOneAndUpdate({ crn : req.body.crn}, { $inc: { actEnroll: 1, seatsAvail: -1} }, function(err, c){

      res.json(c);
  });
});

};
