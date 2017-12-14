var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ucmClass = require('./ucmClass');
var userSchedule = require('./schedule')

//define class class
var userModel = new schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  ucmID: {
    type: Number
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  major: {
    type: String
  },
  registrationTime: {
    type: Date
  },
  registeredClasses: {
    type: [ucmClass.schema]
  },
  savedClasses: [ucmClass.schema],
  savedSchedules : {
    type: [userSchedule.schema]
  },
  inQueue: {
    type: [Number]
  }
});

module.exports = mongoose.model('User', userModel);
