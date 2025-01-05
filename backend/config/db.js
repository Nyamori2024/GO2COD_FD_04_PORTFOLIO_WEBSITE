const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: '/workspace/GO2COD_FD_04_PORTFOLIO_WEBSITE/backend/.env' });

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string from the .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    // Log any errors that occur during the connection attempt
    console.error('Error connecting to MongoDB', error);
    // Exit the process with a failure code
    process.exit(1);
  }
};

module.exports = connectDB;