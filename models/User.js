const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: { type: String, enum: ['free', 'premium'], default: 'free' },
  role: { type: String, enum: ['student', 'mentor', 'admin'], default: 'student' }, // ✅ this line is required
  observer: [{ type: Schema.Types.ObjectId, ref: 'Observer' }]
}, {
  discriminatorKey: 'role',
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
