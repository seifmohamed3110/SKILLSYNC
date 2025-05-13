const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const resumeController = require('../controllers/resumeController');
const auth = require('../middleware/authMiddleware');
const { restrictToRole } = require('../middleware/roleMiddleware');


const upload = multer({ dest: 'uploads/' });

// ✅ Only students can upload
router.post(
  '/upload',
  auth,
  restrictToRole('student'),
  upload.single('resume'),
  resumeController.uploadAndAnalyze
);

module.exports = router;

