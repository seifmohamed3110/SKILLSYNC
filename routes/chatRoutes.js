// routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware'); // Correctly importing allowRoles

// User can request a chat
router.post('/request', auth.auth, chatController.requestChat);

// Admin or mentor can view all requests
router.get('/all', auth.auth, allowRoles('admin', 'mentor'), chatController.getAllRequests);

module.exports = router;
