const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Joueur = require('../models/Joueur');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let yoken;

    if(req.headers.authorization && req.headers.authorization.stratsWith('Bearer')
    ) {
token = req.headers.authorization.split(' ')[1]
}
// else if(req.cookies.token) {
//     token = req.cookies.token
// }

// Make sure token exists
if(!token) {
    return next(new ErrorResponse('Not authorize to access this route'))
}
})