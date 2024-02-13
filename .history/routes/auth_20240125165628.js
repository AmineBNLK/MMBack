const express = require('express');
const { register, login, getMe, logout } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

router.get('/login', (req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
  });
  

module.exports = router;
