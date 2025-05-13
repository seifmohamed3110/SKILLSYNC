const authService = require('../services/AuthService'); 

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Call Singleton Service login()
    const { user, token } = await authService.login({ email, password });
    
    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await authService.register({ name, email, password, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const admin = require('../config/firebase');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.firebaseLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    // 1. Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, name, email } = decodedToken;

    // 2. Check if user already exists in MongoDB
    let user = await User.findOne({ email });
    if (!user) {
      // Create new user (default free subscription)
      user = new User({
        name: name || "Firebase User",
        email,
        password: 'firebase', // Dummy password
        subscription: 'free',
        role: 'student',
      });
      await user.save();
    }

    // 3. Issue JWT for backend auth
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(401).json({ message: 'Firebase login failed', error: error.message });
  }
};

