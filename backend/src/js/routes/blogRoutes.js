const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');
const { validateBlog } = require('../middleware/validators');

// Middleware for validating objectId
const validateObjectId = require('../middleware/validateObjectId');

// Rate limiting middleware
const rateLimit = require('express-rate-limit');

// Create rate limiter for posts
const createBlogLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 create requests per hour
  message: 'Too many blogs created from this IP, please try again after an hour'
});

// Comment rate limiter
const commentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 comments per 15 minutes
  message: 'Too many comments from this IP, please try again after 15 minutes'
});

// Public routes
router.route('/')
  .get(blogController.getAllBlogs);


router.use(protect); // Apply authentication middleware to all routes below

router.route('/')
  .post(
    createBlogLimiter,
    authorize('admin', 'author'),
    validateBlog,
    blogController.createBlog
  );

// Export router
module.exports = router;
