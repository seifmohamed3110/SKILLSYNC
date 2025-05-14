const Assessment = require('../models/Assessment');  // Ensure this import is added

// Function to submit an assessment
exports.submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.id;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'Answers are required' });
    }

    // New structured scoring logic
    const totalScore = answers.reduce((sum, item) => sum + item.score, 0);

    const assessment = new Assessment({
      user: userId,
      answers,
      totalScore
    });

    await assessment.save();

    res.status(201).json({
      message: 'Assessment submitted successfully',
      totalScore,
      assessment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit assessment', error: error.message });
  }
};

// Function to get the assessment history
exports.getAssessmentHistory = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the request

    // Fetch assessments for the current user
    const assessments = await Assessment.find({ user: userId });

    if (!assessments || assessments.length === 0) {
      return res.status(404).json({ message: 'No assessments found for this user' });
    }

    // Return the assessment history
    res.status(200).json({
      message: 'Assessment history retrieved successfully',
      assessments
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve assessment history', error: error.message });
  }
};
