const Progress = require('../models/Progress');
const roadmaps = require('../data/roadmaps');
const User = require('../models/User');

// ✅ Update progress (merge new steps with existing ones)
exports.updateProgress = async (req, res) => {
  const userId = req.user.id;
  const { completedSteps } = req.body;

  try {
    let progress = await Progress.findOne({ user: userId });

    if (!progress) {
      progress = new Progress({ user: userId, completedSteps });
    } else {
      const allSteps = new Set([...progress.completedSteps, ...completedSteps]);
      progress.completedSteps = Array.from(allSteps);
      progress.updatedAt = Date.now();
    }

    await progress.save();
    res.json({ message: 'Progress updated successfully', progress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update progress', error: error.message });
  }
};

// ✅ Get current progress & visual status
exports.getProgress = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user?.career) {
      return res.status(400).json({ message: 'User has not selected a career yet' });
    }

    const roadmap = roadmaps[user.career];
    const progress = await Progress.findOne({ user: userId });
    const completed = progress?.completedSteps || [];

    const status = roadmap.map(step => ({
      step,
      completed: completed.includes(step)
    }));

    res.json({
      career: user.career,
      totalSteps: roadmap.length,
      completedSteps: completed.length,
      progressPercentage: Math.round((completed.length / roadmap.length) * 100),
      status
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch progress', error: error.message });
  }
};
