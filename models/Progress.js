const mongoose = require('mongoose');
const { Schema } = mongoose;

const progressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  completedSteps: [{ type: String }], // Step names
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', progressSchema);
