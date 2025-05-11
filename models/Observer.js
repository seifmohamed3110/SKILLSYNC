const mongoose = require('mongoose');

const observerSchema = new mongoose.Schema({
  name: String,
  email: String,
  type: String // e.g., 'email', 'sms'
}, {
  timestamps: true
});

const Observer = mongoose.model('Observer', observerSchema);

module.exports = Observer;
