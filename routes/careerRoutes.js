const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const { auth } = require('../middleware/authMiddleware'); // Corrected import

// Route to suggest careers
router.get('/suggest', auth, careerController.suggestCareers);

// Route to select a career
router.post('/select', auth, careerController.selectCareer);

// Route to get career roadmap
router.get('/roadmap', auth, careerController.getRoadmap);

// Route to get career-related courses
router.get('/courses', auth, careerController.getCourses);

router.get('/progress', auth, careerController.getProgress);

module.exports = router;

const progressController = require('../controllers/progressController');

// New route to fetch user's career progress
router.get('/progress', auth, progressController.getProgress);





