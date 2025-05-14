const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const { auth } = require('../middleware/authMiddleware');

// Check that these are valid functions
router.post('/submit', auth, assessmentController.submitAssessment);
router.get('/history', auth, assessmentController.getAssessmentHistory);

module.exports = router;
