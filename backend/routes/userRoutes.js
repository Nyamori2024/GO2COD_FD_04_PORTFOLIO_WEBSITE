const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// User routes
router.get('/profile', authMiddleware.protect, userController.getUserProfile);

module.exports = router;