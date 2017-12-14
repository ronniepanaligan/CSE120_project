var mongoose = require('mongoose');
var schema = mongoose.Schema;

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
