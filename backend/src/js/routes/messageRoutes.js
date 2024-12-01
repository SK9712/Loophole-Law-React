const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createMessage,
  getMessages,
  getMessage,
  updateMessageStatus,
  deleteMessage,
  getMessageStats
} = require('../controllers/messageController');

// Public routes
router.post('/', createMessage);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getMessageStats);

router
  .route('/')
  .get(getMessages);

router
  .route('/:id')
  .get(getMessage)
  .delete(deleteMessage);

router.patch('/:id/status', updateMessageStatus);

module.exports = router;