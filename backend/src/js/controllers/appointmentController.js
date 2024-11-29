const Appointment = require('../models/Appointment');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
exports.createAppointment = asyncHandler(async (req, res, next) => {
  // Check if timeslot is available
  const isAvailable = await Appointment.isTimeSlotAvailable(
    req.body.appointmentDate,
    req.body.appointmentTime
  );

  if (!isAvailable) {
    return next(new ErrorResponse('This time slot is no longer available', 400));
  }

  const appointment = await Appointment.create(req.body);

  res.status(201).json({
    success: true,
    data: appointment
  });
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
exports.getAppointments = asyncHandler(async (req, res, next) => {
  // Build query
  const query = {};

  // Filter by status if provided
  if (req.query.status) {
    query.status = req.query.status;
  }

  // Filter by date range
  if (req.query.startDate && req.query.endDate) {
    query.appointmentDate = {
      $gte: new Date(req.query.startDate),
      $lte: new Date(req.query.endDate)
    };
  }

  // Filter by service
  if (req.query.service) {
    query.service = req.query.service;
  }

  const appointments = await Appointment.find(query)
    .sort({ appointmentDate: 1, appointmentTime: 1 });

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private/Admin
exports.getAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private/Admin
exports.updateAppointmentStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return next(new ErrorResponse('Invalid status', 400));
  }

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

exports.cancelAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id ${req.params.id}`, 404));
  }

  // Only allow cancellation of pending or confirmed appointments
  if (appointment.status === 'cancelled') {
    return next(new ErrorResponse('This appointment is already cancelled', 400));
  }

  appointment.status = 'cancelled';
  await appointment.save();

  res.status(200).json({
    success: true,
    data: appointment
  });
});

exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id ${req.params.id}`, 404));
  }

  // Prevent deletion of appointments that have already happened
  const appointmentDate = new Date(appointment.appointmentDate);
  const now = new Date();
  
  if (appointmentDate < now) {
    return next(
      new ErrorResponse(
        'Cannot delete past appointments',
        400
      )
    );
  }

  // If appointment is confirmed and within 24 hours, prevent deletion
  if (appointment.status === 'confirmed') {
    const hoursDifference = (appointmentDate - now) / (1000 * 60 * 60);
    
    if (hoursDifference < 24) {
      return next(
        new ErrorResponse(
          'Cannot delete confirmed appointments within 24 hours of scheduled time',
          400
        )
      );
    }
  }

  // If all checks pass, proceed with deletion
  await appointment.deleteOne();

  // Send success response
  res.status(200).json({
    success: true,
    data: {},
    message: 'Appointment deleted successfully'
  });
});

// @desc    Get today's appointments
// @route   GET /api/appointments/today
// @access  Private/Admin
exports.getTodayAppointments = asyncHandler(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const appointments = await Appointment.find({
    appointmentDate: {
      $gte: today,
      $lt: tomorrow
    }
  }).sort('appointmentTime');

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Get upcoming appointments
// @route   GET /api/appointments/upcoming
// @access  Private/Admin
exports.getUpcomingAppointments = asyncHandler(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const appointments = await Appointment.find({
    appointmentDate: { $gte: today },
    status: { $ne: 'cancelled' }
  })
    .sort({ appointmentDate: 1, appointmentTime: 1 })
    .limit(10);

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

exports.getAvailableSlots = asyncHandler(async (req, res, next) => {
  const { date } = req.query;

  if (!date) {
    return next(new ErrorResponse('Please provide a date', 400));
  }

  // Define all possible time slots
  const allTimeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  // Get all appointments for the specified date
  const appointments = await Appointment.find({
    appointmentDate: {
      $gte: new Date(date),
      $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
    },
    status: { $ne: 'cancelled' }
  });

  // Get booked time slots
  const bookedSlots = appointments.map(appointment => appointment.appointmentTime);

  // Filter out booked slots
  const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));

  res.status(200).json({
    success: true,
    data: availableSlots
  });
});