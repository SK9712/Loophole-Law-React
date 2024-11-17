// controllers/publicationController.js
const Publication = require('../models/publicationModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const publicationController = {
  // @desc    Create new publication
  // @route   POST /api/publications
  // @access  Private/Author
  createPublication: catchAsync(async (req, res) => {
    // Add author from authenticated user
    const authorDetails = {
      name: req.user.name,
      designation: req.user.designation,
      organization: req.user.organization,
      authorId: req.user.id
    };
    
    req.body.authors = [authorDetails];
    
    const publication = await Publication.create(req.body);

    res.status(201).json({
      success: true,
      data: publication
    });
  }),

  // @desc    Get all publications with filtering, sorting, and pagination
  // @route   GET /api/publications
  // @access  Public
  getAllPublications: catchAsync(async (req, res) => {
    // Build query
    let query = Publication.find();

    // Basic filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Advanced filtering
    if (req.query.type) {
      query = query.where('type').equals(req.query.type);
    }

    if (req.query.category) {
      query = query.where('category').equals(req.query.category);
    }

    // Date range filtering
    if (req.query.startDate && req.query.endDate) {
      query = query.where('publicationDetails.publicationDate')
        .gte(new Date(req.query.startDate))
        .lte(new Date(req.query.endDate));
    }

    // Search functionality
    if (req.query.search) {
      query = query.or([
        { title: { $regex: req.query.search, $options: 'i' } },
        { 'content.abstract': { $regex: req.query.search, $options: 'i' } },
        { keywords: { $regex: req.query.search, $options: 'i' } }
      ]);
    }

    // Filter by visibility
    if (!req.user || req.user.role !== 'admin') {
      query = query.where('visibility').equals('public');
    }

    // Filter by status
    query = query.where('status').equals('published');

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-publicationDetails.publicationDate');
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Execute query
    const [publications, total] = await Promise.all([
      query.exec(),
      Publication.countDocuments(queryObj)
    ]);

    res.status(200).json({
      success: true,
      count: publications.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total
      },
      data: publications
    });
  }),

  // @desc    Get single publication
  // @route   GET /api/publications/:id
  // @access  Public/Private based on visibility
  getPublication: catchAsync(async (req, res, next) => {
    let query = Publication.findById(req.params.id);

    if (req.query.fields) {
      query = query.select(req.query.fields);
    }

    const publication = await query;

    if (!publication) {
      return next(new AppError('Publication not found', 404));
    }

    // Check visibility permissions
    if (publication.visibility !== 'public') {
      if (!req.user) {
        return next(new AppError('Please login to access this publication', 401));
      }
      if (publication.visibility === 'private' && 
          !publication.authors.some(author => author.authorId.toString() === req.user.id) && 
          req.user.role !== 'admin') {
        return next(new AppError('Not authorized to access this publication', 403));
      }
    }

    // Increment views
    await publication.incrementViews();

    res.status(200).json({
      success: true,
      data: publication
    });
  }),

  // @desc    Update publication
  // @route   PUT /api/publications/:id
  // @access  Private/Author
  updatePublication: catchAsync(async (req, res, next) => {
    let publication = await Publication.findById(req.params.id);

    if (!publication) {
      return next(new AppError('Publication not found', 404));
    }

    // Check if user is author
    if (!publication.authors.some(author => author.authorId.toString() === req.user.id) && 
        req.user.role !== 'admin') {
      return next(new AppError('Not authorized to update this publication', 403));
    }

    publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: publication
    });
  }),

  // @desc    Delete publication
  // @route   DELETE /api/publications/:id
  // @access  Private/Author
  deletePublication: catchAsync(async (req, res, next) => {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return next(new AppError('Publication not found', 404));
    }

    // Check if user is author
    if (!publication.authors.some(author => author.authorId.toString() === req.user.id) && 
        req.user.role !== 'admin') {
      return next(new AppError('Not authorized to delete this publication', 403));
    }

    await publication.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  }),

  // @desc    Add comment to publication
  // @route   POST /api/publications/:id/comments
  // @access  Private
  addComment: catchAsync(async (req, res, next) => {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return next(new AppError('Publication not found', 404));
    }

    await publication.addComment(req.user.id, req.body.content);

    res.status(201).json({
      success: true,
      data: publication
    });
  }),

  // @desc    Get publications by category
  // @route   GET /api/publications/category/:category
  // @access  Public
  getPublicationsByCategory: catchAsync(async (req, res) => {
    const publications = await Publication.findByCategory(req.params.category);

    res.status(200).json({
      success: true,
      count: publications.length,
      data: publications
    });
  }),

  // @desc    Get latest publications
  // @route   GET /api/publications/latest
  // @access  Public
  getLatestPublications: catchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 5;
    const publications = await Publication.getLatestPublications(limit);

    res.status(200).json({
      success: true,
      count: publications.length,
      data: publications
    });
  }),

  // @desc    Get publication statistics
  // @route   GET /api/publications/stats
  // @access  Private/Admin
  getPublicationStats: catchAsync(async (req, res) => {
    const stats = await Publication.aggregate([
      {
        $group: {
          _id: '$category',
          totalPublications: { $sum: 1 },
          avgViews: { $avg: '$metrics.views' },
          avgDownloads: { $avg: '$metrics.downloads' },
          totalCitations: { $sum: '$metrics.citations' }
        }
      },
      {
        $sort: { totalPublications: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats
    });
  }),

  // @desc    Download publication
  // @route   GET /api/publications/:id/download
  // @access  Public/Private based on visibility
  downloadPublication: catchAsync(async (req, res, next) => {
    const publication = await Publication.findById(req.params.id);

    if (!publication) {
      return next(new AppError('Publication not found', 404));
    }

    // Check visibility permissions
    if (publication.visibility !== 'public') {
      if (!req.user) {
        return next(new AppError('Please login to download this publication', 401));
      }
      if (publication.visibility === 'private' && 
          !publication.authors.some(author => author.authorId.toString() === req.user.id) && 
          req.user.role !== 'admin') {
        return next(new AppError('Not authorized to download this publication', 403));
      }
    }

    // Increment downloads
    await publication.incrementDownloads();

    // Return download URL or file
    res.status(200).json({
      success: true,
      data: {
        downloadUrl: publication.downloadOptions.pdfUrl
      }
    });
  })
};

module.exports = publicationController;