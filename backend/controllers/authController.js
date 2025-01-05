const User = require('../models/user');
const Token = require('../models/token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/email');
const crypto = require('crypto');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create a new user
    const user = await User.create({ username, email, password });

    // Generate email verification token
    const token = crypto.randomBytes(20).toString('hex');
    await Token.create({ token, type: 'email_verification', user: user._id });

    // Construct the verification URL
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email?token=${token}`;
    const message = `Please verify your email by clicking on the link: ${verificationUrl}`;

    // Send verification email
    await sendEmail({ email: user.email, subject: 'Email Verification', message });

    res.status(201).json({ success: true, message: 'User registered successfully. Please check your email to verify your account.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, token, role: user.role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify email using the token
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Find the token in the database
    const tokenDoc = await Token.findOne({ token, type: 'email_verification' });

    if (!tokenDoc) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    // Verify the user's email
    const user = await User.findById(tokenDoc.user);
    user.isVerified = true;
    await user.save();

    // Delete the used token
    await Token.deleteOne({ _id: tokenDoc._id });

    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Handle forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'No user found with that email' });
    }

    // Generate password reset token
    const token = crypto.randomBytes(20).toString('hex');
    await Token.create({ token, type: 'password_reset', user: user._id });

    // Construct the reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password?token=${token}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please click on the link: ${resetUrl}`;

    // Send password reset email
    await sendEmail({ email: user.email, subject: 'Password Reset', message });

    res.status(200).json({ success: true, message: 'Password reset link sent to email' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reset password using the token
exports.resetPassword = async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  try {
    // Find the token in the database
    const tokenDoc = await Token.findOne({ token, type: 'password_reset' });

    if (!tokenDoc) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    // Reset the user's password
    const user = await User.findById(tokenDoc.user);
    user.password = password;
    await user.save();

    // Delete the used token
    await Token.deleteOne({ _id: tokenDoc._id });

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};