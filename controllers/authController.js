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
  const { name, email, password, subscription, role } = req.body;

  try {
    // Call Singleton Service register()
    const user = await authService.register({ name, email, password, subscription, role });
    
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
