// middleware/validateObjectId.js
const mongoose = require('mongoose');
const AppError = require('../utils/appError');

/**
 * Middleware to validate MongoDB ObjectId
 * Can validate multiple params in a single request
 * Supports custom parameter names and nested objects
 */
const validateObjectId = (paramNames = ['id']) => {
  return (req, res, next) => {
    try {
      // If paramNames is string, convert to array
      const paramsToValidate = Array.isArray(paramNames) ? paramNames : [paramNames];

      // Validate each parameter
      paramsToValidate.forEach(param => {
        // Handle nested params (e.g., 'user.id')
        const value = param.split('.').reduce((obj, key) => obj?.[key], req.params);

        if (!value) {
          throw new AppError(`Parameter ${param} is required`, 400);
        }

        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new AppError(`Invalid ObjectId format for parameter: ${param}`, 400);
        }

        // Normalize the ObjectId to ensure consistent format
        const normalizedId = new mongoose.Types.ObjectId(value).toString();
        
        // Update the parameter value with normalized ID
        if (param.includes('.')) {
          // Handle nested params
          const keys = param.split('.');
          const lastKey = keys.pop();
          const targetObj = keys.reduce((obj, key) => obj[key], req.params);
          targetObj[lastKey] = normalizedId;
        } else {
          req.params[param] = normalizedId;
        }
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to validate MongoDB ObjectId in request body
 * Useful for validating references in POST/PUT requests
 */
const validateObjectIdInBody = (fieldNames = []) => {
  return (req, res, next) => {
    try {
      fieldNames.forEach(field => {
        const value = req.body[field];
        
        // Skip if field is not provided (unless required is specified)
        if (!value && !field.required) {
          return;
        }

        // Handle array of ObjectIds
        if (Array.isArray(value)) {
          req.body[field] = value.map(id => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
              throw new AppError(`Invalid ObjectId format in ${field} array`, 400);
            }
            return new mongoose.Types.ObjectId(id).toString();
          });
          return;
        }

        // Handle single ObjectId
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new AppError(`Invalid ObjectId format for field: ${field}`, 400);
        }

        req.body[field] = new mongoose.Types.ObjectId(value).toString();
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to validate MongoDB ObjectId in query parameters
 * Useful for filtering by references
 */
const validateObjectIdInQuery = (queryParams = []) => {
  return (req, res, next) => {
    try {
      queryParams.forEach(param => {
        const value = req.query[param];
        
        // Skip if parameter is not provided
        if (!value) {
          return;
        }

        // Handle comma-separated IDs
        if (value.includes(',')) {
          req.query[param] = value.split(',').map(id => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
              throw new AppError(`Invalid ObjectId format in ${param} query parameter`, 400);
            }
            return new mongoose.Types.ObjectId(id).toString();
          });
          return;
        }

        // Handle single ObjectId
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new AppError(`Invalid ObjectId format for query parameter: ${param}`, 400);
        }

        req.query[param] = new mongoose.Types.ObjectId(value).toString();
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  validateObjectId,
  validateObjectIdInBody,
  validateObjectIdInQuery
};