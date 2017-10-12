var express = require('express');
var classRouter = express.Router();
var Class = require('../models/class');

classRouter.route('/classes')
  //create new class route
  .post(function(req, res){
    var newClass = new Class(req.body);
    newClass.save(function(err){
      if(err)
        res.send(err);
      res.json({ message: 'create' });
    });
    console.log(newClass);
  })

  //get all classes route
  .get(function(req, res){
    Class.find(function(err, classes){
      if(err)
        res.send(err);
      res.json(classes);
    });
  });

classRouter.route('/classes/:class_id')
  //get class by id route
  .get(function(req, res){
    Class.findById({
      _id: req.params.class_id
    }, function(err, c){
      if(err)
        res.send(err);
      res.json(c);
    });
  })

  //delete class by id route
  .delete(function(req, res){
    Class.remove({
      _id: req.params.class_id
    }, function(err, c){
      if(err)
        res.send(err);
      res.json({ message: 'deleted'});
    });
  });

module.exports = classRouter;
