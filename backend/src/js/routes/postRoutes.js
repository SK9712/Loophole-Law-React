const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getPostsByTag,
  recordView,
  toggleLike,
  searchPosts,
  getPopularPosts,
  getRelatedPosts,
  getPostStats
} = require('../controllers/postController');

router.route('/')
  .get(getPosts)
  .post(protect, authorize('admin', 'author'), createPost);

router.get('/tag/:tag', getPostsByTag);

// Search routes
router.get('/search', searchPosts);
router.get('/popular', getPopularPosts);
router.get('/:slug/related', getRelatedPosts);
router.get('/stats', protect, authorize('admin'), getPostStats);

// Analytics routes
router.post('/:slug/view', recordView);
router.post('/:slug/like', protect, toggleLike);

router.route('/:slug')
  .get(getPost)
  .put(protect, authorize('admin', 'author'), updatePost)
  .delete(protect, authorize('admin', 'author'), deletePost);


module.exports = router;