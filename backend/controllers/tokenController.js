const Token = require('../models/token');

exports.getToken = async (req, res) => {
  const { token } = req.params;

  try {
    const tokenDoc = await Token.findOne({ token });

    if (!tokenDoc) {
      return res.status(404).json({ success: false, message: 'Token not found' });
    }

    res.status(200).json({ success: true, token: tokenDoc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};