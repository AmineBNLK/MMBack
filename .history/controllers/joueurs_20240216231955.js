const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Joueur = require('../models/Joueur');

// @desc    Get all matches
// @route   GET /api/v1/auth/matches
// @access  Private
exports.getMatches = asyncHandler(async (req, res, next) => {
  try {
    // Utilisez populate pour peupler les données des joueurs dans les matches
    const matches = await Match.find().populate({
      path: 'joueur',
      populate: { path: 'amis tempAmis' } // Peuple les données des amis et des amis temporaires
    });
    res.status(200).json({ success: true, count: matches.length, data: matches });
  } catch (err) {
    next(err); // Passez l'erreur au middleware d'erreur suivant
  }
});

// @desc    Get single user
// @route   GET /api/v1/auth/joueurs/:id
// @access  Private
exports.getJoueur = asyncHandler(async (req, res, next) => {
  const joueur = await Joueur.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: joueur,
  });
});

// @desc    Update user
// @route   PUT /api/v1/auth/joueurs/:id
// @access  Private
exports.updateJoueur = asyncHandler(async (req, res, next) => {
  const joueur = await Joueur.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: joueur,
  });
});

// @desc    Delete user
// @route   PUT /api/v1/auth/joueurs/:id
// @access  Private
exports.deleteJoueur = asyncHandler(async (req, res, next) => {
  await Joueur.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
