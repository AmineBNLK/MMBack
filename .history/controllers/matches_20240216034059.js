const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Match = require('../models/Match');
const { trusted } = require('mongoose');

// // @desc    Get tous les matches
// // @route   GET /api/v1/matches
// // @access  Public

// exports.getMatches = asyncHandler(async (req, res, next) => {
//   let query;

//   // Copy req.query
//   const reqQuery = { ...req.query };

//   // Fields to exlude
//   const removeFields = ['select', 'sort', 'page', 'limit'];

//   // Loop over removefields and delete them from reqQuery
//   removeFields.forEach((param) => delete reqQuery[param]);

//   // Create query string
//   let queryStr = JSON.stringify(reqQuery);

//   // Create operators ($gt, $gte, ect...)
//   queryStr = queryStr.replace(
//     /\b(gt|gte|lt|lte|in)\b/g,
//     (match) => `$${match}`
//   );

//   // Finding resource
//   query = Match.find(JSON.parse(queryStr)).populate('joueur');

//   // Select Fields
//   if (req.query.select) {
//     const fields = req.query.select.split(',').join(' ');
//     query = query.select(fields);
//   }

//   // Sort
//   if (req.query.sort) {
//     const sortBy = req.query.sort.split(',').join(' ');
//     query = query.sort(sortBy);
//   } else {
//     query = query.sort('-createdAt');
//   }

//   // Pagination
//   const page = parseInt(req.query.page, 10) || 1;
//   const limit = parseInt(req.query.limit, 10);
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const total = await Match.countDocuments();

//   query = query.skip(startIndex).limit(limit);

//   // Executing our query
//   const matches = await query;

//   // Pagination result
//   const pagination = {};

//   if (endIndex < total) {
//     pagination.next = {
//       page: page + 1,
//       limit,
//     };
//   }
//   if (startIndex > 0) {
//     pagination.prev = {
//       page: page - 1,
//       limit,
//     };
//   }

//   res
//     .status(200)
//     .json({ success: true, count: matches.length, pagination, data: matches });
// });

// @desc    Get all matches
// @route   GET /api/v1/auth/matches
// @access  Private
exports.getMatches = asyncHandler(async (req, res, next) => {
  // Utiliser populate pour peupler les données des joueurs dans les matches
  const matches = await Match.find().populate('joueur');
  res.status(200).json(s);
});

// // @desc    Get all matches
// // @route   GET /api/v1/matches
// // @access  Public
// exports.getMatches = async (req, res, next) => {
//   try {
//     const matches = await Terrain.find();

//     res
//       .status(200)
//       .json({ success: true, count: matches.length, data: matches });
//   } catch (err) {
//     res.status(400).json({ success: false });
//   }
// };

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
  // req.body.joueur = req.joueur.id;
  // req.body.participants = [req.joueur.id];
  // Match.participants.push(req.user._id);

  // Rechercher le dernier match du joueur
  const lastMatch = await Match.findOne({ joueur: req.body.joueur }).sort(
    '-dateDuMatch'
  );

  if (lastMatch) {
    const date1 = new Date(lastMatch.dateDuMatch).getTime();

    // Date 2 (actuelle)
    const date2 = new Date().getTime();

    // Calcul de la différence en millisecondes
    const differenceInMilliseconds = date2 - date1;

    // Conversion de la différence en heures
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    console.log(differenceInHours);
    console.log(lastMatch);
    console.log(date2);
    console.log(date1);

    // Vérification si la différence est supérieure ou égale à 24 heures
    if (differenceInHours >= 24) {
      Match.create(req.body).then((match) => {
        res.status(201).json({
          success: true,
          data: match,
        });
      });
      console.log('La différence est de 24 heures ou plus.');
    } else {
      return next(
        new ErrorResponse(
          `Vous ne pouvez créer un nouveau match que 24 heures après votre dernier match.`,
          400
        )
      );
    }
  } else {
    Match.create(req.body).then((match) => {
      res.status(201).json({
        success: true,
        data: match,
      });
    });
  }
});

// @desc    Rejoindre un match
// @route   POST /api/v1/matches/:id/join
// @access  Privé

exports.joinMatch = asyncHandler(async (req, res, next) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    return next(
      new ErrorResponse(`Match not found with id of ${req.params.id}`, 400)
    );
  }

  // Vérifier si le joueur est déjà dans la liste des participants
  if (match.participants.includes(req.joueur.id)) {
    return next(new ErrorResponse(`Le joueur est déjà dans le match.`, 400));
  }

  // Vérifier si la liste de participants est pleine
  if (match.participants.length >= match.placeDisponible) {
    return next(new ErrorResponse(`Le match est déjà plein.`, 400));
  }

  // Ajouter le joueur à la liste des participants
  match.participants.push(req.joueur.id);
  await match.save();

  res.status(200).json({ success: true, data: match });
});

// @desc    Quitter un match
// @route   POST /api/v1/matches/:id/leave
// @access  Privé

exports.leaveMatch = asyncHandler(async (req, res, next) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    return next(
      new ErrorResponse(`Match not found with id of ${req.params.id}`, 400)
    );
  }

  // Vérifier si le joueur est dans la liste des participants
  if (!match.participants.includes(req.joueur.id)) {
    return next(new ErrorResponse(`Le joueur n'est pas dans le match.`, 400));
  }

  // Retirer le joueur de la liste des participants
  match.participants = match.participants.filter(
    (participant) => participant.toString() !== req.joueur.id
  );
  await match.save();

  res.status(200).json({ success: true, data: match });
});

// @desc    Update un seule matches
// @route   PUT /api/v1/matches/:id
// @access  Privé

exports.updateMatch = asyncHandler(async (req, res, next) => {
  let match = await Match.findById(req.params.id);

  if (!match) {
    return next(
      new ErrorResponse(`Match not found with id of ${req.params.id}`, 400)
    );
  }

  // Make sur user is bootcamp owner
  if (match.joueur.toString() !== req.joueur.id) {
    return next(
      new ErrorResponse(
        `le joueur ${req.params.id} n'est pas propriétaire`,
        400
      )
    );
  }

  match = await Match.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: match });
});

// @desc    Delete un seule matches
// @route   DELETE /api/v1/matches/:id
// @access  Public

exports.deleteMatch = asyncHandler(async (req, res, next) => {
  let match = await Match.findById(req.params.id);

  if (!match) {
    return next(
      new ErrorResponse(`Match not found with id of ${req.params.id}`, 400)
    );
  }

  // Make sur user is bootcamp owner
  if (match.joueur.toString() !== req.joueur.id) {
    return next(
      new ErrorResponse(
        `le joueur ${req.params.id} n'est pas propriétaire`,
        400
      )
    );
  }

  match = await Match.findByIdAndDelete(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: {} });
});
