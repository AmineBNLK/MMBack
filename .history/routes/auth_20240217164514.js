const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  updateDetails,
  updatePassword,
  joueurPhotoUpload,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/:id/photo').put(joueurPhotoUpload);

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.get('/logout', logout);

module.exports = router;
