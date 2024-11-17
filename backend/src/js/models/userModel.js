// models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please provide a valid phone number']
  },
  role: {
    type: String,
    enum: ['user', 'advocate', 'admin', 'reviewer'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't return password in queries
  },
  barCouncilId: {
    type: String,
    unique: true,
    sparse: true, // Allow null/undefined values
    validate: {
      validator: function(v) {
        // Custom validation for Bar Council ID format
        if (!v) return true; // Allow empty
        return /^[A-Z]{2}\/\d{4}\/\d{4}$/.test(v);
      },
      message: 'Please provide a valid Bar Council ID'
    }
  },
  specialization: [{
    type: String,
    enum: [
      'Civil Law',
      'Criminal Law',
      'Corporate Law',
      'Family Law',
      'Intellectual Property',
      'Tax Law',
      'Constitutional Law',
      'Environmental Law',
      'Real Estate Law'
    ]
  }],
  experience: {
    type: Number,
    min: [0, 'Experience years cannot be negative']
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: {
      type: String,
      match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode']
    },
    country: {
      type: String,
      default: 'India'
    }
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  loginAttempts: {
    type: Number,
    default: 0,
    select: false
  },
  lockUntil: {
    type: Date,
    select: false
  },
  lastLogin: Date,
  tokenVersion: {
    type: Number,
    default: 0
  },
  preferences: {
    newsletter: {
      type: Boolean,
      default: true
    },
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    }
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    website: String
  },
  achievements: [{
    title: String,
    year: Number,
    description: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ barCouncilId: 1 });
userSchema.index({ role: 1 });
userSchema.index({ "address.city": 1, "address.state": 1 });

// Virtual populate publications
userSchema.virtual('publications', {
  ref: 'Publication',
  localField: '_id',
  foreignField: 'author',
  justOne: false
});

// Virtual populate case studies
userSchema.virtual('caseStudies', {
  ref: 'CaseStudy',
  localField: '_id',
  foreignField: 'advocates',
  justOne: false
});

// Pre-save middleware
userSchema.pre('save', async function(next) {
  // Only hash password if it's modified
  if (!this.isModified('password')) return next();

  // Hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Set passwordChangedAt field
  if (this.isModified('password') && !this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

// Methods
userSchema.methods = {
  // Generate JWT token
  getSignedJwtToken: function() {
    return jwt.sign(
      { 
        id: this._id,
        role: this.role,
        version: this.tokenVersion
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE
      }
    );
  },

  // Match password
  matchPassword: async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  // Generate password reset token
  getResetPasswordToken: function() {
    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    return resetToken;
  },

  // Generate email verification token
  getEmailVerificationToken: function() {
    const verificationToken = crypto.randomBytes(32).toString('hex');

    this.emailVerificationToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');

    this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    return verificationToken;
  },

  // Check if password was changed after token was issued
  hasPasswordChanged: function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  },

  // Increment login attempts
  incrementLoginAttempts: async function() {
    // If account is already locked, check if lock has expired
    if (this.lockUntil && this.lockUntil > Date.now()) {
      throw new Error('Account is locked. Please try again later.');
    }

    this.loginAttempts += 1;

    // Lock account if max attempts reached
    if (this.loginAttempts >= 5) {
      this.lockUntil = Date.now() + 60 * 60 * 1000; // Lock for 1 hour
    }

    await this.save();
  },

  // Reset login attempts
  resetLoginAttempts: async function() {
    this.loginAttempts = 0;
    this.lockUntil = undefined;
    await this.save();
  },

  // Increment token version (force logout from all devices)
  incrementTokenVersion: async function() {
    this.tokenVersion += 1;
    await this.save();
  }
};

// Static methods
userSchema.statics = {
  // Get advocates by specialization
  getAdvocatesBySpecialization: function(specialization) {
    return this.find({
      role: 'advocate',
      specialization: specialization,
      active: true,
      verified: true
    }).select('-password');
  },

  // Get verified advocates count by city
  getAdvocatesCountByCity: function() {
    return this.aggregate([
      {
        $match: {
          role: 'advocate',
          verified: true,
          active: true
        }
      },
      {
        $group: {
          _id: '$address.city',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;