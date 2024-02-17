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

const Match = require('../models/Match');
const advancedResults = require('../middleware/advancedResults');

const { authorize } = require('../middleware/auth');

router.route('/').get(getMatches).post(createMatch);

router
  .route('/:id')
  .get(getMatch)
  .put( updateMatch)
  .delete(authorize('Joueur', 'Admin'), deleteMatch);

router.route('/:id/join').post(joinMatch);

router.route('/:id/leave').post(leaveMatch);

module.exports = router;
