const Match = require('../models/Match');

// @desc    Get tous les matches
// @route   GET /api/v1/matches
// @access  Public

exports.getMatches = async (req, res, next) => {
  try {
    const matches = await Match.find();

    res.status(200).json({ success: true, data: matches });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get un seule matches
// @route   GET /api/v1/matches/:id
// @access  Public

exports.getMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: match });
  } catch (err) {
    res.status(400).json({ success: false });
  }
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

exports.updateMatch = async (req, res, next) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!match) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: match });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

// @desc    Delete un seule matches
// @route   DELETE /api/v1/matches/:id
// @access  Public

exports.deleteMatch = async (req, res, next) => {};
try {
  const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!match) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: match });
} catch (err) {
  return res.status(400).json({ success: false });
}
};