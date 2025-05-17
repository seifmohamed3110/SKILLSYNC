const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware/authMiddleware');
const { restrictToRole } = require('../middleware/roleMiddleware');
const resumeController = require('../controllers/resumeController');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// ✅ Only students can upload
router.post(
  '/upload',
  auth,
  upload.single('resume'),
  resumeController.uploadAndAnalyze
);

module.exports = router;
