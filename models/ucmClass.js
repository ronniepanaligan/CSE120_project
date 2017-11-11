var mongoose = require('mongoose');
var schema = mongoose.Schema;
var user = require('./user');

//define class class
var classModel = new schema({
  crn: {
    type: Number
  },
  courseNum: {
    type: String
  },
  courseTitle: {
    type: String
  },
  units: {
    type: Number
  },
  actv: {
    type: String
  },
  time: {
    type: String
  },
  room: {
    type: String
  },
  startEnd: {
    type: String
  },
  instructor: {
    type: String
  },
  maxEnroll: {
    type: Number
  },
  actEnroll: {
    type: Number
  },
  seatsAvail: {
    type: Number
  },
  queue: {
    type: [user.schema]
  }
});

module.exports = mongoose.model('Class', classModel);
