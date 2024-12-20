const Message = require('../models/Message');
const asyncHandler = require('../middleware/async');

// @desc    Create new message
// @route   POST /api/messages
// @access  Public
exports.createMessage = asyncHandler(async (req, res) => {
  const message = await Message.create(req.body);
  
  res.status(201).json({
    success: true,
    data: message
  });
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
exports.getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort('-createdAt');
  
  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages
  });
});

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private/Admin
exports.getMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  
  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  res.status(200).json({
    success: true,
    data: message
  });
});

// @desc    Update message status
// @route   PATCH /api/messages/:id/status
// @access  Private/Admin
exports.updateMessageStatus = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  res.status(200).json({
    success: true,
    data: message
  });
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
exports.deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get message stats
// @route   GET /api/messages/stats
// @access  Private/Admin
exports.getMessageStats = asyncHandler(async (req, res) => {
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  // Get unread messages from this month
  const currentMonthMessages = await Message.countDocuments({
    status: 'unread',
    createdAt: { $gte: thisMonth }
  });

  // Get unread messages from last month
  const lastMonthMessages = await Message.countDocuments({
    status: 'unread',
    createdAt: {
      $gte: lastMonth,
      $lt: thisMonth
    }
  });

  // Calculate percentage change
  const change = lastMonthMessages === 0 
    ? 100 
    : ((currentMonthMessages - lastMonthMessages) / lastMonthMessages) * 100;

  res.json({
    success: true,
    data: {
      total: currentMonthMessages,
      change: Number(change.toFixed(1))
    }
  });
});