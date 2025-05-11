const ResumeAnalyzer = require('./ResumeAnalyzer');

class KeywordResumeAnalyzer extends ResumeAnalyzer {
  analyze(content) {
    const keywords = ['teamwork', 'communication', 'problem-solving'];
    let score = 0;

    keywords.forEach(keyword => {
      if (content.toLowerCase().includes(keyword)) {
        score += 10;
      }
    });

    return { score, method: 'keyword' };
  }
}

module.exports = KeywordResumeAnalyzer;
