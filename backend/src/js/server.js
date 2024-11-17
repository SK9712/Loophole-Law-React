// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// Load env vars
dotenv.config();

// Initialize express
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true, // Build indexes
    maxPoolSize: 10 // Maintain up to 10 socket connections
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Sanitize data
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration',
        'category',
        'practiceArea',
        'court',
        'status',
        'type'
    ]
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Compression
app.use(compression());

// Set static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const blogRoutes = require('./routes/blogRoutes');
const caseStudyRoutes = require('./routes/caseStudyRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const userRoutes = require('./routes/userRoutes');

// API Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy',
        time: new Date().toISOString(),
        nodeEnv: process.env.NODE_ENV
    });
});

// Handle unhandled routes
app.all('*', (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.status = 'fail';
    error.statusCode = 404;
    next(error);
});

// Graceful shutdown handler
const gracefulShutdown = () => {
    console.log('Received shutdown signal. Starting graceful shutdown...');
    
    // Close MongoDB connection
    mongoose.connection.close(false)
        .then(() => {
            console.log('MongoDB connection closed.');
            process.exit(0);
        })
        .catch(err => {
            console.error('Error during MongoDB shutdown:', err);
            process.exit(1);
        });

    // If server hasn't finished in 10 seconds, shut down process
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

// Setup file upload directories
const setupUploadDirectories = () => {
    const directories = [
        'uploads',
        'uploads/blogs',
        'uploads/case-studies',
        'uploads/publications',
        'uploads/profiles'
    ];

    directories.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        if (!require('fs').existsSync(dirPath)) {
            require('fs').mkdirSync(dirPath, { recursive: true });
        }
    });
};

// Initialize upload directories
setupUploadDirectories();

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// Handle termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = app;