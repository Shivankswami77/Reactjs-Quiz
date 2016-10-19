var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var questionSchema = new mongoose.Schema({
  _id: { type: Number},
  question: String,
  answered: { type: Number, default: 0 },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ]
},{
  versionKey: false
}
);

module.exports = mongoose.model('Question', questionSchema);
