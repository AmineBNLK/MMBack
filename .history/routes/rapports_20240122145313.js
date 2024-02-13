const express = require('express');
const {
  envoyerRapport,
  getRapports,
} = require('../controllers/rapports');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, envoyerRapport)
  .get(protect, authorize('Admin'), getRapports);

module.exports = router;
