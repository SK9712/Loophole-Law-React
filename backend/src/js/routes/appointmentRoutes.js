const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointment
} = require('../controllers/appointmentController');

router.route('/appointments')
  .post(createAppointment)
  .get(getAppointments);

router.route('/appointments/:id')
  .get(getAppointment);

module.exports = router;