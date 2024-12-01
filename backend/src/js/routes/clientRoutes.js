// routes/clientRoutes.js
const express = require('express');
const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  updateLastContact,
  getClientStats
} = require('../controllers/clientController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize('admin', 'lawyer'));

router
  .route('/')
  .get(getClients)
  .post(createClient);

router.get('/stats', protect, authorize('admin'), getClientStats);

router
  .route('/:id')
  .get(getClient)
  .put(updateClient)
  .delete(deleteClient);

router.route('/:id/contact').put(updateLastContact);

module.exports = router;