const express = require('express');
const router = express.Router();
const {
  getAvailableSlots,
  checkSlotAvailability
} = require('../controllers/slotController');

router.get('/slots/available', getAvailableSlots);
router.post('/slots/check', checkSlotAvailability);

module.exports = router;