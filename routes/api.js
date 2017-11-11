var express = require('express');
var classRouter = express.Router();
var Class = require('../models/ucmClass');
var User = require('../models/user');

module.exports = function(app) {
  app.get('/api/classes', function(req, res) {
    Class.find(function(err, classes) {
      if(err)
        res.send(err);
      res.json(classes);
    });
  });

  app.post('/api/classes', function(req, res) {
    Class.create({
      title : req.body.title
    }, function(err, classs) {
      if(err)
        res.send(err);
      Class.find(function(err, classes) {
        if(err)
          res.send(err);
        res.json(classes);
      });
    });
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
};
