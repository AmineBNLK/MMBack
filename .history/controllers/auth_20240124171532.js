const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Joueur = require('../models/Joueur');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

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
  sendTokenResponse(joueur, 200, res);
});

// @desc    Login joueur
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email& password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const joueur = await Joueur.findOne({ email }).select('+password');

  if (!joueur) {
    return next(new ErrorResponse('Invalid credentiels', 401));
  }

  // Check if password matches
  const isMatch = await joueur.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(joueur, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (joueur, statusCode, res) => {
  // Create token
  const token = joueur.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

// @desc    Get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const joueur = await Joueur.findById(req.joueur.id);

  res.status(200).json({
    success: true,
    date: joueur,
  });
});

// Google login

const GOOGLE_CLIENT_ID =
  '9546333874-0uoqhlj706fnd3fqluen6pjo337tmsq5.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/google/callback',
      passReqToCallback: true,
    },
   async function (request, accessToken, refreshToken, profile, done) {
      
    
    const user = await Joueur.findOne({
        googleId:profile.id
      })
     user ? done(null, profile): Joueur.create({
      googleId: 
     })
      
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
