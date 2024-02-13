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
// @access  PRivé
exports.getRapports = async (req, res, next) => {
  try {
    const rapports = await Rapport.find();

    res
      .status(200)
      .json({ success: true, count: rapports.length, data: rapports });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
