const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
  moderateComment
} = require('../controllers/commentController');

// Nested routes for post comments
router.route('/posts/:slug/comments')
  .get(getPostComments)
  .post(protect, createComment);

router.route('/comments/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

router.route('/comments/:id/moderate')
  .put(protect, authorize('admin'), moderateComment);

module.exports = router;