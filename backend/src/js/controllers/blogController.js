// controllers/blogController.js
const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Helper function to handle different types of search/filter queries
const buildQuery = (queryParams) => {
  const query = {};
  
  // Search by title or content
  if (queryParams.search) {
    query.$or = [
      { title: { $regex: queryParams.search, $options: 'i' } },
      { content: { $regex: queryParams.search, $options: 'i' } }
    ];
  }

  // Filter by category
  if (queryParams.category) {
    query.category = queryParams.category;
  }

  // Filter by tags
  if (queryParams.tags) {
    query.tags = { $in: queryParams.tags.split(',') };
  }

  // Filter by status
  if (queryParams.status) {
    query.status = queryParams.status;
  }

  // Filter by date range
  if (queryParams.startDate && queryParams.endDate) {
    query.createdAt = {
      $gte: new Date(queryParams.startDate),
      $lte: new Date(queryParams.endDate)
    };
  }

  return query;
};

const blogController = {
  // @desc    Create new blog
  // @route   POST /api/blogs
  // @access  Private
  createBlog: catchAsync(async (req, res) => {
    // Add author from authenticated user
    req.body.author = req.user.id;

    const blog = await Blog.create(req.body);

    res.status(201).json({
      success: true,
      data: blog
    });
  }),

  // @desc    Get all blogs with filtering, sorting, and pagination
  // @route   GET /api/blogs
  // @access  Public
  getAllBlogs: catchAsync(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Build query based on filters
    const query = buildQuery(req.query);

    // Handle sorting
    let sortBy = '-createdAt'; // default sort
    if (req.query.sort) {
      sortBy = req.query.sort.split(',').join(' ');
    }

    // Execute query
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: blogs.length,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      },
      data: blogs
    });
  }),

  // @desc    Get single blog by ID or slug
  // @route   GET /api/blogs/:identifier
  // @access  Public
  getBlog: catchAsync(async (req, res, next) => {
    let blog;
    const identifier = req.params.identifier;

    // Check if identifier is ObjectId or slug
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(identifier);
    } else {
      blog = await Blog.findOne({ slug: identifier });
    }

    if (!blog) {
      return next(new AppError('Blog not found', 404));
    }

    // Increment view count
    await blog.incrementViews();

    res.status(200).json({
      success: true,
      data: blog
    });
  }),

  // @desc    Update blog
  // @route   PUT /api/blogs/:id
  // @access  Private
  updateBlog: catchAsync(async (req, res, next) => {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new AppError('Blog not found', 404));
    }

    // Check if user is author or admin
    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to update this blog', 403));
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: blog
    });
  }),

  // @desc    Delete blog
  // @route   DELETE /api/blogs/:id
  // @access  Private
  deleteBlog: catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new AppError('Blog not found', 404));
    }

    // Check if user is author or admin
    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to delete this blog', 403));
    }

    await blog.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  }),

  // @desc    Like/Unlike blog
  // @route   POST /api/blogs/:id/like
  // @access  Private
  toggleLike: catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new AppError('Blog not found', 404));
    }

    await blog.toggleLike(req.user.id);

    res.status(200).json({
      success: true,
      data: blog
    });
  }),

  // @desc    Add comment to blog
  // @route   POST /api/blogs/:id/comments
  // @access  Private
  addComment: catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new AppError('Blog not found', 404));
    }

    const comment = {
      user: req.user.id,
      content: req.body.content
    };

    await blog.addComment(comment);

    res.status(201).json({
      success: true,
      data: blog
    });
  }),

  // @desc    Get related blogs
  // @route   GET /api/blogs/:id/related
  // @access  Public
  getRelatedBlogs: catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new AppError('Blog not found', 404));
    }

    const relatedBlogs = await Blog.getRelatedBlogs(blog.category, blog._id);

    res.status(200).json({
      success: true,
      data: relatedBlogs
    });
  }),

  // @desc    Get blog statistics
  // @route   GET /api/blogs/stats
  // @access  Private/Admin
  getBlogStats: catchAsync(async (req, res) => {
    const stats = await Blog.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgViews: { $avg: '$viewCount' },
          totalViews: { $sum: '$viewCount' },
          avgComments: { $avg: { $size: '$comments' } }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats
    });
  })
};

module.exports = blogController;