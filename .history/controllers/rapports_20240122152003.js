const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Rapport = require('../models/Rapport');

// @desc    Envoyer un rapport
// @route   POST /api/v1/rapports
// @access  Privé
exports.envoyerRapport = asyncHandler(async (req, res, next) => {
  // Ajouter l'utilisateur à la requête
  req.body.utilisateur = req.joueur.id;

  const rapport = await Rapport.create(req.body);

  res.status(201).json({
    success: true,
    data: rapport,
  });
});

// @desc    Obtenir tous les rapports
// @route   GET /api/v1/rapports
// @access  Privé
exports.getRapports = asyncHandler(async (req, res, next) => {
  // Utilisez req.joueur.id pour obtenir l'ID de l'utilisateur authentifié
  const rapports = await Rapport.find({ utilisateur: req.joueur.id });

  res.status(200).json({
    success: true,
    count: rapports.length,
    data: rapports,
  });
});
