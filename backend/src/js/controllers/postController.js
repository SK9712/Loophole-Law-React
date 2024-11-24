const Post = require('../models/Post');
const Category = require('../models/Category');

// Create post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user._id,
      publishedAt: req.body.status === 'published' ? new Date() : null
    });

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search in title or content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'name');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    // Set publishedAt if status changes to published
    if (req.body.status === 'published' && post.status === 'draft') {
      req.body.publishedAt = new Date();
    }

    const updatedPost = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    await Post.deleteOne({ _id: post._id });

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPostsByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const posts = await Post.find({ categories: category._id })
      .populate('author', 'name')
      .populate('categories', 'name slug');

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPostsByTag = async (req, res) => {
  try {
    const posts = await Post.find({ tags: req.params.tag })
      .populate('author', 'name')
      .populate('categories', 'name slug');

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Record view count
exports.recordView = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { viewCount: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: { viewCount: post.viewCount }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Toggle like
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const liked = post.likes.includes(req.user._id);

    if (liked) {
      // Unlike
      post.likes = post.likes.filter(
        id => id.toString() !== req.user._id.toString()
      );
    } else {
      // Like
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
      success: true,
      data: {
        liked: !liked,
        likeCount: post.likes.length
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Advanced search
// Advanced search with partial matching
exports.searchPosts = async (req, res) => {
  try {
    const { 
      q,                  // search query
      category,          // category filter
      tags,             // tags filter
      author,           // author filter
      sortBy,           // sort field
      order = 'desc',   // sort order
      page = 1,
      limit = 10
    } = req.query;

    const query = {};
    
    // Partial text search using regex
    if (q) {
      const searchRegex = new RegExp(q, 'i');  // 'i' flag for case-insensitive
      query.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { tags: searchRegex },
        { searchContent: searchRegex }
      ];
    }

    // Filters
    if (category) {
      query.categories = category;
    }

    if (tags) {
      query.tags = { $in: tags.split(',').map(tag => new RegExp(tag, 'i')) };
    }

    if (author) {
      query.author = author;
    }

    // Only published posts
    query.status = 'published';

    // Sort options
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1;
    }

    const posts = await Post.find(query)
      .populate('author', 'name')
      .populate('categories', 'name')
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get popular posts
exports.getPopularPosts = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const posts = await Post.find({ status: 'published' })
      .sort({ viewCount: -1, likes: -1 })
      .limit(parseInt(limit))
      .populate('author', 'name')
      .populate('categories', 'name');

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Related posts
exports.getRelatedPosts = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const relatedPosts = await Post.find({
      _id: { $ne: post._id },
      status: 'published',
      $or: [
        { categories: { $in: post.categories } },
        { tags: { $in: post.tags } }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate('author', 'name')
    .populate('categories', 'name');

    res.json({
      success: true,
      data: relatedPosts
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};