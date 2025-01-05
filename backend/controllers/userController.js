const User = require('../models/user');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};