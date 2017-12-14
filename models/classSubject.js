var mongoose = require('mongoose');
var schema = mongoose.Schema;

//This will contain all of the subjects
var subjectModel = new schema({
  title: {
    type: String
  },
  subCode: {
    type: String
  },
  openClasses: {
    type: Boolean
  },
});

module.exports = mongoose.model('subject', subjectModel);
