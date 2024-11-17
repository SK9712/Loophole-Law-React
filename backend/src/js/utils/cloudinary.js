// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const AppError = require('./appError');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Folder mapping for different file types
const FOLDER_MAP = {
  profiles: 'loopholelaw/users/profiles',
  documents: 'loopholelaw/documents',
  cases: 'loopholelaw/cases',
  publications: 'loopholelaw/publications',
  verifications: 'loopholelaw/verifications',
  blogs: 'loopholelaw/blogs'
};

// File type restrictions
const FILE_RESTRICTIONS = {
  images: {
    allowed: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 2 * 1024 * 1024, // 2MB
    format: 'jpg,png,webp'
  },
  documents: {
    allowed: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    maxSize: 10 * 1024 * 1024, // 10MB
    format: 'pdf,doc,docx'
  }
};

// Upload configuration for different resource types
const uploadConfigs = {
  profileImage: {
    folder: FOLDER_MAP.profiles,
    allowed_formats: ['jpg', 'png', 'webp'],
    transformation: [
      { width: 400, height: 400, crop: 'fill' },
      { quality: 'auto' }
    ],
    public_id: (req, file) => `user-${req.user.id}-${Date.now()}`
  },
  caseDocument: {
    folder: FOLDER_MAP.cases,
    allowed_formats: ['pdf', 'doc', 'docx'],
    resource_type: 'raw',
    public_id: (req, file) => `case-${req.params.caseId}-${Date.now()}`
  },
  publicationFile: {
    folder: FOLDER_MAP.publications,
    allowed_formats: ['pdf'],
    resource_type: 'raw',
    public_id: (req, file) => `pub-${Date.now()}`
  }
};

// Cloudinary upload helper
const uploadToCloudinary = async (file, folder = 'general', options = {}) => {
  try {
    const uploadOptions = {
      folder: FOLDER_MAP[folder] || FOLDER_MAP.general,
      resource_type: 'auto',
      ...options
    };

    // If file is a path/string
    if (typeof file === 'string') {
      return await cloudinary.uploader.upload(file, uploadOptions);
    }

    // If file is a buffer
    return await cloudinary.uploader.upload(file.buffer, uploadOptions);
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new AppError('Error uploading file', 500);
  }
};

// Remove file from Cloudinary
const removeFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new AppError('Error deleting file', 500);
  }
};

// Generate Cloudinary URL with transformations
const generateUrl = (publicId, options = {}) => {
  try {
    return cloudinary.url(publicId, options);
  } catch (error) {
    console.error('Cloudinary URL generation error:', error);
    throw new AppError('Error generating URL', 500);
  }
};


// File filter function
const fileFilter = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`, 400), false);
  }
};

// Create upload middleware
const upload = {
  // Single file upload
  single: (fieldName, type = 'images') => 
    multer({
      storage,
      fileFilter: fileFilter(FILE_RESTRICTIONS[type].allowed),
      limits: {
        fileSize: FILE_RESTRICTIONS[type].maxSize
      }
    }).single(fieldName),

  // Multiple files upload
  array: (fieldName, maxCount, type = 'images') =>
    multer({
      storage,
      fileFilter: fileFilter(FILE_RESTRICTIONS[type].allowed),
      limits: {
        fileSize: FILE_RESTRICTIONS[type].maxSize,
        files: maxCount
      }
    }).array(fieldName, maxCount),

  // Multiple fields upload
  fields: (fields) =>
    multer({
      storage,
      fileFilter: (req, file, cb) => {
        const field = fields.find(f => f.name === file.fieldname);
        if (field) {
          fileFilter(FILE_RESTRICTIONS[field.type].allowed)(req, file, cb);
        } else {
          cb(new AppError('Invalid field name', 400), false);
        }
      },
      limits: {
        fileSize: Math.max(...fields.map(f => FILE_RESTRICTIONS[f.type].maxSize))
      }
    }).fields(fields)
};

// Advanced image transformations
const imageTransformations = {
  profile: {
    thumbnail: {
      width: 150,
      height: 150,
      crop: 'fill',
      quality: 'auto'
    },
    standard: {
      width: 400,
      height: 400,
      crop: 'fill',
      quality: 'auto'
    }
  },
  blog: {
    thumbnail: {
      width: 300,
      height: 200,
      crop: 'fill',
      quality: 'auto'
    },
    banner: {
      width: 1200,
      height: 600,
      crop: 'fill',
      quality: 'auto'
    }
  }
};

// Utility functions for handling Cloudinary responses
const utils = {
  // Extract public ID from Cloudinary URL
  getPublicId: (url) => {
    try {
      const splitUrl = url.split('/');
      const filename = splitUrl[splitUrl.length - 1];
      return filename.split('.')[0];
    } catch (error) {
      console.error('Error extracting public ID:', error);
      return null;
    }
  },

  // Get optimized URL for responsive images
  getResponsiveUrl: (publicId, options = {}) => {
    return cloudinary.url(publicId, {
      width: 'auto',
      crop: 'scale',
      quality: 'auto',
      fetch_format: 'auto',
      ...options
    });
  },

  // Generate signed URL for secure access
  getSignedUrl: (publicId, options = {}) => {
    return cloudinary.url(publicId, {
      sign_url: true,
      secure: true,
      ...options
    });
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  removeFromCloudinary,
  generateUrl,
  upload,
  imageTransformations,
  utils
};