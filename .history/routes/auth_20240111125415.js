const express = require('express');
const { register, login, getMe } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../')

router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);

module.exports = router;
