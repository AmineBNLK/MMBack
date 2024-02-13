const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Joueur = require('../models/Joueur');

// @desc    Register joueur
// @route   GET /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const joueur = await Joueur.create({
    name,
    email,
    password,
    role
  });

  res.status(200).json({ success: true })
});
