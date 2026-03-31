// // // const jwt = require('jsonwebtoken');
// // // const { v4: uuidv4 } = require('uuid');
// // // const User = require('../models/User');
// // // const OTP = require('../models/OTP');

// // // // Generate JWT token
// // // const generateToken = (userId, expiresIn = '1d') => {
// // //   return jwt.sign(
// // //     { userId },
// // //     process.env.JWT_SECRET || 'fallback_secret',
// // //     { expiresIn }
// // //   );
// // // };

// // // // Generate refresh token
// // // const generateRefreshToken = (userId) => {
// // //   return jwt.sign(
// // //     { userId, type: 'refresh' },
// // //     process.env.JWT_REFRESH_SECRET || 'refresh_fallback_secret',
// // //     { expiresIn: '7d' }
// // //   );
// // // };

// // // // Signup with email/password
// // // const signup = async (req, res) => {
// // //   try {
// // //     const { email, password, username, phone } = req.body;

// // //     // Validate input
// // //     if (!email || !password || !username) {
// // //       return res.status(400).json({ message: 'Email, password, and username are required' });
// // //     }

// // //     // Check if user already exists
// // //     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
// // //     if (existingUser) {
// // //       return res.status(400).json({ message: 'User with this email or username already exists' });
// // //     }

// // //     // Create new user
// // //     const newUser = new User({
// // //       email,
// // //       username,
// // //       password,
// // //       phone,
// // //       referralCode: uuidv4().substring(0, 8).toUpperCase(),
// // //     });
// // //     await newUser.save();

// // //     // Generate tokens
// // //     const token = generateToken(newUser._id);
// // //     const refreshToken = generateRefreshToken(newUser._id);

// // //     res.status(201).json({
// // //       message: 'User registered successfully',
// // //       token,
// // //       refreshToken,
// // //       user: {
// // //         id: newUser._id,
// // //         email: newUser.email,
// // //         username: newUser.username,
// // //         phone: newUser.phone,
// // //         rolePreference: newUser.rolePreference,
// // //         points: newUser.points,
// // //         level: newUser.level,
// // //       }
// // //     });
// // //   } catch (error) {
// // //     console.error('Signup error:', error);
// // //     res.status(500).json({ message: 'Server error during signup' });
// // //   }
// // // };

// // // // Login with email/password
// // // const login = async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;

// // //     if (!email || !password) {
// // //       return res.status(400).json({ message: 'Email and password are required' });
// // //     }

// // //     const user = await User.findOne({ email });
// // //     if (!user) {
// // //       return res.status(400).json({ message: 'Invalid credentials' });
// // //     }

// // //     if (user.isGuest) {
// // //       return res.status(400).json({ message: 'Guest accounts cannot login with password' });
// // //     }

// // //     const isMatch = user.comparePassword(password);
// // //     if (!isMatch) {
// // //       return res.status(400).json({ message: 'Invalid credentials' });
// // //     }

// // //     // Update last active
// // //     user.lastActiveAt = new Date();
// // //     await user.save();

// // //     const token = generateToken(user._id);
// // //     const refreshToken = generateRefreshToken(user._id);

// // //     res.status(200).json({
// // //       message: 'Login successful',
// // //       token,
// // //       refreshToken,
// // //       user: {
// // //         id: user._id,
// // //         email: user.email,
// // //         username: user.username,
// // //         phone: user.phone,
// // //         phoneVerified: user.phoneVerified,
// // //         profilePhoto: user.profilePhoto,
// // //         rolePreference: user.rolePreference,
// // //         points: user.points,
// // //         level: user.level,
// // //         certificateLevel: user.certificateLevel,
// // //       }
// // //     });
// // //   } catch (error) {
// // //     console.error('Login error:', error);
// // //     res.status(500).json({ message: 'Server error during login' });
// // //   }
// // // };

// // // // Send OTP for phone verification
// // // // const sendPhoneOTP = async (req, res) => {
// // // //   try {
// // // //     const { phone, phoneNumber } = req.body;
// // // //     const targetPhone = phone || phoneNumber;
// // // //     const userId = req.user?._id;

// // // //     if (!targetPhone) {
// // // //       return res.status(400).json({ message: 'Phone number is required' });
// // // //     }

// // // //     // Validate phone format (basic validation)
// // // //     const phoneRegex = /^\+?[1-9]\d{9,14}$/;
// // // //     if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
// // // //       return res.status(400).json({ message: 'Invalid phone number format' });
// // // //     }

// // // //     // Create OTP
// // // //     const { otp, expiresAt } = await OTP.createOTP({
// // // //       user: userId,
// // // //       phone: targetPhone,
// // // //       type: 'phone_verification',
// // // //       expiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES) || 10,
// // // //     });

// // // //     // In production, send OTP via SMS service
// // // //     // For development, return OTP in response
// // // //     const isDevelopment = process.env.NODE_ENV !== 'production';

// // // //     res.status(200).json({
// // // //       message: 'OTP sent successfully',
// // // //       phone: targetPhone,
// // // //       expiresAt,
// // // //       ...(isDevelopment && { otp }), // Only include OTP in dev mode
// // // //     });
// // // //   } catch (error) {
// // // //     console.error('Send OTP error:', error);
// // // //     res.status(500).json({ message: 'Failed to send OTP' });
// // // //   }
// // // // };

// // // const sendPhoneOTP = async (req, res) => {
// // //   try {
// // //     const { phone } = req.body;

// // //     if (!phone) {
// // //       return res.status(400).json({ message: 'Phone number is required' });
// // //     }

// // //     // Use the static method from your OTP model to generate and save the code
// // //     // This method handles expiring old OTPs automatically
// // //     const { otp, expiresAt } = await OTP.createOTP({ 
// // //       phone, 
// // //       type: 'phone_verification' 
// // //     });

// // //     // ============================================================
// // //     // DEBUG: SHOW OTP IN TERMINAL
// // //     // ============================================================
// // //     console.log('------------------------------------------');
// // //     console.log(`[AUTH] Verification code for ${phone}: ${otp}`);
// // //     console.log(`[AUTH] Expires at: ${expiresAt}`);
// // //     console.log('------------------------------------------');

// // //     // In production, you would call your SMS provider here:
// // //     // await smsProvider.send(phone, `Your code is ${otp}`);

// // //     res.status(200).json({
// // //       message: 'OTP sent successfully',
// // //       // We send the OTP in the response body ONLY during early development 
// // //       // so you can verify it without checking the terminal if needed.
// // //       // Remove 'otp' from this JSON before moving to production.
// // //       otp: process.env.NODE_ENV === 'development' ? otp : undefined 
// // //     });
// // //   } catch (error) {
// // //     console.error('Send OTP error:', error);
// // //     res.status(500).json({ message: 'Failed to send OTP' });
// // //   }
// // // };

// // // // Verify phone OTP
// // // const verifyPhoneOTP = async (req, res) => {
// // //   try {
// // //     const { phone, phoneNumber, otp, name, role } = req.body;
// // //     const targetPhone = phone || phoneNumber;
// // //     const userId = req.user?._id;

// // //     if (!targetPhone || !otp) {
// // //       return res.status(400).json({ message: 'Phone and OTP are required' });
// // //     }

// // //     // Find the OTP document
// // //     const otpDoc = await OTP.findOne({
// // //       phone: targetPhone,
// // //       type: 'phone_verification',
// // //       verified: false,
// // //     }).sort({ createdAt: -1 });

// // //     if (!otpDoc) {
// // //       return res.status(400).json({ message: 'No pending OTP found for this phone' });
// // //     }

// // //     // Verify OTP
// // //     const result = otpDoc.verify(otp);
// // //     await otpDoc.save();

// // //     if (!result.valid) {
// // //       return res.status(400).json({
// // //         message: result.error,
// // //         attemptsRemaining: result.attemptsRemaining,
// // //       });
// // //     }

// // //     // Update user if authenticated or create new if registration
// // //     let user;
// // //     if (userId) {
// // //       user = await User.findById(userId);
// // //       if (user) {
// // //         user.phone = targetPhone;
// // //         user.phoneNumber = targetPhone; // Sync both fields
// // //         user.phoneVerified = true;
// // //         if (user.verificationMethod === 'none') {
// // //           user.verificationMethod = 'phone';
// // //         }
// // //         await user.save();
// // //       }
// // //     } else {
// // //       // Prototype-like registration logic
// // //       user = await User.findOne({ phoneNumber: targetPhone });
// // //       if (!user) {
// // //         // Create new user for registration
// // //         user = new User({
// // //           name: name || 'User',
// // //           phoneNumber: targetPhone,
// // //           phone: targetPhone,
// // //           rolePreference: role || 'requester',
// // //           phoneVerified: true,
// // //           verificationMethod: 'phone',
// // //         });
// // //         await user.save();
// // //       } else {
// // //         // User exists, just log them in
// // //         user.phoneVerified = true;
// // //         await user.save();
// // //       }
// // //     }

// // //     const token = generateToken(user._id);
// // //     const refreshToken = generateRefreshToken(user._id);

// // //     res.status(200).json({
// // //       message: 'Phone verified successfully',
// // //       verified: true,
// // //       token,
// // //       refreshToken,
// // //       user: user.toPublicProfile ? user.toPublicProfile() : user
// // //     });
// // //   } catch (error) {
// // //     console.error('Verify OTP error:', error);
// // //     res.status(500).json({ message: 'Failed to verify OTP' });
// // //   }
// // // };

// // // // Guest login - create anonymous user
// // // const guestLogin = async (req, res) => {
// // //   try {
// // //     // Generate guest username
// // //     const guestId = uuidv4().substring(0, 8);
// // //     const username = `guest_${guestId}`;
// // //     const email = `guest_${guestId}@guest.local`;

// // //     // Create guest user
// // //     const guestUser = new User({
// // //       email,
// // //       username,
// // //       isGuest: true,
// // //       rolePreference: 'requester', // Guests can only view, not help
// // //     });
// // //     await guestUser.save();

// // //     const token = generateToken(guestUser._id, '24h'); // Shorter expiry for guests

// // //     res.status(201).json({
// // //       message: 'Guest session created',
// // //       token,
// // //       user: {
// // //         id: guestUser._id,
// // //         username: guestUser.username,
// // //         isGuest: true,
// // //         rolePreference: guestUser.rolePreference,
// // //       },
// // //       notice: 'Guest accounts have limited features. Register to unlock full functionality.',
// // //     });
// // //   } catch (error) {
// // //     console.error('Guest login error:', error);
// // //     res.status(500).json({ message: 'Failed to create guest session' });
// // //   }
// // // };

// // // // Refresh access token
// // // const refreshToken = async (req, res) => {
// // //   try {
// // //     const { refreshToken: token } = req.body;

// // //     if (!token) {
// // //       return res.status(400).json({ message: 'Refresh token is required' });
// // //     }

// // //     // Verify refresh token
// // //     const decoded = jwt.verify(
// // //       token,
// // //       process.env.JWT_REFRESH_SECRET || 'refresh_fallback_secret'
// // //     );

// // //     if (decoded.type !== 'refresh') {
// // //       return res.status(400).json({ message: 'Invalid token type' });
// // //     }

// // //     // Check if user still exists
// // //     const user = await User.findById(decoded.userId);
// // //     if (!user) {
// // //       return res.status(401).json({ message: 'User not found' });
// // //     }

// // //     // Generate new tokens
// // //     const newAccessToken = generateToken(user._id);
// // //     const newRefreshToken = generateRefreshToken(user._id);

// // //     res.status(200).json({
// // //       token: newAccessToken,
// // //       refreshToken: newRefreshToken,
// // //     });
// // //   } catch (error) {
// // //     if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
// // //       return res.status(401).json({ message: 'Invalid or expired refresh token' });
// // //     }
// // //     console.error('Refresh token error:', error);
// // //     res.status(500).json({ message: 'Failed to refresh token' });
// // //   }
// // // };

// // // // Google OAuth login/signup
// // // const googleAuth = async (req, res) => {
// // //   try {
// // //     const { idToken, email, name, googleId, profilePhoto } = req.body;

// // //     if (!googleId || !email) {
// // //       return res.status(400).json({ message: 'Google ID and email are required' });
// // //     }

// // //     // Find or create user
// // //     let user = await User.findOne({ $or: [{ googleId }, { email }] });

// // //     if (user) {
// // //       // Update Google ID if not set
// // //       if (!user.googleId) {
// // //         user.googleId = googleId;
// // //       }
// // //       user.lastActiveAt = new Date();
// // //       await user.save();
// // //     } else {
// // //       // Create new user
// // //       const username = email.split('@')[0] + '_' + uuidv4().substring(0, 4);
// // //       user = new User({
// // //         email,
// // //         username,
// // //         googleId,
// // //         profilePhoto,
// // //         referralCode: uuidv4().substring(0, 8).toUpperCase(),
// // //       });
// // //       await user.save();
// // //     }

// // //     const token = generateToken(user._id);
// // //     const refreshTokenValue = generateRefreshToken(user._id);

// // //     res.status(200).json({
// // //       message: user.createdAt === user.updatedAt ? 'Account created' : 'Login successful',
// // //       token,
// // //       refreshToken: refreshTokenValue,
// // //       user: {
// // //         id: user._id,
// // //         email: user.email,
// // //         username: user.username,
// // //         profilePhoto: user.profilePhoto,
// // //         points: user.points,
// // //         level: user.level,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error('Google auth error:', error);
// // //     res.status(500).json({ message: 'Google authentication failed' });
// // //   }
// // // };

// // // // Apple OAuth login/signup
// // // const appleAuth = async (req, res) => {
// // //   try {
// // //     const { idToken, email, name, appleId } = req.body;

// // //     if (!appleId) {
// // //       return res.status(400).json({ message: 'Apple ID is required' });
// // //     }

// // //     // Find or create user
// // //     let user = await User.findOne({ appleId });

// // //     if (!user && email) {
// // //       user = await User.findOne({ email });
// // //     }

// // //     if (user) {
// // //       if (!user.appleId) {
// // //         user.appleId = appleId;
// // //       }
// // //       user.lastActiveAt = new Date();
// // //       await user.save();
// // //     } else {
// // //       // Create new user
// // //       const username = (email ? email.split('@')[0] : 'apple_user') + '_' + uuidv4().substring(0, 4);
// // //       user = new User({
// // //         email: email || `apple_${appleId.substring(0, 8)}@apple.local`,
// // //         username,
// // //         appleId,
// // //         referralCode: uuidv4().substring(0, 8).toUpperCase(),
// // //       });
// // //       await user.save();
// // //     }

// // //     const token = generateToken(user._id);
// // //     const refreshTokenValue = generateRefreshToken(user._id);

// // //     res.status(200).json({
// // //       message: 'Apple authentication successful',
// // //       token,
// // //       refreshToken: refreshTokenValue,
// // //       user: {
// // //         id: user._id,
// // //         email: user.email,
// // //         username: user.username,
// // //         points: user.points,
// // //         level: user.level,
// // //       },
// // //     });
// // //   } catch (error) {
// // //     console.error('Apple auth error:', error);
// // //     res.status(500).json({ message: 'Apple authentication failed' });
// // //   }
// // // };

// // // // Logout (for future token blacklisting)
// // // const logout = async (req, res) => {
// // //   try {
// // //     // In a production app, you might want to:
// // //     // 1. Add the token to a blacklist
// // //     // 2. Clear refresh token from database
// // //     // For now, just return success (client should clear tokens)

// // //     res.status(200).json({ message: 'Logged out successfully' });
// // //   } catch (error) {
// // //     console.error('Logout error:', error);
// // //     res.status(500).json({ message: 'Logout failed' });
// // //   }
// // // };

// // // module.exports = {
// // //   signup,
// // //   login,
// // //   sendPhoneOTP,
// // //   verifyPhoneOTP,
// // //   guestLogin,
// // //   refreshToken,
// // //   googleAuth,
// // //   appleAuth,
// // //   logout,
// // // };

// // const jwt = require('jsonwebtoken');
// // const { v4: uuidv4 } = require('uuid');
// // const User = require('../models/User');
// // const OTP = require('../models/OTP');

// // // Generate JWT token
// // const generateToken = (userId, expiresIn = '1d') => {
// //   return jwt.sign(
// //     { userId },
// //     process.env.JWT_SECRET || 'fallback_secret',
// //     { expiresIn }
// //   );
// // };

// // // Generate refresh token
// // const generateRefreshToken = (userId) => {
// //   return jwt.sign(
// //     { userId, type: 'refresh' },
// //     process.env.JWT_REFRESH_SECRET || 'refresh_fallback_secret',
// //     { expiresIn: '7d' }
// //   );
// // };

// // // Signup with email/password
// // const signup = async (req, res) => {
// //   try {
// //     const { email, password, username, phone, name, rolePreference } = req.body;

// //     // Validate input
// //     if (!email || !password || !username) {
// //       return res.status(400).json({ message: 'Email, password, and username are required' });
// //     }

// //     // Check if user already exists
// //     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'User with this email or username already exists' });
// //     }

// //     // Create new user
// //     const newUser = new User({
// //       email,
// //       username,
// //       password,
// //       phone,
// //       name,
// //       rolePreference: rolePreference || 'requester',
// //       referralCode: uuidv4().substring(0, 8).toUpperCase(),
// //     });
// //     await newUser.save();

// //     // GENERATE OTP FOR IMMEDIATE VERIFICATION
// //     const { otp } = await OTP.createOTP({ 
// //       phone: phone, 
// //       type: 'phone_verification',
// //       user: newUser._id 
// //     });

// //     // DEBUG: LOG OTP TO TERMINAL
// //     console.log('\n==========================================');
// //     console.log('       COMMUNITY CONNECT DEBUG OTP        ');
// //     console.log(`   NEW USER: ${username} (${phone})`);
// //     console.log(`   VERIFICATION CODE: ${otp}`);
// //     console.log('==========================================\n');

// //     // Generate tokens
// //     const token = generateToken(newUser._id);
// //     const refreshToken = generateRefreshToken(newUser._id);

// //     res.status(201).json({
// //       message: 'User registered successfully. Please verify your phone.',
// //       token,
// //       refreshToken,
// //       otp: process.env.NODE_ENV !== 'production' ? otp : undefined, // Return in JSON for dev
// //       user: {
// //         id: newUser._id,
// //         email: newUser.email,
// //         username: newUser.username,
// //         phone: newUser.phone,
// //         rolePreference: newUser.rolePreference,
// //         points: newUser.points,
// //         level: newUser.level,
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Signup error:', error);
// //     res.status(500).json({ message: 'Server error during signup' });
// //   }
// // };

// // // Login with email/password
// // const login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ message: 'Email and password are required' });
// //     }

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ message: 'Invalid credentials' });
// //     }

// //     if (user.isGuest) {
// //       return res.status(400).json({ message: 'Guest accounts cannot login with password' });
// //     }

// //     const isMatch = user.comparePassword(password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: 'Invalid credentials' });
// //     }

// //     // Update last active
// //     user.lastActiveAt = new Date();
// //     await user.save();

// //     const token = generateToken(user._id);
// //     const refreshToken = generateRefreshToken(user._id);

// //     res.status(200).json({
// //       message: 'Login successful',
// //       token,
// //       refreshToken,
// //       user: {
// //         id: user._id,
// //         email: user.email,
// //         username: user.username,
// //         phone: user.phone,
// //         phoneVerified: user.phoneVerified,
// //         profilePhoto: user.profilePhoto,
// //         rolePreference: user.rolePreference,
// //         points: user.points,
// //         level: user.level,
// //         certificateLevel: user.certificateLevel,
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     res.status(500).json({ message: 'Server error during login' });
// //   }
// // };

// // // Send OTP for phone verification
// // const sendPhoneOTP = async (req, res) => {
// //   try {
// //     const { phone, phoneNumber } = req.body;
// //     const targetPhone = phone || phoneNumber;
// //     const userId = req.user?._id;

// //     if (!targetPhone) {
// //       return res.status(400).json({ message: 'Phone number is required' });
// //     }

// //     // Create OTP using static method from OTP model
// //     const { otp, expiresAt } = await OTP.createOTP({
// //       user: userId,
// //       phone: targetPhone,
// //       type: 'phone_verification',
// //       expiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES) || 10,
// //     });

// //     // DEBUG: LOG OTP TO TERMINAL
// //     console.log('\n------------------------------------------');
// //     console.log(`[AUTH] Requesting OTP for: ${targetPhone}`);
// //     console.log(`[AUTH] CODE: ${otp}`);
// //     console.log('------------------------------------------\n');

// //     const isDevelopment = process.env.NODE_ENV !== 'production';

// //     res.status(200).json({
// //       message: 'OTP sent successfully',
// //       phone: targetPhone,
// //       expiresAt,
// //       ...(isDevelopment && { otp }), 
// //     });
// //   } catch (error) {
// //     console.error('Send OTP error:', error);
// //     res.status(500).json({ message: 'Failed to send OTP' });
// //   }
// // };

// // // Verify phone OTP
// // const verifyPhoneOTP = async (req, res) => {
// //   try {
// //     const { phone, phoneNumber, otp, name, role } = req.body;
// //     const targetPhone = phone || phoneNumber;
// //     const userId = req.user?._id;

// //     if (!targetPhone || !otp) {
// //       return res.status(400).json({ message: 'Phone and OTP are required' });
// //     }

// //     // Find the OTP document
// //     const otpDoc = await OTP.findOne({
// //       phone: targetPhone,
// //       type: 'phone_verification',
// //       verified: false,
// //     }).sort({ createdAt: -1 });

// //     if (!otpDoc) {
// //       return res.status(400).json({ message: 'No pending OTP found for this phone' });
// //     }

// //     // Verify OTP using method from model
// //     const result = otpDoc.verify(otp);
// //     await otpDoc.save();

// //     if (!result.valid) {
// //       return res.status(400).json({
// //         message: result.error,
// //         attemptsRemaining: result.attemptsRemaining,
// //       });
// //     }

// //     let user;
// //     if (userId) {
// //       user = await User.findById(userId);
// //       if (user) {
// //         user.phone = targetPhone;
// //         user.phoneNumber = targetPhone; 
// //         user.phoneVerified = true;
// //         if (user.verificationMethod === 'none') {
// //           user.verificationMethod = 'phone';
// //         }
// //         await user.save();
// //       }
// //     } else {
// //       user = await User.findOne({ phone: targetPhone });
// //       if (!user) {
// //         user = new User({
// //           name: name || 'User',
// //           phone: targetPhone,
// //           phoneNumber: targetPhone,
// //           rolePreference: role || 'requester',
// //           phoneVerified: true,
// //           verificationMethod: 'phone',
// //           username: `user_${uuidv4().substring(0, 6)}`
// //         });
// //         await user.save();
// //       } else {
// //         user.phoneVerified = true;
// //         await user.save();
// //       }
// //     }

// //     const token = generateToken(user._id);
// //     const refreshToken = generateRefreshToken(user._id);

// //     res.status(200).json({
// //       message: 'Phone verified successfully',
// //       verified: true,
// //       token,
// //       refreshToken,
// //       user: user.toPublicProfile ? user.toPublicProfile() : user
// //     });
// //   } catch (error) {
// //     console.error('Verify OTP error:', error);
// //     res.status(500).json({ message: 'Failed to verify OTP' });
// //   }
// // };

// // // Guest login - create anonymous user
// // const guestLogin = async (req, res) => {
// //   try {
// //     const guestId = uuidv4().substring(0, 8);
// //     const username = `guest_${guestId}`;
// //     const email = `guest_${guestId}@guest.local`;

// //     const guestUser = new User({
// //       email,
// //       username,
// //       isGuest: true,
// //       rolePreference: 'requester', 
// //     });
// //     await guestUser.save();

// //     const token = generateToken(guestUser._id, '24h'); 

// //     res.status(201).json({
// //       message: 'Guest session created',
// //       token,
// //       user: {
// //         id: guestUser._id,
// //         username: guestUser.username,
// //         isGuest: true,
// //         rolePreference: guestUser.rolePreference,
// //       },
// //       notice: 'Guest accounts have limited features. Register to unlock full functionality.',
// //     });
// //   } catch (error) {
// //     console.error('Guest login error:', error);
// //     res.status(500).json({ message: 'Failed to create guest session' });
// //   }
// // };

// // // Refresh access token
// // const refreshToken = async (req, res) => {
// //   try {
// //     const { refreshToken: token } = req.body;

// //     if (!token) {
// //       return res.status(400).json({ message: 'Refresh token is required' });
// //     }

// //     const decoded = jwt.verify(
// //       token,
// //       process.env.JWT_REFRESH_SECRET || 'refresh_fallback_secret'
// //     );

// //     if (decoded.type !== 'refresh') {
// //       return res.status(400).json({ message: 'Invalid token type' });
// //     }

// //     const user = await User.findById(decoded.userId);
// //     if (!user) {
// //       return res.status(401).json({ message: 'User not found' });
// //     }

// //     const newAccessToken = generateToken(user._id);
// //     const newRefreshToken = generateRefreshToken(user._id);

// //     res.status(200).json({
// //       token: newAccessToken,
// //       refreshToken: newRefreshToken,
// //     });
// //   } catch (error) {
// //     if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
// //       return res.status(401).json({ message: 'Invalid or expired refresh token' });
// //     }
// //     console.error('Refresh token error:', error);
// //     res.status(500).json({ message: 'Failed to refresh token' });
// //   }
// // };

// // // Google OAuth login/signup
// // const googleAuth = async (req, res) => {
// //   try {
// //     const { idToken, email, name, googleId, profilePhoto } = req.body;

// //     if (!googleId || !email) {
// //       return res.status(400).json({ message: 'Google ID and email are required' });
// //     }

// //     let user = await User.findOne({ $or: [{ googleId }, { email }] });

// //     if (user) {
// //       if (!user.googleId) {
// //         user.googleId = googleId;
// //       }
// //       user.lastActiveAt = new Date();
// //       await user.save();
// //     } else {
// //       const username = email.split('@')[0] + '_' + uuidv4().substring(0, 4);
// //       user = new User({
// //         email,
// //         username,
// //         googleId,
// //         profilePhoto,
// //         referralCode: uuidv4().substring(0, 8).toUpperCase(),
// //       });
// //       await user.save();
// //     }

// //     const token = generateToken(user._id);
// //     const refreshTokenValue = generateRefreshToken(user._id);

// //     res.status(200).json({
// //       message: user.createdAt === user.updatedAt ? 'Account created' : 'Login successful',
// //       token,
// //       refreshToken: refreshTokenValue,
// //       user: {
// //         id: user._id,
// //         email: user.email,
// //         username: user.username,
// //         profilePhoto: user.profilePhoto,
// //         points: user.points,
// //         level: user.level,
// //       },
// //     });
// //   } catch (error) {
// //     console.error('Google auth error:', error);
// //     res.status(500).json({ message: 'Google authentication failed' });
// //   }
// // };

// // // Apple OAuth login/signup
// // const appleAuth = async (req, res) => {
// //   try {
// //     const { idToken, email, name, appleId } = req.body;

// //     if (!appleId) {
// //       return res.status(400).json({ message: 'Apple ID is required' });
// //     }

// //     let user = await User.findOne({ appleId });

// //     if (!user && email) {
// //       user = await User.findOne({ email });
// //     }

// //     if (user) {
// //       if (!user.appleId) {
// //         user.appleId = appleId;
// //       }
// //       user.lastActiveAt = new Date();
// //       await user.save();
// //     } else {
// //       const username = (email ? email.split('@')[0] : 'apple_user') + '_' + uuidv4().substring(0, 4);
// //       user = new User({
// //         email: email || `apple_${appleId.substring(0, 8)}@apple.local`,
// //         username,
// //         appleId,
// //         referralCode: uuidv4().substring(0, 8).toUpperCase(),
// //       });
// //       await user.save();
// //     }

// //     const token = generateToken(user._id);
// //     const refreshTokenValue = generateRefreshToken(user._id);

// //     res.status(200).json({
// //       message: 'Apple authentication successful',
// //       token,
// //       refreshToken: refreshTokenValue,
// //       user: {
// //         id: user._id,
// //         email: user.email,
// //         username: user.username,
// //         points: user.points,
// //         level: user.level,
// //       },
// //     });
// //   } catch (error) {
// //     console.error('Apple auth error:', error);
// //     res.status(500).json({ message: 'Apple authentication failed' });
// //   }
// // };

// // // Logout 
// // const logout = async (req, res) => {
// //   try {
// //     res.status(200).json({ message: 'Logged out successfully' });
// //   } catch (error) {
// //     console.error('Logout error:', error);
// //     res.status(500).json({ message: 'Logout failed' });
// //   }
// // };

// // module.exports = {
// //   signup,
// //   login,
// //   sendPhoneOTP,
// //   verifyPhoneOTP,
// //   guestLogin,
// //   refreshToken,
// //   googleAuth,
// //   appleAuth,
// //   logout,
// // };

// // UPDATE 

// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
// const User = require('../models/User');
// const OTP = require('../models/OTP');

// // Generate JWT token
// const generateToken = (userId, expiresIn = '1d') => {
//   return jwt.sign(
//     { userId },
//     process.env.JWT_SECRET || 'fallback_secret',
//     { expiresIn }
//   );
// };

// // Generate refresh token
// const generateRefreshToken = (userId) => {
//   return jwt.sign(
//     { userId, type: 'refresh' },
//     process.env.JWT_REFRESH_SECRET || 'refresh_fallback_secret',
//     { expiresIn: '7d' }
//   );
// };

// /**
//  * Optimized Signup
//  * Uses Promise.all to generate tokens and OTP concurrently after user creation.
//  */
// const signup = async (req, res) => {
//   try {
//     const { email, password, username, phone, name, rolePreference } = req.body;

//     if (!email || !password || !username) {
//       return res.status(400).json({ message: 'Email, password, and username are required' });
//     }

//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User with this email or username already exists' });
//     }

//     const newUser = new User({
//       email,
//       username,
//       password,
//       phone,
//       name,
//       rolePreference: rolePreference || 'requester',
//       referralCode: uuidv4().substring(0, 8).toUpperCase(),
//     });

//     // Save user first to get the unique _id (slowest part due to bcrypt hashing)
//     await newUser.save();

//     // OPTIMIZATION: Run OTP generation and Token generation in parallel
//     const [otpData, token, refreshToken] = await Promise.all([
//       OTP.createOTP({ 
//         phone: phone, 
//         type: 'phone_verification',
//         user: newUser._id 
//       }),
//       generateToken(newUser._id),
//       generateRefreshToken(newUser._id)
//     ]);

//     const { otp } = otpData;

//     // Async log to avoid blocking the response
//     setImmediate(() => {
//       console.log('\n==========================================');
//       console.log('       COMMUNITY CONNECT DEBUG OTP        ');
//       console.log(`   NEW USER: ${username} (${phone})`);
//       console.log(`   VERIFICATION CODE: ${otp}`);
//       console.log('==========================================\n');
//     });

//     res.status(201).json({
//       message: 'User registered successfully. Please verify your phone.',
//       token,
//       refreshToken,
//       otp: process.env.NODE_ENV !== 'production' ? otp : undefined, 
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         username: newUser.username,
//         phone: newUser.phone,
//         rolePreference: newUser.rolePreference,
//       }
//     });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Server error during signup' });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user || user.isGuest) {
//       return res.status(400).json({ message: 'Invalid credentials or guest account' });
//     }

//     const isMatch = user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Parallelize token generation and last active update
//     const [token, refreshToken] = await Promise.all([
//       generateToken(user._id),
//       generateRefreshToken(user._id),
//       User.findByIdAndUpdate(user._id, { lastActiveAt: new Date() })
//     ]);

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       refreshToken,
//       user: user.toPublicProfile ? user.toPublicProfile() : user
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// };

// /**
//  * Optimized OTP Request
//  */
// const sendPhoneOTP = async (req, res) => {
//   try {
//     const { phone, phoneNumber } = req.body;
//     const targetPhone = phone || phoneNumber;
//     const userId = req.user?._id;

//     if (!targetPhone) {
//       return res.status(400).json({ message: 'Phone number is required' });
//     }

//     const { otp, expiresAt } = await OTP.createOTP({
//       user: userId,
//       phone: targetPhone,
//       type: 'phone_verification',
//       expiryMinutes: 10,
//     });

//     console.log(`\n[AUTH] OTP requested for ${targetPhone}: ${otp}\n`);

//     res.status(200).json({
//       message: 'OTP sent successfully',
//       phone: targetPhone,
//       expiresAt,
//       otp: process.env.NODE_ENV !== 'production' ? otp : undefined
//     });
//   } catch (error) {
//     console.error('Send OTP error:', error);
//     res.status(500).json({ message: 'Failed to send OTP' });
//   }
// };

// const verifyPhoneOTP = async (req, res) => {
//   try {
//     const { phone, phoneNumber, otp, name, role } = req.body;
//     const targetPhone = phone || phoneNumber;
//     const userId = req.user?._id;

//     if (!targetPhone || !otp) {
//       return res.status(400).json({ message: 'Phone and OTP are required' });
//     }

//     const otpDoc = await OTP.findOne({
//       phone: targetPhone,
//       type: 'phone_verification',
//       verified: false,
//     }).sort({ createdAt: -1 });

//     if (!otpDoc) return res.status(400).json({ message: 'No pending OTP found' });

//     const result = otpDoc.verify(otp);
//     await otpDoc.save();

//     if (!result.valid) return res.status(400).json({ message: result.error });

//     let user = userId ? await User.findById(userId) : await User.findOne({ phone: targetPhone });

//     if (!user) {
//       user = new User({
//         name: name || 'User',
//         phone: targetPhone,
//         rolePreference: role || 'requester',
//         phoneVerified: true,
//         username: `user_${uuidv4().substring(0, 6)}`
//       });
//     } else {
//       user.phoneVerified = true;
//     }
    
//     await user.save();

//     res.status(200).json({
//       message: 'Phone verified successfully',
//       token: generateToken(user._id),
//       refreshToken: generateRefreshToken(user._id),
//       user: user.toPublicProfile ? user.toPublicProfile() : user
//     });
//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     res.status(500).json({ message: 'Failed to verify OTP' });
//   }
// };

// const guestLogin = async (req, res) => {
//   try {
//     const guestId = uuidv4().substring(0, 8);
//     const guestUser = new User({
//       email: `guest_${guestId}@guest.local`,
//       username: `guest_${guestId}`,
//       isGuest: true,
//       rolePreference: 'requester', 
//     });
//     await guestUser.save();

//     res.status(201).json({
//       message: 'Guest session created',
//       token: generateToken(guestUser._id, '24h'),
//       user: { id: guestUser._id, username: guestUser.username, isGuest: true }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create guest session' });
//   }
// };

// const refreshToken = async (req, res) => {
//   try {
//     const { refreshToken: token } = req.body;
//     if (!token) return res.status(400).json({ message: 'Refresh token required' });

//     const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_fallback_secret');
//     const user = await User.findById(decoded.userId);
    
//     if (!user) return res.status(401).json({ message: 'User not found' });

//     res.status(200).json({
//       token: generateToken(user._id),
//       refreshToken: generateRefreshToken(user._id),
//     });
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid or expired refresh token' });
//   }
// };


// module.exports = {
//   signup,
//   login,
//   sendPhoneOTP,
//   verifyPhoneOTP,
//   guestLogin,
//   refreshToken,
//   // Ensure these are included so the routes don't crash
//   googleAuth: async (req, res) => res.status(200).json({ message: "Google Auth Demo" }),
//   appleAuth: async (req, res) => res.status(200).json({ message: "Apple Auth Demo" }),
//   logout: async (req, res) => res.status(200).json({ message: 'Logged out' }),
// };

const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const OTP = require('../models/OTP');

// Helper: Generate JWT token
const generateToken = (userId, expiresIn = '1d') => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn }
  );
};

// Helper: Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET || 'refresh_fallback_secret',
    { expiresIn: '7d' }
  );
};

/**
 * Optimized Signup
 * Handles mapping for 'phone' -> 'phoneNumber' and 'aadharNumber'
 */
const signup = async (req, res) => {
  try {
    const { email, password, username, phone, name, rolePreference, aadharNumber } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Email, password, and username are required' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    const newUser = new User({
      email,
      username,
      password,
      phoneNumber: phone, // Correctly mapping 'phone' from frontend to schema
      aadharNumber: aadharNumber, // Capturing Aadhar from Register.tsx
      name,
      rolePreference: rolePreference || 'requester',
      referralCode: uuidv4().substring(0, 8).toUpperCase(),
    });

    // Save user first to trigger password hashing
    await newUser.save();

    // OPTIMIZATION: Generate tokens and OTP in parallel
    const [otpData, token, refreshToken] = await Promise.all([
      OTP.createOTP({ 
        phone: phone, 
        type: 'phone_verification',
        user: newUser._id 
      }),
      generateToken(newUser._id),
      generateRefreshToken(newUser._id)
    ]);

    const { otp } = otpData;

    // Async log for terminal visibility
    setImmediate(() => {
      console.log('\n==========================================');
      console.log('       COMMUNITY CONNECT DEBUG OTP        ');
      console.log(`   NEW USER: ${username} (${phone})`);
      console.log(`   VERIFICATION CODE: ${otp}`);
      console.log('==========================================\n');
    });

    res.status(201).json({
      message: 'User registered successfully. Please verify your phone.',
      token,
      refreshToken,
      otp: process.env.NODE_ENV !== 'production' ? otp : undefined, 
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        phoneNumber: newUser.phoneNumber,
        rolePreference: newUser.rolePreference,
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

/**
 * Login Controller
 */
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user || user.isGuest) {
//       return res.status(400).json({ message: 'Invalid credentials or guest account' });
//     }

//     const isMatch = user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Parallelize token generation and activity update
//     const [token, refreshToken] = await Promise.all([
//       generateToken(user._id),
//       generateRefreshToken(user._id),
//       User.findByIdAndUpdate(user._id, { lastActiveAt: new Date() })
//     ]);

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       refreshToken,
//       user: user.toPublicProfile ? user.toPublicProfile() : user
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// };

// src/controllers/authController.js

// src/controllers/authController.js

const login = async (req, res) => {
  try {
    // 1. Accept 'email' as the identifier (can be email or phone string)
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Credentials and password are required' });
    }

    // 2. Search for the user by Email OR Phone Number
    const user = await User.findOne({ 
      $or: [{ email: email }, { phoneNumber: email }] 
    });

    if (!user || user.isGuest) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Verify Password
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 4. Safety Check: Ensure the user has a phone number for the OTP
    if (!user.phoneNumber) {
       return res.status(400).json({ 
         message: 'No phone number associated with this account. Please contact support.' 
       });
    }

    // 5. Generate OTP for the Terminal
    const { otp } = await OTP.createOTP({ 
      phone: user.phoneNumber, 
      type: 'phone_verification',
      user: user._id 
    });

    console.log('\n==========================================');
    console.log('       LOGIN ATTEMPT VERIFICATION         ');
    console.log(`   USER: ${user.username}`);
    console.log(`   PHONE: ${user.phoneNumber}`);
    console.log(`   LOGIN CODE: ${otp}`);
    console.log('==========================================\n');

    res.status(200).json({
      message: 'Credentials verified. Check terminal for OTP.',
      status: 'pending_verification',
      phone: user.phoneNumber
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * OTP Request Controller
 */
const sendPhoneOTP = async (req, res) => {
  try {
    const { phone, phoneNumber } = req.body;
    const targetPhone = phone || phoneNumber;
    const userId = req.user?._id;

    if (!targetPhone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const { otp, expiresAt } = await OTP.createOTP({
      user: userId,
      phone: targetPhone,
      type: 'phone_verification',
      expiryMinutes: 10,
    });

    console.log(`\n[AUTH] OTP requested for ${targetPhone}: ${otp}\n`);

    res.status(200).json({
      message: 'OTP sent successfully',
      phone: targetPhone,
      expiresAt,
      otp: process.env.NODE_ENV !== 'production' ? otp : undefined
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

/**
 * OTP Verification Controller
 */
const verifyPhoneOTP = async (req, res) => {
  try {
    const { phone, phoneNumber, otp, name, role } = req.body;
    const targetPhone = phone || phoneNumber;
    const userId = req.user?._id;

    if (!targetPhone || !otp) {
      return res.status(400).json({ message: 'Phone and OTP are required' });
    }

    const otpDoc = await OTP.findOne({
      phone: targetPhone,
      type: 'phone_verification',
      verified: false,
    }).sort({ createdAt: -1 });

    if (!otpDoc) return res.status(400).json({ message: 'No pending OTP found' });

    const result = otpDoc.verify(otp);
    await otpDoc.save();

    if (!result.valid) return res.status(400).json({ message: result.error });

    let user = userId ? await User.findById(userId) : await User.findOne({ phoneNumber: targetPhone });

    if (!user) {
      user = new User({
        name: name || 'User',
        phoneNumber: targetPhone,
        rolePreference: role || 'requester',
        phoneVerified: true,
        username: `user_${uuidv4().substring(0, 6)}`
      });
    } else {
      user.phoneVerified = true;
      user.phoneNumber = targetPhone;
    }
    
    await user.save();

    res.status(200).json({
      message: 'Phone verified successfully',
      token: generateToken(user._id),
      refreshToken: generateRefreshToken(user._id),
      user: user.toPublicProfile ? user.toPublicProfile() : user
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

/**
 * Demo OAuth & Guest Handlers
 */
const googleAuth = async (req, res) => res.status(200).json({ message: 'Google auth demo' });
const appleAuth = async (req, res) => res.status(200).json({ message: 'Apple auth demo' });

const guestLogin = async (req, res) => {
  try {
    const guestId = uuidv4().substring(0, 8);
    const guestUser = new User({
      email: `guest_${guestId}@guest.local`,
      username: `guest_${guestId}`,
      isGuest: true,
      rolePreference: 'requester', 
    });
    await guestUser.save();

    res.status(201).json({
      message: 'Guest session created',
      token: generateToken(guestUser._id, '24h'),
      user: { id: guestUser._id, username: guestUser.username, isGuest: true }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create guest session' });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return res.status(400).json({ message: 'Refresh token required' });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_fallback_secret');
    const user = await User.findById(decoded.userId);
    
    if (!user) return res.status(401).json({ message: 'User not found' });

    res.status(200).json({
      token: generateToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

module.exports = {
  signup,
  login,
  sendPhoneOTP,
  verifyPhoneOTP,
  guestLogin,
  refreshToken,
  googleAuth,
  appleAuth,
  logout: async (req, res) => res.status(200).json({ message: 'Logged out' }),
};