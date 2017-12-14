var mongoose = require('mongoose');
var schema = mongoose.Schema;
var user = require('./user');

//define class class
var classQueueModel = new schema({
  crn: {
    type: Number
  },
  capacity: {
    type: Number
  },
  actual: {
    type: Number
  },
  isFull:{
    type: Boolean,
    default: false
  },
  registerQueue: {
    type: [Number]
  }
});

module.exports = mongoose.model('ClassQueue', classQueueModel);
