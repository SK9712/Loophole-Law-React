const Post = require('../models/Post');
const Category = require('../models/Category');
const path = require('path');
const fs = require('fs').promises;

// Helper function to decode and save base64 image
const saveBase64Image = async (base64String, title) => {
  try {
    // Extract image data and type from base64 string
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }

    const mimeType = matches[1];
    const imageBuffer = Buffer.from(matches[2], 'base64');
    
    // Get file extension from mime type
    const extension = mimeType.split('/')[1];
    const fileName = `post-${Date.now()}-${Math.round(Math.random() * 1E9)}.${extension}`;
    const uploadDir = 'public/uploads/posts';
    const filePath = path.join(uploadDir, fileName);

    // Create directory if it doesn't exist
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Save the file
    await fs.writeFile(filePath, imageBuffer);

    return {
      fileName,
      filePath: `/uploads/posts/${fileName}`,
      fileType: mimeType,
      fileSize: imageBuffer.length
    };
  } catch (error) {
    throw new Error(`Failed to save image: ${error.message}`);
  }
};

// Create post
// Create post with base64 image
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, status, image } = req.body;
    
    const postData = {
      title,
      content,
      category,
      status,
      author: req.user._id,
      publishedAt: status === 'published' ? new Date() : null
    };

    // Handle image if provided
    if (image) {
      try {
        const imageData = await saveBase64Image(image, title);
        postData.featuredImage = imageData;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
    }

    const post = await Post.create(postData);

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    // Clean up uploaded image if post creation fails
    if (postData?.featuredImage?.filePath) {
      const fullPath = path.join('public', postData.featuredImage.filePath);
      await fs.unlink(fullPath).catch(console.error);
    }

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
    const { title, content, category, status, image } = req.body;
    
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      throw new Error('Post not found');
    }

    // Check authorization
    if (post.author.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      throw new Error('Not authorized to update this post');
    }

    const updateData = {
      title,
      content,
      category,
      status
    };

    // Handle image update if provided
    if (image) {
      try {
        // Delete old image if it exists
        if (post.featuredImage && post.featuredImage.fileName) {
          const oldImagePath = path.join('public/uploads/posts', post.featuredImage.fileName);
          await fs.unlink(oldImagePath).catch(console.error);
        }

        // Save new image
        const imageData = await saveBase64Image(image, title);
        updateData.featuredImage = imageData;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
    }

    // Update publishedAt if status changes to published
    if (updateData.status === 'published' && post.status === 'draft') {
      updateData.publishedAt = new Date();
    }

    const updatedPost = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      updateData,
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
      throw new Error('Post not found');
    }

    // Check authorization
    if (post.author.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      throw new Error('Not authorized to delete this post');
    }

    // Delete associated image if it exists
    if (post.featuredImage && post.featuredImage.fileName) {
      const imagePath = path.join('public/uploads/posts', post.featuredImage.fileName);
      await fs.unlink(imagePath).catch(console.error);
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

    const posts = await Post.find({ category: category._id })
      .populate('author', 'name')
      .populate('category', 'name slug');

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
      .populate('category', 'name slug');

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
      status,
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
        // Handle single or multiple categories
        query.category = { 
        $in: category.includes(',') ? category.split(',') : [category] 
        };
    }

    if (tags) {
        // Handle tags with case-insensitive regex
        query.tags = { 
        $in: tags.split(',').map(tag => new RegExp(tag.trim(), 'i')) 
        };
    }

    if (author) {
        // Handle single or multiple authors
        query.author = { 
        $in: author.includes(',') ? author.split(',') : [author] 
        };
    }

    if (status) {
        // Handle single or multiple status values
        query.status = { 
        $in: status.includes(',') ? status.split(',') : [status] 
        };
    }

    // Sort options
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1;
    }

    const posts = await Post.find(query)
      .populate('author', 'name')
      .populate('category', 'name')
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
      .populate('category', 'name');

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
        { category: post.category },
        { tags: { $in: post.tags } }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate('author', 'name')
    .populate('category', 'name');

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