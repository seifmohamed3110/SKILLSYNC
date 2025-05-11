const KeywordResumeAnalyzer = require('../services/analyzers/KeywordResumeAnalyzer');
const AIResumeAnalyzer = require('../services/analyzers/AIResumeAnalyzer');

class ResumeAnalyzerFactory {
  static getAnalyzer(subscriptionType) {
    if (subscriptionType === 'premium') {
      return new AIResumeAnalyzer();
    } else {
      return new KeywordResumeAnalyzer();
    }
  }
}

module.exports = ResumeAnalyzerFactory;
