// models/blog.model.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters'],
    minlength: [10, 'Title should be at least 10 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
    minlength: [100, 'Content should be at least 100 characters']
  },
  summary: {
    type: String,
    required: [true, 'Please add a summary'],
    maxlength: [500, 'Summary cannot be more than 500 characters']
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Corporate Law',
      'Criminal Law',
      'Family Law',
      'Intellectual Property',
      'Real Estate',
      'Tax Law',
      'Litigation',
      'Legal News',
      'Case Analysis'
    ]
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tag cannot be more than 20 characters']
  }],
  featuredImage: {
    url: {
      type: String,
      default: 'default-blog.jpg'
    },
    alt: {
      type: String,
      default: 'Blog featured image'
    }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'Meta description cannot be more than 160 characters']
  },
  readTime: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isFeaturePost: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ title: 'text', content: 'text' }); // Text search index

// Create slug from title before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }

  // Calculate read time if content is modified
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }

  next();
});

// Cascade delete comments when a blog is deleted
blogSchema.pre('remove', async function(next) {
  await this.model('Comment').deleteMany({ blog: this._id });
  next();
});

// Virtual populate comments
blogSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Virtual populate likes count
blogSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Instance methods
blogSchema.methods.incrementViews = async function() {
  this.viewCount += 1;
  return this.save();
};

blogSchema.methods.addComment = async function(userId, content) {
  this.comments.push({ user: userId, content });
  return this.save();
};

blogSchema.methods.toggleLike = async function(userId) {
  const userLikeIndex = this.likes.indexOf(userId);
  if (userLikeIndex === -1) {
    this.likes.push(userId);
  } else {
    this.likes.splice(userLikeIndex, 1);
  }
  return this.save();
};

// Static methods
blogSchema.statics.getPublishedBlogs = function() {
  return this.find({ status: 'published' })
    .sort('-createdAt')
    .populate('author', 'name avatar');
};

blogSchema.statics.getRelatedBlogs = function(category, blogId) {
  return this.find({
    category,
    _id: { $ne: blogId },
    status: 'published'
  })
    .limit(3)
    .select('title slug featuredImage createdAt');
};

// Query middleware
blogSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'name avatar'
  });
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;