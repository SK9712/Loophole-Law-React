const moment = require('moment');

// Define business hours and time slots
const BUSINESS_HOURS = {
  start: 9, // 9 AM
  end: 17,  // 5 PM
  lunchStart: 12, // 12 PM
  lunchEnd: 14,   // 2 PM
};

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

// Duration in minutes for each type of appointment
const SERVICE_DURATIONS = {
  'Corporate Law': 90,
  'Criminal Law': 60,
  'Family Law': 60,
  'Intellectual Property': 60,
  'Real Estate': 60,
  'Tax Law': 90,
};

// Helper functions for time slot management
const timeSlotUtils = {
  isWeekend(date) {
    const day = moment(date).day();
    return day === 0 || day === 6;
  },

  isBusinessHour(time) {
    const hour = moment(time, 'hh:mm A').hour();
    return (
      (hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.lunchStart) ||
      (hour >= BUSINESS_HOURS.lunchEnd && hour < BUSINESS_HOURS.end)
    );
  },

  isPastDate(date) {
    return moment(date).startOf('day').isBefore(moment().startOf('day'));
  },

  isValidTimeSlot(time) {
    return TIME_SLOTS.includes(time);
  },

  getSlotEndTime(startTime, service) {
    const duration = SERVICE_DURATIONS[service];
    return moment(startTime, 'hh:mm A').add(duration, 'minutes').format('hh:mm A');
  },

  hasTimeConflict(slot1Start, slot1End, slot2Start, slot2End) {
    return (
      (moment(slot1Start, 'hh:mm A').isBefore(moment(slot2End, 'hh:mm A')) &&
        moment(slot1End, 'hh:mm A').isAfter(moment(slot2Start, 'hh:mm A')))
    );
  }
};

module.exports = {
  BUSINESS_HOURS,
  TIME_SLOTS,
  SERVICE_DURATIONS,
  timeSlotUtils
};