var mongoose = require('mongoose');
var schema = mongoose.Schema;
var user = require('./user');

//define class class
var classModel = new schema({
  crn: {
    type: Number
  },
  subject: {
    type: String
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
  days: {
    type: String
  },
  startTime: {
    time: String,
    values: Number
  },
  endTime: {
    time: String,
    values: Number
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
  }
});

module.exports = mongoose.model('Class', classModel);
