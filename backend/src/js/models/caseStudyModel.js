// models/caseStudies.model.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a case title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters'],
    minlength: [10, 'Title should be at least 10 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  caseNumber: {
    type: String,
    unique: true,
    sparse: true, // Allows null values
    trim: true
  },
  practiceArea: {
    type: String,
    required: [true, 'Please specify practice area'],
    enum: [
      'Civil Law',
      'Criminal Law',
      'Constitutional Law',
      'Corporate Law',
      'Family Law',
      'Property Law',
      'Taxation Law',
      'Labour Law',
      'Consumer Protection',
      'Intellectual Property',
      'Banking Law',
      'Environmental Law',
      'Public Interest Litigation',
      'Administrative Law',
      'Alternative Dispute Resolution'
    ]
  },
  court: {
    type: String,
    required: [true, 'Please specify the court'],
    enum: [
      'Supreme Court',
      'High Court',
      'District Court',
      'National Company Law Tribunal',
      'Consumer Forum',
      'Labour Court',
      'Income Tax Appellate Tribunal',
      'National Green Tribunal',
      'Other Tribunals'
    ]
  },
  courtLocation: {
    state: {
      type: String,
      required: [true, 'Please specify state']
    },
    city: {
      type: String,
      required: [true, 'Please specify city']
    },
    bench: String
  },
  parties: {
    plaintiff: {
      name: String,
      type: {
        type: String,
        enum: ['Individual', 'Company', 'Government', 'NGO', 'Other']
      }
    },
    defendant: {
      name: String,
      type: {
        type: String,
        enum: ['Individual', 'Company', 'Government', 'NGO', 'Other']
      }
    }
  },
  challenge: {
    type: String,
    required: [true, 'Please describe the legal challenge'],
    minlength: [100, 'Challenge description should be at least 100 characters']
  },
  approach: {
    type: String,
    required: [true, 'Please describe the approach taken'],
    minlength: [100, 'Approach description should be at least 100 characters']
  },
  solution: {
    type: String,
    required: [true, 'Please describe the solution implemented'],
    minlength: [100, 'Solution description should be at least 100 characters']
  },
  outcome: {
    type: String,
    required: [true, 'Please describe the case outcome'],
    minlength: [50, 'Outcome description should be at least 50 characters']
  },
  keyPoints: [{
    type: String,
    trim: true
  }],
  citations: [{
    citation: String,
    source: String,
    year: Number
  }],
  duration: {
    filingDate: {
      type: Date,
      required: [true, 'Please provide case filing date']
    },
    disposalDate: {
      type: Date
    },
    nextHearing: Date
  },
  advocates: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please assign at least one advocate']
  }],
  status: {
    type: String,
    enum: [
      'Pending',
      'Under Trial',
      'Judgment Reserved',
      'Disposed',
      'Appeal Filed',
      'Settled',
      'Withdrawn'
    ],
    default: 'Pending'
  },
  caseStage: {
    type: String,
    enum: [
      'Filing',
      'Admission',
      'Evidence',
      'Arguments',
      'Final Hearing',
      'Judgment',
      'Execution'
    ]
  },
  featuredImage: {
    url: {
      type: String,
      default: 'default-case.jpg'
    },
    alt: String
  },
  monetaryValue: {
    amount: {
      type: Number,
      private: true
    },
    currency: {
      type: String,
      default: 'INR',
      private: true
    }
  },
  confidentialityLevel: {
    type: String,
    enum: ['Public', 'Private', 'Confidential'],
    default: 'Public'
  },
  documents: [{
    title: String,
    type: {
      type: String,
      enum: [
        'Plaint',
        'Written Statement',
        'Evidence',
        'Judgment',
        'Order',
        'Affidavit',
        'Other'
      ]
    },
    fileUrl: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  precedentValue: {
    type: String,
    enum: ['Landmark', 'Significant', 'Regular'],
    default: 'Regular'
  },
  tags: [{
    type: String,
    trim: true
  }],
  views: {
    type: Number,
    default: 0
  },
  relevantActs: [{
    name: String,
    sections: [String]
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
caseStudySchema.index({ slug: 1 });
caseStudySchema.index({ practiceArea: 1 });
caseStudySchema.index({ court: 1 });
caseStudySchema.index({ 'courtLocation.state': 1, 'courtLocation.city': 1 });
caseStudySchema.index({ status: 1 });
caseStudySchema.index({ title: 'text', challenge: 'text', solution: 'text' });

// Generate slug before saving
caseStudySchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Auto-populate advocates
caseStudySchema.pre(/^find/, function(next) {
  this.populate({
    path: 'advocates',
    select: 'name barCouncilId specialization'
  });
  next();
});

// Virtual for case duration in days
caseStudySchema.virtual('durationInDays').get(function() {
  const endDate = this.duration.disposalDate || new Date();
  return Math.ceil(
    (endDate - this.duration.filingDate) / (1000 * 60 * 60 * 24)
  );
});

// Methods
caseStudySchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

// Static methods
caseStudySchema.statics.findByCourt = function(court, state) {
  return this.find({
    court,
    'courtLocation.state': state,
    confidentialityLevel: 'Public'
  }).select('title slug outcome court');
};

caseStudySchema.statics.findByAct = function(actName) {
  return this.find({
    'relevantActs.name': actName,
    confidentialityLevel: 'Public'
  }).select('title slug outcome relevantActs');
};

caseStudySchema.statics.getLandmarkCases = function() {
  return this.find({
    precedentValue: 'Landmark',
    confidentialityLevel: 'Public'
  }).sort('-createdAt');
};

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);

module.exports = CaseStudy;