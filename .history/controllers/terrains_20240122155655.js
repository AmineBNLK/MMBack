const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Terrain = require('../models/Terrain');

// @desc    Get all terrains
// @route   GET /api/v1/terrains
// @access  Public
exports.getTerrains = async (req, res, next) => {
  try {
    const terrains = await Terrain.find();

    res
      .status(200)
      .json({ success: true, count: terrains.length, data: terrains });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// J'AI MODIFIER LE 'Get single terrains' POUR LE ERROR HANDLING - Juste suis ce que t'as fait

// @desc    Get single terrains
// @route   GET /api/v1/terrains/:id/
// @access  Public
exports.getTerrain = asyncHandler(async (req, res, next) => {
  const terrain = await Terrain.findById(req.params.id);

  if (!terrain) {
    return next(
      new ErrorResponse(`Terrain not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: terrain });
});

// @desc    Create new terrains
// @route   POST /api/v1/terrains
// @access  Private
exports.createTerrain = async (req, res, next) => {
  req.body.joueur = req.joueur.id;

  const terrain = await Terrain.create(req.body);

  res.status(201).json({
    success: true,
    data: terrain,
  });
};

// @desc    Update terrains
// @route   PUT /api/v1/terrains/:id
// @access  Private
exports.updateTerrain = async (req, res, next) => {
  try {
    const terrain = await Terrain.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!terrain) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: terrain });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

// @desc    delete terrains
// @route   DELETE /api/v1/terrains/:id
// @access  Private
exports.deleteTerrain = async (req, res, next) => {
  try {
    const terrain = await Terrain.findByIdAndDelete(req.params.id);

    if (!terrain) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

// @desc    Upload photo for terrain
// @route   Put /api/v1/terrains/:id/photo
// @access  Private
exports.terrainPhotoUpload = asyncHandler(async (req, res, next) => {
  const terrain = await Terrain.findById(req.params.id);

  if (!terrain) {
    return next(
      new ErrorResponse(
        `Terrain avec l'id de ${req.params.id} n'existe pas`,
        404
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Ajouter un upload file`, 404));
  }



  const file = req.files.file;

   // Make sure the image is a photo
   if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }
});
