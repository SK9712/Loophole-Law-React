// controllers/caseStudyController.js
const CaseStudy = require('../models/caseStudyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const caseStudyController = {
  // @desc    Create new case study
  // @route   POST /api/case-studies
  // @access  Private/Attorney
  createCaseStudy: catchAsync(async (req, res) => {
    // Add advocate from authenticated user
    req.body.advocates = [req.user.id];
    
    const caseStudy = await CaseStudy.create(req.body);

    res.status(201).json({
      success: true,
      data: caseStudy
    });
  }),

  // @desc    Get all case studies with filtering, sorting, and pagination
  // @route   GET /api/case-studies
  // @access  Public
  getAllCaseStudies: catchAsync(async (req, res) => {
    // Build query
    let query = CaseStudy.find();

    // Advanced filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Filtering
    if (req.query.practiceArea) {
      query = query.where('practiceArea').equals(req.query.practiceArea);
    }

    if (req.query.court) {
      query = query.where('court').equals(req.query.court);
    }

    if (req.query.state) {
      query = query.where('courtLocation.state').equals(req.query.state);
    }

    if (req.query.status) {
      query = query.where('status').equals(req.query.status);
    }

    // Date range filtering
    if (req.query.startDate && req.query.endDate) {
      query = query.where('duration.filingDate').gte(req.query.startDate).lte(req.query.endDate);
    }

    // Search functionality
    if (req.query.search) {
      query = query.or([
        { title: { $regex: req.query.search, $options: 'i' } },
        { challenge: { $regex: req.query.search, $options: 'i' } },
        { solution: { $regex: req.query.search, $options: 'i' } }
      ]);
    }

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-duration.filingDate');
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
    const [caseStudies, total] = await Promise.all([
      query.exec(),
      CaseStudy.countDocuments(queryObj)
    ]);

    res.status(200).json({
      success: true,
      count: caseStudies.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total
      },
      data: caseStudies
    });
  }),

  // @desc    Get single case study
  // @route   GET /api/case-studies/:id
  // @access  Public
  getCaseStudy: catchAsync(async (req, res, next) => {
    const caseStudy = await CaseStudy.findById(req.params.id)
      .populate('advocates', 'name barCouncilId specialization');

    if (!caseStudy) {
      return next(new AppError('Case study not found', 404));
    }

    // Increment views
    caseStudy.views += 1;
    await caseStudy.save();

    res.status(200).json({
      success: true,
      data: caseStudy
    });
  }),

  // @desc    Update case study
  // @route   PUT /api/case-studies/:id
  // @access  Private/Attorney
  updateCaseStudy: catchAsync(async (req, res, next) => {
    let caseStudy = await CaseStudy.findById(req.params.id);

    if (!caseStudy) {
      return next(new AppError('Case study not found', 404));
    }

    // Check if user is an advocate for this case
    if (!caseStudy.advocates.includes(req.user.id) && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to update this case study', 403));
    }

    caseStudy = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: caseStudy
    });
  }),

  // @desc    Delete case study
  // @route   DELETE /api/case-studies/:id
  // @access  Private/Attorney
  deleteCaseStudy: catchAsync(async (req, res, next) => {
    const caseStudy = await CaseStudy.findById(req.params.id);

    if (!caseStudy) {
      return next(new AppError('Case study not found', 404));
    }

    // Check if user is an advocate for this case
    if (!caseStudy.advocates.includes(req.user.id) && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to delete this case study', 403));
    }

    await caseStudy.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  }),

  // @desc    Get case studies by practice area
  // @route   GET /api/case-studies/practice/:area
  // @access  Public
  getCaseStudiesByPracticeArea: catchAsync(async (req, res) => {
    const caseStudies = await CaseStudy.findByPracticeArea(req.params.area);

    res.status(200).json({
      success: true,
      count: caseStudies.length,
      data: caseStudies
    });
  }),

  // @desc    Get case studies by court
  // @route   GET /api/case-studies/court/:court
  // @access  Public
  getCaseStudiesByCourt: catchAsync(async (req, res) => {
    const caseStudies = await CaseStudy.findByCourt(
      req.params.court,
      req.query.state
    );

    res.status(200).json({
      success: true,
      count: caseStudies.length,
      data: caseStudies
    });
  }),

  // @desc    Get landmark cases
  // @route   GET /api/case-studies/landmark
  // @access  Public
  getLandmarkCases: catchAsync(async (req, res) => {
    const landmarkCases = await CaseStudy.getLandmarkCases();

    res.status(200).json({
      success: true,
      count: landmarkCases.length,
      data: landmarkCases
    });
  }),

  // @desc    Add document to case study
  // @route   POST /api/case-studies/:id/documents
  // @access  Private/Attorney
  addDocument: catchAsync(async (req, res, next) => {
    const caseStudy = await CaseStudy.findById(req.params.id);

    if (!caseStudy) {
      return next(new AppError('Case study not found', 404));
    }

    // Check authorization
    if (!caseStudy.advocates.includes(req.user.id) && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to add documents', 403));
    }

    caseStudy.documents.push(req.body);
    await caseStudy.save();

    res.status(200).json({
      success: true,
      data: caseStudy
    });
  }),

  // @desc    Get case statistics
  // @route   GET /api/case-studies/stats
  // @access  Private/Admin
  getCaseStats: catchAsync(async (req, res) => {
    const stats = await CaseStudy.aggregate([
      {
        $group: {
          _id: '$practiceArea',
          totalCases: { $sum: 1 },
          avgDuration: {
            $avg: {
              $subtract: ['$duration.disposalDate', '$duration.filingDate']
            }
          },
          successfulCases: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Disposed'] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { totalCases: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats
    });
  })
};

module.exports = caseStudyController;