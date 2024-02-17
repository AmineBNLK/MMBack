const express = require('express');
const {
  getJoueur,
  getJoueur,
  updateJoueur,
  deleteJoueur,
} = require('../controllers/joueurs');

const Joueur = require('../models/Joueur');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(advancedResults(Joueur), getJoueurs);

router.route('/:id').get(getJoueur).put(updateJoueur).delete(deleteJoueur);

module.exports = router;
