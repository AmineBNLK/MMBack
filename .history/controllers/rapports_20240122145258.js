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
// @access  Admin (ajuster selon vos besoins)
exports.getRapports = asyncHandler(async (req, res, next) => {
  // Vérifier si l'utilisateur est un administrateur (ajuster selon vos besoins)
  if (req.joueur.role !== 'Admin') {
    return next(
      new ErrorResponse(
        "Vous n'êtes pas autorisé à accéder à cette ressource",
        403
      )
    );
  }

  const rapports = await Rapport.find();

  res.status(200).json({
    success: true,
    count: rapports.length,
    data: rapports,
  });
});
