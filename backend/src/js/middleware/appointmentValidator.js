const ErrorResponse = require('../utils/errorResponse');

const validateAppointment = async (req, res, next) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      service,
      appointmentDate,
      appointmentTime,
      message,
    } = req.body;

    const errors = [];

    // Name validation
    if (!clientName || clientName.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!clientEmail || !emailRegex.test(clientEmail)) {
      errors.push('Please provide a valid email address');
    }

    // Phone validation
    const phoneRegex = /^[\d\s()-]+$/;
    const cleanPhone = clientPhone?.replace(/\D/g, '');
    if (!clientPhone || !phoneRegex.test(clientPhone) || cleanPhone.length < 10) {
      errors.push('Please provide a valid phone number');
    }

    // Service validation
    const validServices = [
      'Corporate Law',
      'Criminal Law',
      'Family Law',
      'Intellectual Property',
      'Real Estate',
      'Tax Law'
    ];
    if (!service || !validServices.includes(service)) {
      errors.push('Please select a valid service');
    }

    // Date validation
    const appointmentDateTime = new Date(appointmentDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (!appointmentDate || appointmentDateTime < now) {
      errors.push('Appointment date must be in the future');
    }

    // Time validation
    const validTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
    if (!appointmentTime || !validTimes.includes(appointmentTime)) {
      errors.push('Please select a valid appointment time');
    }

    // Validate business hours (Monday-Friday)
    if (appointmentDateTime.getDay() === 0 || appointmentDateTime.getDay() === 6) {
      errors.push('Appointments are only available Monday through Friday');
    }

    // Message validation
    if (!message || message.trim().length < 10) {
      errors.push('Please provide more details about your case (minimum 10 characters)');
    }

    if (errors.length > 0) {
      return next(new ErrorResponse(errors.join('. '), 400));
    }

    next();
  } catch (error) {
    next(new ErrorResponse('Invalid appointment data', 400));
  }
};

module.exports = validateAppointment;