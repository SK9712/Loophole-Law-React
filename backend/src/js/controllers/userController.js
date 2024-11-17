// controllers/userController.js
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');
const { uploadToCloudinary, removeFromCloudinary } = require('../utils/cloudinary');
const crypto = require('crypto');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

const userController = {
  // @desc    Get all users (Admin)
  // @route   GET /api/users
  // @access  Private/Admin
  getAllUsers: catchAsync(async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const query = User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    // Apply filters if any
    if (req.query.role) {
      query.where('role').equals(req.query.role);
    }

    if (req.query.verified) {
      query.where('verified').equals(req.query.verified === 'true');
    }

    const [users, total] = await Promise.all([
      query.exec(),
      User.countDocuments()
    ]);

    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total
      },
      data: users
    });
  }),

  // @desc    Get all advocates
  // @route   GET /api/users/advocates
  // @access  Public
  getAllAdvocates: catchAsync(async (req, res) => {
    const query = {
      role: 'advocate',
      verified: true,
      active: true
    };

    // Apply filters
    if (req.query.specialization) {
      query.specialization = req.query.specialization;
    }

    if (req.query.city) {
      query['address.city'] = req.query.city;
    }

    if (req.query.experience) {
      query.experience = { $gte: parseInt(req.query.experience) };
    }

    const advocates = await User.find(query)
      .select('name specialization experience address avatar barCouncilId')
      .populate('caseStudies', 'title outcome')
      .sort('-experience');

    res.status(200).json({
      success: true,
      count: advocates.length,
      data: advocates
    });
  }),

  // @desc    Get user profile
  // @route   GET /api/users/profile
  // @access  Private
  getProfile: catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('publications')
      .populate('caseStudies');

    res.status(200).json({
      success: true,
      data: user
    });
  }),

  // @desc    Update user profile
  // @route   PUT /api/users/profile
  // @access  Private
  updateProfile: catchAsync(async (req, res) => {
    const fieldsToUpdate = {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      socialLinks: req.body.socialLinks
    };

    // Handle avatar upload
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, 'profiles');
      fieldsToUpdate.avatar = result.secure_url;

      // Remove old avatar if exists
      if (req.user.avatar && req.user.avatar !== 'default-avatar.jpg') {
        await removeFromCloudinary(req.user.avatar);
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: fieldsToUpdate },
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  }),

  // @desc    Update password
  // @route   PUT /api/users/profile/password
  // @access  Private
  updatePassword: catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return next(new AppError('Current password is incorrect', 401));
    }

    // Validate new password
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new AppError('New passwords do not match', 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    // Send email notification
    await sendEmail({
      email: user.email,
      subject: 'Password Change Notification',
      template: 'passwordChange',
      data: {
        name: user.name,
        time: new Date().toLocaleString()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  }),

  // @desc    Request advocate verification
  // @route   POST /api/users/verify/advocate
  // @access  Private
  requestAdvocateVerification: catchAsync(async (req, res, next) => {
    if (!req.files?.barCertificate || !req.files?.idProof) {
      return next(new AppError('Please provide all required documents', 400));
    }

    const user = await User.findById(req.user.id);

    // Upload documents to cloudinary
    const [barCertUpload, idProofUpload] = await Promise.all([
      uploadToCloudinary(req.files.barCertificate[0].path, 'verifications'),
      uploadToCloudinary(req.files.idProof[0].path, 'verifications')
    ]);

    // Update user verification details
    user.barCouncilId = req.body.barCouncilId;
    user.verificationDocuments = {
      barCertificate: barCertUpload.secure_url,
      idProof: idProofUpload.secure_url,
      submittedAt: Date.now()
    };

    await user.save();

    // Notify admins
    // TODO: Implement admin notification system

    res.status(200).json({
      success: true,
      message: 'Verification request submitted successfully'
    });
  }),

  // @desc    Verify advocate (Admin)
  // @route   PUT /api/users/verify/:userId
  // @access  Private/Admin
  verifyAdvocate: catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    user.verified = true;
    user.role = 'advocate';
    await user.save();

    // Send verification confirmation email
    await sendEmail({
      email: user.email,
      subject: 'Account Verification Successful',
      template: 'verificationSuccess',
      data: {
        name: user.name
      }
    });

    res.status(200).json({
      success: true,
      message: 'User verified successfully'
    });
  }),

  // @desc    Get advocates statistics
  // @route   GET /api/users/advocates/stats
  // @access  Public
  getAdvocatesStats: catchAsync(async (req, res) => {
    const stats = await User.aggregate([
      {
        $match: {
          role: 'advocate',
          verified: true,
          active: true
        }
      },
      {
        $group: {
          _id: '$specialization',
          count: { $sum: 1 },
          avgExperience: { $avg: '$experience' },
          cities: { $addToSet: '$address.city' }
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
  }),

  // @desc    Export users data (Admin)
  // @route   GET /api/users/export/:format
  // @access  Private/Admin
  exportUsers: catchAsync(async (req, res, next) => {
    const users = await User.find()
      .select('name email role verified createdAt')
      .lean();

    if (req.params.format === 'csv') {
      const csvWriter = createObjectCsvWriter({
        path: 'exports/users.csv',
        header: [
          { id: 'name', title: 'Name' },
          { id: 'email', title: 'Email' },
          { id: 'role', title: 'Role' },
          { id: 'verified', title: 'Verified' },
          { id: 'createdAt', title: 'Created At' }
        ]
      });

      await csvWriter.writeRecords(users);

      res.download('exports/users.csv', 'users.csv', (err) => {
        if (err) {
          next(new AppError('Error downloading file', 500));
        }
      });
    } else if (req.params.format === 'json') {
      res.status(200).json({
        success: true,
        data: users
      });
    } else {
      return next(new AppError('Invalid export format', 400));
    }
  }),

  // @desc    Get user activities
  // @route   GET /api/users/activities
  // @access  Private
  getUserActivities: catchAsync(async (req, res) => {
    const activities = await Promise.all([
      // Get user's publications
      User.findById(req.user.id)
        .populate('publications', 'title createdAt'),
      // Get user's case studies
      User.findById(req.user.id)
        .populate('caseStudies', 'title createdAt')
    ]);

    res.status(200).json({
      success: true,
      data: {
        publications: activities[0].publications,
        caseStudies: activities[1].caseStudies
      }
    });
  }),

  // Additional controller methods...
};

module.exports = userController;