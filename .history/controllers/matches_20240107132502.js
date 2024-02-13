const Match = require('../models/Match');

// @desc    Get tous les matches
// @route   GET /api/v1/matches
// @access  Public

exports.getMatches = async (req, res, next) => {
  try 

  res.status(200).json({ success: true, msg: 'Afficher tous les matches' });
};

// @desc    Get un seule matches
// @route   GET /api/v1/matches/:id
// @access  Public

exports.getMatch = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Afficher un match ${req.params.id}` });
};

// @desc    Create un seule matches
// @route   POST /api/v1/matches
// @access  Privé

exports.createMatch = async (req, res, next) => {
  const match = await Match.create(req.body);

  res.status(201).json({
    success: true,
    data: match,
  });
};

// @desc    Update un seule matches
// @route   PUT /api/v1/matches/:id
// @access  Privé

exports.updateMatch = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Modifié un match ${req.params.id}` });
};

// @desc    Delete un seule matches
// @route   DELETE /api/v1/matches/:id
// @access  Public

exports.deleteMatch = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Supprimer un match ${req.params.id}` });
};
