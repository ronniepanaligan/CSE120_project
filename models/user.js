var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ucmClass = require('./ucmClass');

//define class class
var userModel = new schema({
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
  }
});

module.exports = mongoose.model('User', userModel);
