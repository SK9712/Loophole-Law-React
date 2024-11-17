
/**
 * Wrapper function to catch async errors in route handlers
 * Eliminates the need for try-catch blocks in controllers
 * @param {Function} fn - Async function to be wrapped
 * @returns {Function} Express middleware function
 */
const catchAsync = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(error => {
        // Log the error for debugging
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          path: req.path,
          method: req.method,
          body: req.body,
          params: req.params,
          query: req.query,
          timestamp: new Date().toISOString()
        });

        // Pass error to express error handler
        next(error);
      });
  };
};

module.exports = catchAsync;