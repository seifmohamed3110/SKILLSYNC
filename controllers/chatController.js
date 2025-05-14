const ChatRequest = require('../models/ChatRequest');
const User = require('../models/User');

exports.requestChat = async (req, res) => {
  const userId = req.user.id;  // The ID of the logged-in user
  const { message } = req.body;

  // Check if the message exists in the request body
  if (!message || message.trim() === '') {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Allow only 1 free trial for free users
    const existing = await ChatRequest.find({ user: userId });
    if (user.subscription === 'free' && existing.length >= 1) {
      return res.status(403).json({ message: 'Free users can only request 1 chat as trial' });
    }

    // Create and save the new chat request
    const newRequest = new ChatRequest({ user: userId, message });
    await newRequest.save();

    res.status(201).json({ message: 'Chat request sent successfully' });
  } catch (err) {
    // Catch any unexpected errors and respond with status 500
    res.status(500).json({ message: 'Failed to send chat request', error: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    // Fetch all chat requests and populate the user field with name and email
    const requests = await ChatRequest.find().populate('user', 'name email');
    res.status(200).json(requests);
  } catch (err) {
    // If there is an error while fetching requests, respond with a 500 status
    res.status(500).json({ message: 'Error fetching chat requests', error: err.message });
  }
};
