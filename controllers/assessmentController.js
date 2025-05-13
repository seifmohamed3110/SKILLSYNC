const Assessment = require('../models/Assessment');

exports.submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.id;

    // Fake scoring logic (just counts 'yes' answers)
    const score = answers.filter(ans => ans.toLowerCase() === 'yes').length;

    const assessment = new Assessment({
      user: userId,
      answers,
      score
    });

    await assessment.save();
    res.status(201).json({ message: 'Assessment submitted', score });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit assessment', error: error.message });
  }
};

exports.getAssessmentHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await Assessment.find({ user: userId });
    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch history', error: error.message });
  }
};
