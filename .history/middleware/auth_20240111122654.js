const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Joueur = require('../models/Joueur');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let yoken;

    if(req.headers.authorization && req.headers.authorization.stratsWith('Bearer')
    ) {
token}
})