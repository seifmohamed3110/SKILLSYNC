const User = require('../models/User');
const Resume = require('../models/Resume'); // if you have one

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

exports.getSystemStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: 'student' });
    const mentors = await User.countDocuments({ role: 'mentor' });
    const admins = await User.countDocuments({ role: 'admin' });
    const resumes = await Resume.countDocuments();

    res.json({ totalUsers, students, mentors, admins, resumes });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats', error: err.message });
  }
};
