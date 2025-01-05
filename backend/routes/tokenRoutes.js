const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

// Token routes
router.get('/:token', tokenController.getToken);

module.exports = router;