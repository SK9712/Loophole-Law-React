// controllers/clientController.js
const Client = require('../models/Client');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
exports.getClients = asyncHandler(async (req, res, next) => {
  let query = Client.find();

  // Search functionality
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    query = query.or([
      { name: { $regex: searchRegex } },
      { email: { $regex: searchRegex } },
      { company: { $regex: searchRegex } }
    ]);
  }

  // Filter by status
  if (req.query.status) {
    query = query.where('status').equals(req.query.status);
  }

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Client.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Execute query
  const clients = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: clients.length,
    pagination,
    data: clients
  });
});

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Private
exports.getClient = asyncHandler(async (req, res, next) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return next(new ErrorResponse(`Client not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: client
  });
});

// @desc    Create new client
// @route   POST /api/clients
// @access  Private
exports.createClient = asyncHandler(async (req, res, next) => {
  // Check if client with this email already exists
  const existingEmail = await Client.findOne({ email: req.body.email });
  
  if (existingEmail) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists'
    });
  }

  // Check if phone number exists (only if phone is provided)
  if (req.body.phone) {
    const existingPhone = await Client.findOne({ phone: req.body.phone });
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number already exists'
      });
    }
  }

  const client = await Client.create(req.body);

  res.status(201).json({
    success: true,
    data: client
  });
});

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
exports.updateClient = asyncHandler(async (req, res, next) => {
  let client = await Client.findById(req.params.id);

  if (!client) {
    return next(new ErrorResponse(`Client not found with id of ${req.params.id}`, 404));
  }

  // Check for duplicate email, excluding current client
  if (req.body.email) {
    const existingEmail = await Client.findOne({ 
      email: req.body.email,
      _id: { $ne: req.params.id } // Exclude current client
    });
    
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
  }

  // Check for duplicate phone if provided, excluding current client
  if (req.body.phone) {
    const existingPhone = await Client.findOne({ 
      phone: req.body.phone,
      _id: { $ne: req.params.id } // Exclude current client
    });
    
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number already exists'
      });
    }
  }

  // Update the client
  client = await Client.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    {
      new: true, // Return updated version
      runValidators: true // Run model validators
    }
  );

  res.status(200).json({
    success: true,
    data: client
  });
});

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private
exports.deleteClient = asyncHandler(async (req, res, next) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return next(new ErrorResponse(`Client not found with id of ${req.params.id}`, 404));
  }

  await client.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Update client last contact
// @route   PUT /api/clients/:id/contact
// @access  Private
exports.updateLastContact = asyncHandler(async (req, res, next) => {
  const client = await Client.findByIdAndUpdate(
    req.params.id,
    { lastContact: Date.now() },
    { new: true, runValidators: true }
  );

  if (!client) {
    return next(new ErrorResponse(`Client not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: client
  });
});