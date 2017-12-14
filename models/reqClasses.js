var mongoose = require('mongoose');
var schema = mongoose.Schema;
var ucmClass = require('./ucmClass');

//define class for classes required to also register for
var reqClassModel = new schema({
  crn: {
    type: Number
  },
  labs: {
    type: [ucmClass.schema]
  }
});

module.exports = mongoose.model('ReqClass', reqClassModel);
