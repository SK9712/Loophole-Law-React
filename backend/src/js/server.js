const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS with options
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));

// Hide Express header
app.disable('x-powered-by');

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/posts', require('./routes/postRoutes'));

// Add static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Add to server.js
app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.use('/api/messages', require('./routes/messageRoutes'));

app.use('/api/clients', require('./routes/clientRoutes'));

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