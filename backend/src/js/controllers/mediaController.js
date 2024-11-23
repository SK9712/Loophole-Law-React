const Media = require('../models/Media');
const fs = require('fs').promises;
const path = require('path');

exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    // Create media record
    const media = await Media.create({
      title: req.body.title || req.file.originalname,
      fileName: req.file.originalname,
      fileType: path.extname(req.file.originalname).toLowerCase(),
      mimeType: req.file.mimetype,
      path: `../public/uploads/${req.file.filename}`,  // URL path
      size: req.file.size,
      uploadedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      data: media
    });
  } catch (error) {
    // Delete uploaded file if database operation fails
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getMediaFiles = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const media = await Media.find()
      .populate('uploadedBy', 'name')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Media.countDocuments();

    res.json({
      success: true,
      data: media,
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

exports.getMediaFile = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate('uploadedBy', 'name');

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    res.json({
      success: true,
      data: media
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found'
      });
    }

    // Check ownership
    if (media.uploadedBy.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this media'
      });
    }

    // Delete file from filesystem
    const filePath = path.join('public', media.path);
    await fs.unlink(filePath);

    // Delete from database
    await Media.deleteOne({ _id: media._id });

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
