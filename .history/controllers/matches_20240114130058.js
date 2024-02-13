const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Match = require('../models/Match');

// @desc    Get tous les matches
// @route   GET /api/v1/matches
// @access  Public

exports.getMatches = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exlude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removefields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, ect...)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Match.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 2;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Match.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing our query
  const matches = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res
    .status(200)
    .json({ success: true, count: matches.length, pagination, data: matches });
});

// @desc    Get un seule matches
// @route   GET /api/v1/matches/:id
// @access  Public

exports.getMatch = asyncHandler(async (req, res, next) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    return next(
      new ErrorResponse(`Match not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: match });
});

// @desc    Create un seule matches
// @route   POST /api/v1/matches
// @access  Privé

exports.createMatch = asyncHandler(async (req, res, next) => {
  // Add user to to req.body
  req.body.joueur = req.joueur.id;

  // Check for published bootcamp
  const publishedMatch = await Match

  const match = await Match.create(req.body);

  res.status(201).json({
    success: true,
    data: match,
  });
});

// @desc    Update un seule matches
// @route   PUT /api/v1/matches/:id
// @access  Privé

exports.updateMatch = asyncHandler(async (req, res, next) => {
  const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!match) {
    return next(
      new ErrorResponse(`Match not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: match });
});

// @desc    Delete un seule matches
// @route   DELETE /api/v1/matches/:id
// @access  Public

exports.deleteMatch = asyncHandler(async (req, res, next) => {
  const match = await Match.findByIdAndDelete(req.params.id);

  if (!match) {
    return next(
      new ErrorResponse(`Match not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
