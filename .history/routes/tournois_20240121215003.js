const express = require('express');
const {
  getTournois,
  getTournoi,
  createTournoi,
  updateTournoi,
  deleteTournoi,
} = require('../controllers/tournois');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getTournois)
  .post(protect, authorize('Organisation'), createTournoi);

router.route('/:id').get(getTournoi).put(updateTournoi).delete(deleteTournoi);

module.exports = router;
