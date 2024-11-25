const Appointment = require('../models/Appointment');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { TIME_SLOTS, SERVICE_DURATIONS, timeSlotUtils } = require('../utils/timeSlots');
const moment = require('moment');

// @desc    Get available time slots for a specific date
// @route   GET /api/slots/available
// @access  Public
exports.getAvailableSlots = asyncHandler(async (req, res, next) => {
  const { date, service } = req.query;

  // Validate date
  if (!date) {
    return next(new ErrorResponse('Please provide a date', 400));
  }

  // Validate service
  if (!service || !SERVICE_DURATIONS[service]) {
    return next(new ErrorResponse('Please provide a valid service', 400));
  }

  // Check if date is in past
  if (timeSlotUtils.isPastDate(date)) {
    return next(new ErrorResponse('Cannot book appointments for past dates', 400));
  }

  // Check if date is weekend
  if (timeSlotUtils.isWeekend(date)) {
    return next(new ErrorResponse('Appointments are not available on weekends', 400));
  }

  // Get existing appointments for the date
  const existingAppointments = await Appointment.find({
    date: {
      $gte: moment(date).startOf('day'),
      $lte: moment(date).endOf('day')
    },
    status: { $ne: 'cancelled' }
  }).select('time service');

  // Calculate available slots
  const availableSlots = TIME_SLOTS.filter(slot => {
    // Check if slot is already booked
    for (const appointment of existingAppointments) {
      const appointmentStart = appointment.time;
      const appointmentEnd = timeSlotUtils.getSlotEndTime(
        appointmentStart,
        appointment.service
      );
      const newSlotEnd = timeSlotUtils.getSlotEndTime(slot, service);

      if (timeSlotUtils.hasTimeConflict(slot, newSlotEnd, appointmentStart, appointmentEnd)) {
        return false;
      }
    }
    return true;
  });

  res.status(200).json({
    success: true,
    data: availableSlots
  });
});

// @desc    Check if specific slot is available
// @route   POST /api/slots/check
// @access  Public
exports.checkSlotAvailability = asyncHandler(async (req, res, next) => {
  const { date, time, service } = req.body;

  // Validate inputs
  if (!date || !time || !service) {
    return next(new ErrorResponse('Please provide date, time and service', 400));
  }

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
  const conflictingAppointment = await Appointment.findOne({
    date: {
      $gte: moment(date).startOf('day'),
      $lte: moment(date).endOf('day')
    },
    status: { $ne: 'cancelled' },
    $or: [
      {
        time: {
          $gte: time,
          $lt: slotEnd
        }
      },
      {
        $expr: {
          $and: [
            { $lt: ['$time', time] },
            {
              $gt: [
                timeSlotUtils.getSlotEndTime('$time', '$service'),
                time
              ]
            }
          ]
        }
      }
    ]
  });

  res.status(200).json({
    success: true,
    available: !conflictingAppointment
  });
});