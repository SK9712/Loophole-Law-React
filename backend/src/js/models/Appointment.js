const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  service: {
    type: String,
    required: [true, 'Please select a service'],
    enum: ['Corporate Law', 'Criminal Law', 'Family Law', 'Intellectual Property', 'Real Estate', 'Tax Law']
  },
  date: {
    type: Date,
    required: [true, 'Please select a date'],
    validate: {
      validator: function(value) {
        return value >= new Date().setHours(0, 0, 0, 0);
      },
      message: 'Appointment date cannot be in the past'
    }
  },
  time: {
    type: String,
    required: [true, 'Please select a time'],
    enum: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
  },
  client: {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxLength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      match: [/^[\d\s-+()]{10,}$/, 'Please provide a valid phone number']
    }
  },
  message: {
    type: String,
    trim: true,
    maxLength: [500, 'Message cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for efficient querying
appointmentSchema.index({ date: 1, time: 1 });
appointmentSchema.index({ 'client.email': 1 });
appointmentSchema.index({ status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);