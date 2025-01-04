const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path:'/workspace/GO2COD_FD_04_PORTFOLIO_WEBSITE/backend/.env'});


// dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
