// routes/caseStudyRoutes.js
const express = require('express');
const router = express.Router();
const caseStudyController = require('../controllers/caseStudyController');
const { protect, authorize } = require('../middleware/auth');
const { validateObjectId, validateObjectIdInQuery } = require('../middleware/validateObjectId');
const rateLimit = require('express-rate-limit');

// Import validators
const { validateCaseStudy } = require('../middleware/validators');

// Rate limiting for case study creation
const createCaseStudyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // Limit each IP to 10 case study creations per day
  message: 'Too many case studies created. Please try again after 24 hours.',
  standardHeaders: true,
  legacyHeaders: false
});

// Public Routes
router.route('/')
  .get(
    validateObjectIdInQuery(['court', 'advocate']),
    caseStudyController.getAllCaseStudies
  );

// Custom middlewares for file upload
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/case-documents');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept pdf, doc, docx, txt files
  if (file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'text/plain') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB limit
  }
});

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size should be less than 10MB'
      });
    }
  }
  next(error);
};

router.use(handleMulterError);

module.exports = router;