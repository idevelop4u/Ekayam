const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'helper'], default: 'user' },
  digitalCredits: { type: Number, default: 0 },
  socialScore: { type: Number, default: 5.0 },
  trustMeter: { type: Number, default: 100 },
  preferredHelpers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);