const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Importing CORS
const testEmailRoute = require('./routes/testEmailRoute'); // Importing test email route

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enabling CORS

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/test', testEmailRoute); // Using test email route

// Start the server and connect to the database
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});