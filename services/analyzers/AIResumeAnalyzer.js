const ResumeAnalyzer = require('./ResumeAnalyzer');

class AIResumeAnalyzer extends ResumeAnalyzer {
  analyze(content) {
    // Placeholder for real AI logic
    const score = Math.floor(Math.random() * 100);  // Simulated AI scoring
    return { score, method: 'ai' };
  }
}

module.exports = AIResumeAnalyzer;
