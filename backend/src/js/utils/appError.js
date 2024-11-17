// utils/appError.js

class AppError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors;

    // Add timestamp
    this.timestamp = new Date().toISOString();

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  // Static helper methods for common errors
  static badRequest(message = 'Bad Request', errors = []) {
    return new AppError(message, 400, errors);
  }

  static unauthorized(message = 'Unauthorized access') {
    return new AppError(message, 401);
  }

  static forbidden(message = 'Forbidden access') {
    return new AppError(message, 403);
  }

  static notFound(message = 'Resource not found') {
    return new AppError(message, 404);
  }

  static validationError(errors) {
    return new AppError('Validation Error', 422, errors);
  }

  static serverError(message = 'Internal server error') {
    return new AppError(message, 500);
  }

  // Method to format error for response
  toJSON() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
      timestamp: this.timestamp,
      ...(process.env.NODE_ENV === 'development' && { stack: this.stack })
    };
  }

  // Helper methods to check error type
  isBadRequest() {
    return this.statusCode === 400;
  }

  isUnauthorized() {
    return this.statusCode === 401;
  }

  isForbidden() {
    return this.statusCode === 403;
  }

  isNotFound() {
    return this.statusCode === 404;
  }

  isValidationError() {
    return this.statusCode === 422;
  }

  // Method to handle MongoDB specific errors
  static handleMongoError(err) {
    if (err.name === 'CastError') {
      return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    }

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return new AppError(
        `Duplicate field value: ${field}. Please use another value.`,
        400
      );
    }

    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => ({
        field: error.path,
        message: error.message
      }));
      return new AppError('Validation failed', 422, errors);
    }

    return new AppError('Database error occurred', 500);
  }

  // Method to handle JWT errors
  static handleJWTError(err) {
    if (err.name === 'JsonWebTokenError') {
      return new AppError('Invalid token. Please log in again.', 401);
    }

    if (err.name === 'TokenExpiredError') {
      return new AppError('Your token has expired. Please log in again.', 401);
    }

    return new AppError('Authentication error', 401);
  }

  // Method to handle file upload errors
  static handleFileError(err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return new AppError('File size exceeds the limit', 400);
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return new AppError('Unexpected file field', 400);
    }

    return new AppError('File upload error', 400);
  }

  // Method to format validation errors
  static formatValidationErrors(errors) {
    return errors.map(error => ({
      field: error.path,
      message: error.msg || error.message
    }));
  }
}

module.exports = AppError;

// Example global error handler using AppError
const globalErrorHandler = (err, req, res, next) => {
  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR 💥:', {
      message: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString()
    });
  }

  // Handle specific error types
  let error = err;

  if (err.name === 'CastError' || err.name === 'ValidationError' || err.code === 11000) {
    error = AppError.handleMongoError(err);
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    error = AppError.handleJWTError(err);
  }

  if (err.code === 'LIMIT_FILE_SIZE' || err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = AppError.handleFileError(err);
  }

  // Send error response
  res.status(error.statusCode || 500).json(error.toJSON());
};

module.exports = {
  AppError,
  globalErrorHandler
};