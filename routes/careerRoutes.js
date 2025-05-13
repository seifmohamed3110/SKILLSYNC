const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/suggest', authMiddleware, careerController.suggestCareers);
router.post('/select', authMiddleware, careerController.selectCareer);
router.get('/roadmap', authMiddleware, careerController.getRoadmap);


module.exports = router;
