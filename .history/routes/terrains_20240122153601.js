const express = require('express');
const {
  getTerrains,
  getTerrain,
  createTerrain,
  updateTerrain,
  deleteTerrain,
} = require('../controllers/terrains');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/:id/photo').put

router
  .route('/')
  .get(getTerrains)
  .post(protect, authorize('Organisation'), createTerrain);

router.route('/:id').get(getTerrain).put(updateTerrain).delete(deleteTerrain);

module.exports = router;
