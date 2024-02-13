const Joueur = require('../models/Joueur');

const express = require('express');
const {
  getMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
  joinMatch,
  leaveMatch,
} = require('../controllers/matches');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getMatches).post(createMatch);

router
  .route('/:id')
  .get(getMatch)
  .put(protect, authorize('Joueur'), updateMatch)
  .delete(protect, authorize('Joueur', 'Admin'), deleteMatch);

router.route('/:id/join').post(prot joinMatch);

router.route('/:id/leave').post(protect, leaveMatch);

module.exports = router;
