// routes/publicationRoutes.js
const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { validateObjectId, validateObjectIdInQuery } = require('../middleware/validateObjectId');
const { validatePublication } = require('../middleware/validators');
const rateLimit = require('express-rate-limit');

// Configure multer for PDF uploads
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/publications');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `publication-${uniqueSuffix}-${file.originalname}`);
  }
});

// File filter for publications
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/msword' || 
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB limit
  }
});

// Rate limiters
const createPublicationLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // Limit each IP to 5 publication creations per day
  message: 'Too many publications created. Please try again after 24 hours.'
});

const downloadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 downloads per hour
  message: 'Download limit exceeded. Please try again after an hour.'
});

// Public Routes
router.get('/', 
  optionalAuth,
  validateObjectIdInQuery(['author', 'category']),
  publicationController.getAllPublications
);

// Error handling for file uploads
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size should be less than 25MB'
      });
    }
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
  next(error);
});

module.exports = router;