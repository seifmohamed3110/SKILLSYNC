const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/submit', authMiddleware, assessmentController.submitAssessment);
router.get('/history', authMiddleware, assessmentController.getAssessmentHistory);

module.exports = router;
