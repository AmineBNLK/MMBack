const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Joueur = require("../models/Joueur")

// @desc    Get all users
// @route   GET /api/v1/auth/joueurs
// @access  Private
// exports.getJoueurs = asyncHandler(async (req, res, next) => {
//   res.status(200).json(res.advancedResults);
// });

exports.getJoueurs = asyncHandler(async (req, res, next) => {
  const joueur = await Joueur.findById(req.body.user)
    .populate('amis') // Remplace les identifiants dans amis par les documents réels
    // .populate('tempAmis'); // Remplace les identifiants dans tempAmis par les documents réels
    // await joueur.populate('amis').execPopulate();

    res.status(200).json(res.advancedResults);
});

// exports.getJoueurs = asyncHandler(async (req, res, next) => {
//   const joueur = await Joueur.findById(req.body.user).populate("amis") // Remplace les identifiants dans amis par les documents réels

//   if (!joueur) {
//     return next(new ErrorResponse("Joueur non trouvé", 404))
//   }

//   // Récupérer les informations complètes des joueurs dans la liste amis
//   const amisWithInfo = await Promise.all(
//     joueur.amis.map(async (amiId) => {
//       return await Joueur.findById(amiId)
//     })
//   )

//   joueur.amis = amisWithInfo

//   res.status(200).json({
//     success: true,
//     data: joueur,
//   })
// })

// @desc    Get single user
// @route   GET /api/v1/auth/joueurs/:id
// @access  Private
exports.getJoueur = asyncHandler(async (req, res, next) => {
  const joueur = await Joueur.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: joueur,
  })
})

// @desc    Update user
// @route   PUT /api/v1/auth/joueurs/:id
// @access  Private
exports.updateJoueur = asyncHandler(async (req, res, next) => {
  const joueur = await Joueur.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: joueur,
  })
})

// @desc    Delete user
// @route   PUT /api/v1/auth/joueurs/:id
// @access  Private
exports.deleteJoueur = asyncHandler(async (req, res, next) => {
  await Joueur.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
