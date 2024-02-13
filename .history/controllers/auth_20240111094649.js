const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Joueur = require('../models/Joueur');

// @desc    Get tous les matches
// @route   GET /api/v1/matches
// @access  Public
