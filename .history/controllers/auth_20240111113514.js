const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Joueur = require('../models/Joueur');

// @desc    Register joueur
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const joueur = await Joueur.create({
    name,
    email,
    password,
    role,
  });

  // Create token
  const token = joueur.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc    Login joueur
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Validate email& password
    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    
    // Check for user
    const 
    // Create token
    const token = joueur.getSignedJwtToken();
  
    res.status(200).json({ success: true, token });
  });
