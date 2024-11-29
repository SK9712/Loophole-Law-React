const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  clientEmail: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    trim: true,
    lowercase: true
  },
  clientPhone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    match: [/^[\d\s()-]+$/, 'Please provide a valid phone number']
  },
  service: {
    type: String,
    required: [true, 'Please select a service'],
    enum: ['Corporate Law', 'Criminal Law', 'Family Law', 'Intellectual Property', 'Real Estate', 'Tax Law']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Please select an appointment date'],
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'Appointment date must be in the future'
    }
  },
  appointmentTime: {
    type: String,
    required: [true, 'Please select an appointment time'],
    enum: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
  },
  message: {
    type: String,
    required: [true, 'Please provide details about your case'],
    trim: true
  },
  isEmergency: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for efficient queries
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 }, { unique: true });

// Method to check if timeslot is available
appointmentSchema.statics.isTimeSlotAvailable = async function(date, time) {
  const existingAppointment = await this.findOne({
    appointmentDate: date,
    appointmentTime: time,
    status: { $ne: 'cancelled' }
  });
  return !existingAppointment;
};

module.exports = mongoose.model('Appointment', appointmentSchema);