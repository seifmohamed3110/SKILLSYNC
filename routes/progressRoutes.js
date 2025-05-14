const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { auth } = require('../middleware/authMiddleware'); // Corrected import

// Route to update progress
router.post('/update', auth, progressController.updateProgress);

// Route to get progress status
router.get('/status', auth, progressController.getProgress);

module.exports = router;

