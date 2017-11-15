var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ucmClass = require('./ucmClass');

//define class class
var scheduleModel = new schema({
  semester: {
    type: Number
  },
  name: {
    type: String
  },
  classSchedule: {
    type: [ucmClass.schema]
  }
});

module.exports = mongoose.model('schedule', scheduleModel);
