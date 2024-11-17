// middleware/validators.js
const { body, query, param } = require('express-validator');
const { validationResult } = require('express-validator');

// Custom error handler for validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Blog Validators
const validateBlog = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 10, max: 200 })
    .withMessage('Title must be between 10 and 200 characters')
    .matches(/^[a-zA-Z0-9\s\-.,!?()'"]+$/)
    .withMessage('Title contains invalid characters'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters long'),

  body('summary')
    .trim()
    .notEmpty()
    .withMessage('Summary is required')
    .isLength({ min: 50, max: 500 })
    .withMessage('Summary must be between 50 and 500 characters'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
      'Corporate Law',
      'Criminal Law',
      'Family Law',
      'Intellectual Property',
      'Real Estate',
      'Tax Law',
      'Litigation',
      'Legal News',
      'Case Analysis'
    ])
    .withMessage('Invalid category selected'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => tags.length <= 5)
    .withMessage('Maximum 5 tags allowed'),

  body('tags.*')
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('Each tag must be between 2 and 20 characters')
    .matches(/^[a-zA-Z0-9\-]+$/)
    .withMessage('Tags can only contain letters, numbers, and hyphens'),

  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status value'),

  handleValidationErrors
];

// Case Study Validators
const validateCaseStudy = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 10, max: 200 })
    .withMessage('Title must be between 10 and 200 characters'),

  body('practiceArea')
    .trim()
    .notEmpty()
    .withMessage('Practice area is required')
    .isIn([
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
      'Administrative Law'
    ])
    .withMessage('Invalid practice area selected'),

  body('court')
    .trim()
    .notEmpty()
    .withMessage('Court is required')
    .isIn([
      'Supreme Court',
      'High Court',
      'District Court',
      'National Company Law Tribunal',
      'Consumer Forum',
      'Labour Court',
      'Income Tax Appellate Tribunal',
      'National Green Tribunal'
    ])
    .withMessage('Invalid court selected'),

  body('courtLocation.state')
    .trim()
    .notEmpty()
    .withMessage('State is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Invalid state name'),

  body('courtLocation.city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Invalid city name'),

  body('challenge')
    .trim()
    .notEmpty()
    .withMessage('Challenge description is required')
    .isLength({ min: 100 })
    .withMessage('Challenge description must be at least 100 characters'),

  body('solution')
    .trim()
    .notEmpty()
    .withMessage('Solution is required')
    .isLength({ min: 100 })
    .withMessage('Solution must be at least 100 characters'),

  body('duration.filingDate')
    .notEmpty()
    .withMessage('Filing date is required')
    .isISO8601()
    .withMessage('Invalid filing date format'),

  body('duration.disposalDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid disposal date format')
    .custom((value, { req }) => {
      if (value && new Date(value) <= new Date(req.body.duration.filingDate)) {
        throw new Error('Disposal date must be after filing date');
      }
      return true;
    }),

  handleValidationErrors
];

// Publication Validators
const validatePublication = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 10, max: 300 })
    .withMessage('Title must be between 10 and 300 characters'),

  body('type')
    .trim()
    .notEmpty()
    .withMessage('Publication type is required')
    .isIn([
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
    ])
    .withMessage('Invalid publication type'),

  body('content.abstract')
    .trim()
    .notEmpty()
    .withMessage('Abstract is required')
    .isLength({ min: 100, max: 1000 })
    .withMessage('Abstract must be between 100 and 1000 characters'),

  body('content.fullText')
    .trim()
    .notEmpty()
    .withMessage('Full text content is required')
    .isLength({ min: 1000 })
    .withMessage('Full text must be at least 1000 characters'),

  body('keywords')
    .isArray()
    .withMessage('Keywords must be an array')
    .custom((keywords) => keywords.length >= 3 && keywords.length <= 10)
    .withMessage('Must include between 3 and 10 keywords'),

  body('visibility')
    .optional()
    .isIn(['public', 'private', 'members_only'])
    .withMessage('Invalid visibility option'),

  body('publicationDetails.publicationDate')
    .notEmpty()
    .withMessage('Publication date is required')
    .isISO8601()
    .withMessage('Invalid publication date format'),

  body('publicationDetails.doi')
    .optional()
    .matches(/^10.\d{4,9}\/[-._;()\/:A-Z0-9]+$/i)
    .withMessage('Invalid DOI format'),

  body('citations')
    .optional()
    .isArray()
    .withMessage('Citations must be an array'),

  body('citations.*.reference')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Citation reference is required'),

  body('citations.*.year')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Invalid citation year'),

  handleValidationErrors
];

// Comment Validators
const validateComment = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ min: 2, max: 500 })
    .withMessage('Comment must be between 2 and 500 characters'),

  handleValidationErrors
];

// Search Query Validators
const validateSearch = [
  query('q')
    .trim()
    .notEmpty()
    .withMessage('Search query is required')
    .isLength({ min: 2 })
    .withMessage('Search query must be at least 2 characters long'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  handleValidationErrors
];

// Date Range Validators
const validateDateRange = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid start date format'),

  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid end date format')
    .custom((endDate, { req }) => {
      if (endDate && req.query.startDate && new Date(endDate) <= new Date(req.query.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  handleValidationErrors
];

module.exports = {
  validateBlog,
  validateCaseStudy,
  validatePublication,
  validateComment,
  validateSearch,
  validateDateRange,
  handleValidationErrors
};