
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { auth } = require('../middleware/authMiddleware');
const { restrictToRole } = require('../middleware/roleMiddleware');

// ✅ Only admin can access the following
router.get('/users', auth, restrictToRole('admin'), adminController.getAllUsers);
router.delete('/user/:id', auth, restrictToRole('admin'), adminController.deleteUser);

module.exports = router;
