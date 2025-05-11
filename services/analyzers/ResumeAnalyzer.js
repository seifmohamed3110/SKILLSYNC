class ResumeAnalyzer {
    analyze(resumeContent) {
      throw new Error("analyze() must be implemented by subclass");
    }
  }
  
  module.exports = ResumeAnalyzer;
  