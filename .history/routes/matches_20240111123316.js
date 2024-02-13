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

router.route('/').get(getMatches).post(protect,createMatch);

router.route('/:id').get(getMatch).put(updateMatch).delete(deleteMatch);

module.exports = router;
