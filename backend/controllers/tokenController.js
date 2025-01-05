const Token = require('../models/token');

// Get token details by token string
exports.getToken = async (req, res) => {
  const { token } = req.params;

  try {
    // Find the token in the database
    const tokenDoc = await Token.findOne({ token });

    if (!tokenDoc) {
      return res.status(404).json({ success: false, message: 'Token not found' });
    }

    res.status(200).json({ success: true, token: tokenDoc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};