const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const { auth } = require('../middleware/authMiddleware');
const { restrictToRole } = require('../middleware/roleMiddleware');

router.get('/requests', auth, restrictToRole('mentor'), mentorController.getMentorRequests);
router.post('/approve', auth, restrictToRole('mentor'), mentorController.approveMentorship);
router.put('/update-roadmap', auth, restrictToRole('mentor'), mentorController.updateUserRoadmap);

module.exports = router;
