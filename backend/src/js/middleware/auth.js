// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const rateLimit = require('express-rate-limit');

/**
 * Authentication and Authorization Middleware
 */
const auth = {
  // Protect routes - Verify token and authenticate user
  protect: async (req, res, next) => {
    try {
      let token;

      // 1. Check if token exists in headers
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }
      // Check for token in cookies (for web clients)
      else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
      }

      if (!token) {
        return next(new AppError('Please authenticate to access this route', 401));
      }

      // 2. Verify token
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

      // 3. Check if user still exists
      const user = await User.findById(decoded.id).select(
        '+passwordChangedAt +active'
      );

      if (!user) {
        return next(new AppError('User no longer exists', 401));
      }

      // 4. Check if user is active
      if (!user.active) {
        return next(new AppError('User account has been deactivated', 401));
      }

      // 5. Check if user changed password after token was issued
      if (user.hasPasswordChanged(decoded.iat)) {
        return next(new AppError('User recently changed password. Please login again', 401));
      }

      // 6. Check token version (for forcing logout on all devices)
      if (user.tokenVersion !== decoded.version) {
        return next(new AppError('Session expired. Please login again', 401));
      }

      // Grant access to protected route
      req.user = user;
      res.locals.user = user; // For view templates if needed
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return next(new AppError('Invalid token. Please login again', 401));
      }
      if (error.name === 'TokenExpiredError') {
        return next(new AppError('Token expired. Please login again', 401));
      }
      next(error);
    }
  },

  // Restrict to specific roles
  authorize: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new AppError('You do not have permission to perform this action', 403));
      }
      next();
    };
  },

  // Optional authentication - doesn't require authentication but will process token if present
  optionalAuth: async (req, res, next) => {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
      }

      if (!token) {
        return next();
      }

      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('+active');

      if (user && user.active && !user.hasPasswordChanged(decoded.iat)) {
        req.user = user;
        res.locals.user = user;
      }

      next();
    } catch (error) {
      next();
    }
  },

  // Check if user is logged in (for rendered pages)
  isLoggedIn: async (req, res, next) => {
    try {
      if (req.cookies.jwt) {
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id).select('+active');
        if (!user || !user.active || user.hasPasswordChanged(decoded.iat)) {
          return next();
        }

        // User is logged in
        res.locals.user = user;
        return next();
      }
    } catch (error) {
      return next();
    }
    next();
  },

  // Restrict access to account owner
  restrictTo: (paramField = 'id') => {
    return (req, res, next) => {
      if (req.user.role === 'admin') return next();
      
      if (req.params[paramField] !== req.user.id) {
        return next(new AppError('You do not have permission to perform this action', 403));
      }
      next();
    };
  },

  // Verify API key for external services
  verifyApiKey: async (req, res, next) => {
    try {
      const apiKey = req.headers['x-api-key'];
      
      if (!apiKey) {
        return next(new AppError('API key is required', 401));
      }

      const user = await User.findOne({ apiKey }).select('+active');

      if (!user || !user.active) {
        return next(new AppError('Invalid API key', 401));
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },

  // Rate limiting for authentication attempts
  loginLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: 'Too many login attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false
  }),

  // Check permission for specific actions
  checkPermission: (action) => {
    return async (req, res, next) => {
      try {
        const user = await User.findById(req.user.id).populate('permissions');
        
        if (!user.hasPermission(action)) {
          return next(new AppError(`You do not have permission to ${action}`, 403));
        }
        
        next();
      } catch (error) {
        next(error);
      }
    };
  }
};

module.exports = auth;