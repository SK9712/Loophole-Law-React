const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/posts', require('./routes/postRoutes'));

app.use('/api/categories', require('./routes/categoryRoutes'));

app.use('/api/categories', require('./routes/categoryRoutes'));

app.use('/api', require('./routes/commentRoutes'));

// Add static file serving for uploads
app.use('/uploads', express.static('../public/uploads'));

// Add media routes
app.use('/api/media', require('./routes/mediaRoutes'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});