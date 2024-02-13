const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Joueur = require('../models/Joueur');

// @desc    Register joueur
// @route   GET /api/v1/auth/register
// @access  Public

