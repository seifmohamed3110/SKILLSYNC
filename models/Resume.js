const mongoose = require('mongoose');
const { Schema } = mongoose;

const resumeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, required: true }, // link to stored resume
  analyzed: { type: Boolean, default: false },
  analysisResult: { type: Object }, // can store keyword match or AI insights
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
