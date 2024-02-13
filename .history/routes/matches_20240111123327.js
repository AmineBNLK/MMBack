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

const { protect } = require('../middleware/auth')

router.route('/').get(getMatches).post(protect, createMatch);

router.route('/:id').get(getMatch).put(protect, updateMatch).delete(protect, deleteMatch);

module.exports = router;
