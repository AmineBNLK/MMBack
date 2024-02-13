const express = require('express');
const {
  getTournois,
  getTournoi,
  createTournoi,
  updateTournoi,
  deleteTournoi,
} = require('../controllers/tournois');

const router = express.Router();

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(getTournois)
  .post(protect('Organisation'), createTournoi);

router.route('/:id').get(getTournoi).put(updateTournoi).delete(deleteTournoi);

module.exports = router;
