const mongoose = require('mongoose');
const { Schema } = mongoose;

const careerSuggestionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  suggestedCareers: [String],
  basedOnAssessment: { type: Schema.Types.ObjectId, ref: 'Assessment' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CareerSuggestion', careerSuggestionSchema);
