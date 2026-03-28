const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Temporary storage for OTPs (In production, use Redis)
const otpStore = {};

// 1. Request OTP
router.post('/request-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) return res.status(400).json({ message: "Phone number required" });

  // Generate a random 4-digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[phoneNumber] = otp;

  // LOG TO CONSOLE (Since we don't have an SMS gateway like Twilio yet)
  console.log(`[AUTH] OTP for ${phoneNumber} is: ${otp}`);

  res.status(200).json({ message: "OTP sent successfully (Check server console)" });
});

// 2. Verify OTP & Login/Register
router.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp, name, role } = req.body;

  // Check if OTP matches
  if (otpStore[phoneNumber] !== otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  try {
    // Check if user exists, or create new one (Registration)
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      if (!name) return res.status(400).json({ message: "Name required for new users" });
      user = new User({ name, phoneNumber, role });
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    delete otpStore[phoneNumber]; // Clear OTP after use
    res.status(200).json({ token, role: user.role, user });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;