const express = require('express');
const { register, login } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', me);



module.exports = router;
