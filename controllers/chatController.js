const ChatRequest = require('../models/ChatRequest');
const User = require('../models/User');

exports.requestChat = async (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;

  try {
    const user = await User.findById(userId);

    // Allow only 1 free trial for free users
    const existing = await ChatRequest.find({ user: userId });
    if (user.subscription === 'free' && existing.length >= 1) {
      return res.status(403).json({ message: 'Free users can only request 1 chat as trial' });
    }

    const newRequest = new ChatRequest({ user: userId, message });
    await newRequest.save();

    res.json({ message: 'Chat request sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send chat request', error: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ChatRequest.find().populate('user', 'name email');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching chat requests', error: err.message });
  }
};
