const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/email');

router.get('/send-test-email', async (req, res) => {
  try {
    await sendEmail({
      email: 'recipient@example.com',
      subject: 'Test Email',
      message: 'This is a test email to verify the email configuration.',
    });
    res.status(200).json({ success: true, message: 'Test email sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;