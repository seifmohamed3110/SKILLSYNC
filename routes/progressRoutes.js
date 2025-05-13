const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/update', authMiddleware, progressController.updateProgress);
router.get('/status', authMiddleware, progressController.getProgress);

module.exports = router;
