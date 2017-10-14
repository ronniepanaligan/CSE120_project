var mongoose = require('mongoose');
var schema = mongoose.Schema;

//define class class
var classModel = new schema({
  classId:{
    type: String,
    index: { unique: true}
  },
  title: {
    type: String
  },
  professor: {
    type: String
  },
  semester: {
    type: String
  },
  capacity: {
    type: String
  }
});

module.exports = mongoose.model('Class', classModel);
