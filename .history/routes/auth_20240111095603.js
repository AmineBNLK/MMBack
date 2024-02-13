const express = require('express');
const { register } = require('../controllers/auth');

const router = express.Router();

router.post('/register', reg);

module.exports = router;
