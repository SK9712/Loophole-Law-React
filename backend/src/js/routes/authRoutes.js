const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getUsers, 
  updateUser, 
  deleteUser 
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected admin routes
router.use(protect);  // Apply authentication middleware
router.use(authorize('admin'));  // Apply admin authorization middleware

router.route('/users')
  .get(getUsers);

router.route('/users/:id')
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;