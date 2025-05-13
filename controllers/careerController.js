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

const User = require('../models/User');
const roadmaps = require('../data/roadmaps');

exports.selectCareer = async (req, res) => {
  try {
    const { career } = req.body;
    const userId = req.user.id;

    const roadmapExists = roadmaps[career];
    if (!roadmapExists) return res.status(400).json({ message: 'Invalid career selected' });

    await User.findByIdAndUpdate(userId, { career });

    res.json({ message: 'Career selected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving career', error: error.message });
  }
};

exports.getRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user?.career) return res.status(404).json({ message: 'No career selected yet' });

    const roadmap = roadmaps[user.career];
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });

    res.json({ career: user.career, roadmap });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roadmap', error: error.message });
  }
};

const courseList = require('../data/careerCourses');

exports.getCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user?.career) return res.status(400).json({ message: 'No career selected' });

    const courses = courseList[user.career];
    if (!courses) return res.status(404).json({ message: 'No courses available for this career yet' });

    res.json({ career: user.career, courses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
};
