const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  featuredImage: {
    fileName: String,
    filePath: String,
    fileType: String,
    fileSize: Number
  },
  excerpt: {
    type: String,
    maxLength: [500, 'Excerpt cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    default: 'Legal',
  },
  tags: [{
    type: String,
    trim: true
  }],
  publishedAt: Date,
readTime: Number,
metaTitle: {
    type: String,
    maxLength: [60, 'Meta title should not exceed 60 characters']
  },
  metaDescription: {
    type: String,
    maxLength: [160, 'Meta description should not exceed 160 characters']
  },
  keywords: [{
    type: String,
    trim: true
  }],
  canonicalUrl: String,
  
  // Analytics fields
  viewCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  readTime: Number,
  isPopular: {
    type: Boolean,
    default: false
  },
  
  // Enhanced content fields
  excerpt: {
    type: String,
    maxLength: [300, 'Excerpt should not exceed 300 characters']
  },
  searchContent: String // For full-text search
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate slug before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  if (this.isModified('content')) {
    // Estimate read time (words per minute)
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
    
    // Create searchable content
    this.searchContent = `${this.title} ${this.content} ${this.keywords.join(' ')}`.toLowerCase();
  }
  next();
});

// Create text index for search
postSchema.index({ 
  title: 'text',
  content: 'text',
  searchContent: 'text',
  keywords: 'text'
});

postSchema.index({ 
  title: 'text', 
  content: 'text',
  searchContent: 'text',  // Include searchContent field
  keywords: 'text'
},
{
  weights: {
    title: 10,          // Title matches are most important
    content: 5,         // Content matches are next
    searchContent: 3,    // SearchContent matches have lower priority
    keywords: 2
  },
  name: "PostTextIndex" // Give the index a name
});

module.exports = mongoose.model('Post', postSchema);