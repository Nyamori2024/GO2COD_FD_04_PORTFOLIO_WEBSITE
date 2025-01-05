const mongoose = require('mongoose');

// Define the schema for the Token model
const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  type: { type: String, enum: ['email_verification', 'password_reset'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;