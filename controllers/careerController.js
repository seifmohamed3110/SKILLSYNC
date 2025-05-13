const careerMap = require('../data/careerMapping');
const Assessment = require('../models/Assessment');

exports.suggestCareers = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get user's latest assessment
    const assessment = await Assessment.findOne({ user: userId }).sort({ createdAt: -1 });

    if (!assessment) {
      return res.status(404).json({ message: 'No assessment data found' });
    }

    const answers = assessment.answers.map(ans => ans.toLowerCase());
    const skills = [...new Set(answers)]; // Remove duplicates

    const matchedCareers = new Set();

    // 2. Match skills to careers
    skills.forEach(skill => {
      if (careerMap[skill]) {
        careerMap[skill].forEach(career => matchedCareers.add(career));
      }
    });

    res.json({
      suggestedCareers: Array.from(matchedCareers)
    });

  } catch (error) {
    res.status(500).json({ message: 'Error suggesting careers', error: error.message });
  }
};
