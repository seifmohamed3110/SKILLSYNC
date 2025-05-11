const User = require('./User');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Add student-specific fields here
});

const Student = User.discriminator('Student', studentSchema);

module.exports = Student;
