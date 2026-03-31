const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');




const userSchema = new mongoose.Schema({
  // --- Fields from your Register.tsx ---
  
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  // Consolidating phone fields to prevent E11000 null errors
  phoneNumber: {
    type: String,
    sparse: true, // Allows multiple nulls if user doesn't provide phone initially
    trim: true,
  },
  // Field for Aadhar collected in your form
  aadharNumber: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  // Mapped from your 'User'/'Helper' tabs
  rolePreference: {
    type: String,
    enum: ['requester', 'helper'],
    default: 'requester',
  },

  // --- CommunityConnect Core Features ---
  
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  digitalCredits: {
    type: Number,
    default: 0
  },
  socialScore: {
    type: Number,
    default: 5.0
  },
  trustMeter: {
    type: Number,
    default: 100
  },
  preferredHelpers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Profile Information
  profilePhoto: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  
  // Verification Status
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  idVerified: {
    type: Boolean,
    default: false,
  },
  verificationMethod: {
    type: String,
    enum: ['none', 'phone', 'aadhar', 'college_id'],
    default: 'none',
  },

  // Stats & Gamification
  points: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  certificateLevel: {
    type: String,
    enum: ['none', 'bronze', 'silver', 'gold', 'platinum'],
    default: 'none',
  },
  tasksCompleted: {
    type: Number,
    default: 0,
  },
  tasksHelped: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },

  // System fields
  lastActiveAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

// Middleware to hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compareSync(candidatePassword, this.password);
};

// Method to get public profile (matches your controller calls)
userSchema.methods.toPublicProfile = function () {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
    profilePhoto: this.profilePhoto,
    points: this.points,
    level: this.level,
    certificateLevel: this.certificateLevel,
    averageRating: this.averageRating,
    trustMeter: this.trustMeter,
    idVerified: this.idVerified,
  };
};

module.exports = mongoose.model('User', userSchema);