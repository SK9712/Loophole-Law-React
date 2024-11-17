// models/publication.model.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a publication title'],
    trim: true,
    maxlength: [300, 'Title cannot exceed 300 characters'],
    minlength: [10, 'Title should be at least 10 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  authors: [{
    name: {
      type: String,
      required: true
    },
    designation: String,
    organization: String,
    authorId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  }],
  type: {
    type: String,
    required: true,
    enum: [
      'Legal Article',
      'Research Paper',
      'Case Commentary',
      'Legal Update',
      'Newsletter',
      'Book Review',
      'Journal Publication',
      'White Paper',
      'Legal Guide',
      'Policy Brief'
    ]
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Constitutional Law',
      'Criminal Law',
      'Civil Law',
      'Corporate Law',
      'Banking Law',
      'Tax Law',
      'Environmental Law',
      'Intellectual Property',
      'Family Law',
      'Labour Law',
      'Administrative Law',
      'International Law'
    ]
  },
  content: {
    abstract: {
      type: String,
      required: [true, 'Please provide an abstract'],
      maxlength: [1000, 'Abstract cannot exceed 1000 characters']
    },
    fullText: {
      type: String,
      required: [true, 'Please provide the full content']
    }
  },
  citations: [{
    reference: String,
    source: String,
    year: Number,
    link: String
  }],
  keywords: [{
    type: String,
    trim: true
  }],
  publicationDetails: {
    publisher: String,
    journal: String,
    volume: String,
    issue: String,
    pages: String,
    doi: String,
    isbn: String,
    publicationDate: {
      type: Date,
      required: true
    }
  },
  legalReferences: {
    cases: [{
      name: String,
      citation: String,
      year: Number
    }],
    statutes: [{
      name: String,
      section: String,
      description: String
    }]
  },
  status: {
    type: String,
    enum: ['draft', 'under_review', 'published', 'archived'],
    default: 'draft'
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'members_only'],
    default: 'public'
  },
  downloadOptions: {
    isPdfAvailable: {
      type: Boolean,
      default: false
    },
    pdfUrl: String,
    isWordAvailable: {
      type: Boolean,
      default: false
    },
    wordUrl: String
  },
  metrics: {
    views: {
      type: Number,
      default: 0
    },
    downloads: {
      type: Number,
      default: 0
    },
    citations: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  },
  reviewStatus: {
    isReviewed: {
      type: Boolean,
      default: false
    },
    reviewedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    reviewDate: Date,
    reviewComments: String
  },
  featuredImage: {
    url: {
      type: String,
      default: 'default-publication.jpg'
    },
    alt: String
  },
  attachments: [{
    title: String,
    fileUrl: String,
    fileType: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  relatedTopics: [{
    type: String,
    trim: true
  }],
  comments: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
publicationSchema.index({ slug: 1 });
publicationSchema.index({ type: 1, category: 1 });
publicationSchema.index({ 'publicationDetails.publicationDate': -1 });
publicationSchema.index({ status: 1 });
publicationSchema.index({ 
  title: 'text', 
  'content.abstract': 'text', 
  'content.fullText': 'text' 
});

// Generate slug before saving
publicationSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Populate references on find
publicationSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'authors.authorId',
    select: 'name designation avatar'
  }).populate({
    path: 'reviewStatus.reviewedBy',
    select: 'name designation'
  });
  next();
});

// Instance methods
publicationSchema.methods.incrementViews = async function() {
  this.metrics.views += 1;
  return this.save();
};

publicationSchema.methods.incrementDownloads = async function() {
  this.metrics.downloads += 1;
  return this.save();
};

publicationSchema.methods.incrementCitations = async function() {
  this.metrics.citations += 1;
  return this.save();
};

publicationSchema.methods.addComment = async function(userId, content) {
  this.comments.push({ user: userId, content });
  return this.save();
};

// Static methods
publicationSchema.statics.getPublishedPublications = function() {
  return this.find({ 
    status: 'published',
    visibility: 'public'
  }).sort('-publicationDetails.publicationDate');
};

publicationSchema.statics.findByCategory = function(category) {
  return this.find({
    category,
    status: 'published',
    visibility: 'public'
  }).select('title slug content.abstract publicationDetails.publicationDate');
};

publicationSchema.statics.getLatestPublications = function(limit = 5) {
  return this.find({
    status: 'published',
    visibility: 'public'
  })
  .sort('-publicationDetails.publicationDate')
  .limit(limit)
  .select('title slug content.abstract authors');
};

publicationSchema.statics.getRelatedPublications = function(category, excludeId, limit = 3) {
  return this.find({
    category,
    _id: { $ne: excludeId },
    status: 'published',
    visibility: 'public'
  })
  .limit(limit)
  .select('title slug content.abstract publicationDetails.publicationDate');
};

// Virtual for formatted citation
publicationSchema.virtual('formattedCitation').get(function() {
  return `${this.authors.map(author => author.name).join(', ')} (${
    new Date(this.publicationDetails.publicationDate).getFullYear()
  }). "${this.title}". ${this.publicationDetails.journal || ''} ${
    this.publicationDetails.volume ? `Vol. ${this.publicationDetails.volume}` : ''
  }${this.publicationDetails.pages ? `, pp. ${this.publicationDetails.pages}` : ''}.`;
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;