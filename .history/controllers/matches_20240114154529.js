const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Match = require('../models/Match');
const moment = require('moment');

// @desc    Get tous les matches
// @route   GET /api/v1/matches
// @access  Public

exports.getMatches = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exlude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removefields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, ect...)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Match.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 2;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Match.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing our query
  const matches = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res
    .status(200)
    .json({ success: true, count: matches.length, pagination, data: matches });
});

// @desc    Get un seule matches
// @route   GET /api/v1/matches/:id
// @access  Public

exports.getMatch = asyncHandler(async (req, res, next) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    return next(
      new ErrorResponse(`Match not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: match });
});

// @desc    Create un seule matches
// @route   POST /api/v1/matches
// @access  Privé

exports.createMatch = asyncHandler(async (req, res, next) => {
  // Add user to to req.body
  req.body.joueur = req.joueur.id;

  // Rechercher le dernier match du joueur
  const lastMatch = await Match.findOne({ joueur: req.joueur.id }).sort(
    '-dateDuMatch'
  );

  const date1 = lastMatch && new Date(lastMatch.dateDuMatch).getTime()

  // Date 2 (actuelle)

  const date2 = new Date().getTime();

  // Ajouter une heure pour obtenir UTC+1
  const date2UTCPlus1 = date2 + 3600 * 1000;

  // Calcul de la différence en millisecondes
  const differenceInMilliseconds = date2UTCPlus1 - date1;

  // Conversion de la différence en heures
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  console.log(differenceInHours);

  // Vérification si la différence est supérieure ou égale à 24 heures
  if (differenceInHours >= 24) {
    console.log('La différence est de 24 heures ou plus.');
    const match = await Match.create(req.body);
    res.status(201).json({
      success: true,
      data: match,
    });
  } else {
    console.log('La différence est inférieure à 24 heures.');
  }
});

// // Check for published bootcamp
// const publishedMatch = await Match.findOne({ joueur: req.joueur.id });

// If the user is not an admin, they can only add one match
// if (lastMatch) {
//   console.log(new Date(lastMatch.dateDuMatch));
//   return next(
//     new ErrorResponse(
//       `The user with ID ${req.joueur.id} has already published a match`,
//       400
//     )
//   );
// }
// console.log(lastMatch.dateDuMatch)

// // Vérifier s'il y a un dernier match et si cela fait moins de 24 heures
// if (
//   lastMatch &&
//   moment().diff(lastMatch.date, 'hours') < 24 &&
//   req.joueur.role !== 'admin'
// ) {
//   return next(
//     new ErrorResponse(
//       `Vous ne pouvez créer un nouveau match que 24 heures après votre dernier match.`,
//       400
//     )
//   );
// }

// @desc    Update un seule matches
// @route   PUT /api/v1/matches/:id
// @access  Privé

exports.updateMatch = asyncHandler(async (req, res, next) => {
  const match = await Match.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!match) {
    return next(
      new ErrorResponse(`Match not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: match });
});

// @desc    Delete un seule matches
// @route   DELETE /api/v1/matches/:id
// @access  Public

exports.deleteMatch = asyncHandler(async (req, res, next) => {
  const match = await Match.findByIdAndDelete(req.params.id);

  if (!match) {
    return next(
      new ErrorResponse(`Match not found with id of ${req.params.id}`, 400)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
