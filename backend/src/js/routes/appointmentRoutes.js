const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointment,
  getTodayAppointments,
  getUpcomingAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  deleteAppointment,
  getAvailableSlots,
  getAppointmentStats
} = require('../controllers/appointmentController');

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/', createAppointment);
router.get('/available-slots', getAvailableSlots);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin', 'author'));

router.route('/').get(getAppointments);
router.route('/today').get(getTodayAppointments);
router.route('/upcoming').get(getUpcomingAppointments);

router.get('/stats', protect, authorize('admin'), getAppointmentStats);

router.route('/:id')
  .get(getAppointment);

router.route('/:id/status')
  .put(updateAppointmentStatus);

router.route('/:id')
  .delete(deleteAppointment);

module.exports = router;