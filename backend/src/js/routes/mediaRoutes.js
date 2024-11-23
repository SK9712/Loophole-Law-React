const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  uploadMedia,
  getMediaFiles,
  getMediaFile,
  deleteMedia
} = require('../controllers/mediaController');

router.route('/')
  .get(protect, getMediaFiles)
  .post(protect, upload.single('file'), uploadMedia);

router.route('/:id')
  .get(protect, getMediaFile)
  .delete(protect, deleteMedia);

module.exports = router;