const Appointment = require('../models/Appointment');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
exports.createAppointment = asyncHandler(async (req, res, next) => {
  // Destructure required fields from request body
  const {
    service,
    date,
    time,
    name,
    email,
    phone,
    message
  } = req.body;

  // Check if slot is already booked
  const existingAppointment = await Appointment.findOne({
    date: new Date(date),
    time,
    status: { $ne: 'cancelled' }
  });

  if (existingAppointment) {
    return next(new ErrorResponse('This time slot is already booked', 400));
  }

  // Create appointment
  const appointment = await Appointment.create({
    service,
    date,
    time,
    client: {
      name,
      email,
      phone
    },
    message
  });

  res.status(201).json({
    success: true,
    data: appointment
  });
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find()
    .sort({ date: 1, time: 1 });

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

const { timeSlotUtils } = require('../utils/timeSlots');

// Update the createAppointment function to include slot validation
exports.createAppointment = asyncHandler(async (req, res, next) => {
  const {
    service,
    date,
    time,
    name,
    email,
    phone,
    message
  } = req.body;

  // Validate time slot
  if (!timeSlotUtils.isValidTimeSlot(time)) {
    return next(new ErrorResponse('Invalid time slot', 400));
  }

  // Check if date is in past
  if (timeSlotUtils.isPastDate(date)) {
    return next(new ErrorResponse('Cannot book appointments for past dates', 400));
  }

  // Check if date is weekend
  if (timeSlotUtils.isWeekend(date)) {
    return next(new ErrorResponse('Appointments are not available on weekends', 400));
  }

  // Calculate slot end time
  const slotEnd = timeSlotUtils.getSlotEndTime(time, service);

  // Check for conflicts
  const existingAppointment = await Appointment.findOne({
    date: {
      $gte: moment(date).startOf('day'),
      $lte: moment(date).endOf('day')
    },
    status: { $ne: 'cancelled' },
    time: time
  });

  if (existingAppointment) {
    return next(new ErrorResponse('This time slot is already booked', 400));
  }

  // Create appointment
  const appointment = await Appointment.create({
    service,
    date,
    time,
    client: {
      name,
      email,
      phone
    },
    message
  });

  res.status(201).json({
    success: true,
    data: appointment
  });
});