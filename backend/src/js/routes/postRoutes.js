const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

router.route('/')
  .get(getPosts)
  .post(protect, authorize('admin', 'author'), createPost);

router.route('/:slug')
  .get(getPost)
  .put(protect, authorize('admin', 'author'), updatePost)
  .delete(protect, authorize('admin', 'author'), deletePost);

module.exports = router;