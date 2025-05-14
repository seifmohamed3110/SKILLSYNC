const User = require('../models/User');
const Progress = require('../models/Progress');
const roadmaps = require('../data/roadmaps');

// Get all users who requested mentorship (mock condition: role is student and has requestedMentor=true)
exports.getMentorRequests = async (req, res) => {
  try {
    const requests = await User.find({ role: 'student', requestedMentor: true });
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err.message });
  }
};

// Approve mentorship for a user
exports.approveMentorship = async (req, res) => {
  const { studentId } = req.body;
  try {
    const student = await User.findByIdAndUpdate(studentId, { isApprovedByMentor: true }, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json({ message: 'Mentorship approved', student });
  } catch (err) {
    res.status(500).json({ message: 'Approval failed', error: err.message });
  }
};

// Update roadmap for a student
exports.updateUserRoadmap = async (req, res) => {
  const { studentId, newRoadmap } = req.body;
  try {
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    roadmaps[student.career] = newRoadmap;

    res.json({ message: 'Roadmap updated for career: ' + student.career });
  } catch (err) {
    res.status(500).json({ message: 'Roadmap update failed', error: err.message });
  }
};
