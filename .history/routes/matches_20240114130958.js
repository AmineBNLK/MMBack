const Joueur = require('../models/Joueur');

const express = require('express');
const {
  getMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
} = require('../controllers/matches');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getMatches)
  .post(protect, authorize('Joueur'), createMatch);

router
  .route('/:id')
  .get(getMatch)
  .put(protect, authorize('Joueur'), updateMatch)
  .delete(protect, authorize('Joueur', ''), deleteMatch);

module.exports = router;
