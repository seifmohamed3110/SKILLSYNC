const mongoose = require('mongoose');
const { Schema } = mongoose;

const assessmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [String],
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
