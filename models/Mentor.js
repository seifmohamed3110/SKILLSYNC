const User = require('./User');
const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  // Add mentor-specific fields here
});

const Mentor = User.discriminator('Mentor', mentorSchema);

module.exports = Mentor;
