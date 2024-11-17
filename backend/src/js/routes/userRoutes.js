const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize, restrictTo } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validateObjectId');
const rateLimit = require('express-rate-limit');

// File Upload Configuration
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `user-${req.user.id}-${uniqueSuffix}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  }
});

// Rate Limiters
const updateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 updates per hour
  message: 'Too many profile updates, please try again after an hour'
});

const verificationLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 3, // 3 verification requests per day
  message: 'Too many verification requests, please try again tomorrow'
});

// Public Routes
router.route('/advocates')
  .get(userController.getAllAdvocates);

// Protected Routes
router.use(protect); // Apply protection to all routes below

router.put(
  '/profile/password',
  updateLimiter,
  userController.updatePassword
);

// Professional Verification
router.post(
  '/verify/advocate',
  verificationLimiter,
  upload.fields([
    { name: 'barCertificate', maxCount: 1 },
    { name: 'idProof', maxCount: 1 }
  ]),
  userController.requestAdvocateVerification
);

// Error handling for file uploads
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size should be less than 2MB'
      });
    }
  }
  next(error);
});

module.exports = router;