var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new mongoose.Schema({
  _qid: { type: Number , ref: 'Question'},
  aid : Number,
  answer: String,
  count: { type: Number, default: 0 }
},{
  versionKey: false
});

module.exports = mongoose.model('Answer', answerSchema);
