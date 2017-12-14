var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ucmClass = require('./ucmClass');
var userSchedule = require('./schedule')

//define class class
var userModel = new schema({
  ucmID: {
    type: Number
  },
  email: {
    type: String
  },
  password: {
    type: String
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
  savedClasses: {
    type: [ucmClass.schema]
  },
  registeredClasses: {
    type: [ucmClass.schema]
  },
  savedSchedules : {
    type: [userSchedule.schema]
  }
});

module.exports = mongoose.model('User', userModel);
