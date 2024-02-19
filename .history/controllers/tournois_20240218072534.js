const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Tournoi = require("../models/Tournoi")

// @desc    Get all tournois
// @route   GET /api/v1/tournois
// @access  Public
exports.getTournois = async (req, res, next) => {
  try {
    const tournois = await Tournoi.find().populate("joueur")

    res
      .status(200)
      .json({ success: true, count: tournois.length, data: tournois })
  } catch (err) {
    res.status(400).json({ success: false })
  }
}

// J'AI MODIFIER LE 'Get single tournois' POUR LE ERROR HANDLING - Juste suis ce que t'as fait

// @desc    Get single tournois
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getTournoi = asyncHandler(async (req, res, next) => {
  const tournoi = await Tournoi.findById(req.params.id)

  if (!tournoi) {
    return next(
      new ErrorResponse(`Tournoi not found with id of ${req.params.id}`, 400)
    )
  }

  res.status(200).json({ success: true, data: tournoi })
})

// @desc    Create new tournois
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createTournoi = asyncHandler(async (req, res, next) => {
  // req.body.joueur = req.joueur.id;

  // const tournoi = await Tournoi.create(req.body);

  Tournoi.create(req.body).then((tournoi) => {
    res.status(201).json({
      success: true,
      data: tournoi,
    })
  })
})

// @desc    Update tournois
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateTournoi = async (req, res, next) => {
  try {
    const tournoi = await Tournoi.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!tournoi) {
      return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: tournoi })
  } catch (err) {
    return res.status(400).json({ success: false })
  }
}

// @desc    delete tournois
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteTournoi = asyncHandler(async (req, res, next) => {
  let tournoi = await Tournoi.findById(req.params.id)

  if (!tournoi) {
    return next(
      new ErrorResponse(`tournoi not found with id of ${req.params.id}`, 400)
    )
  }

  tournoi = await Tournoi.findByIdAndDelete(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ success: true, data: {} })
})
