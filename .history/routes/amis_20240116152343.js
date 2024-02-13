// const express = require('express');
// const router = express.Router();
// const amis = require('../controllers/amis');

// // Route pour envoyer une demande d'ami
// router.post('/envoyer', amis.envoyerDemandeAmi);

// // Route pour accepter une demande d'ami
// router.post('/accepter', amis.accepterDemandeAmi);

// // // Route pour accepter une demande d'ami
// // router.post('/supprimer', amis.accepterDemandeAmi);

// module.exports = router;





const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  envoyerDemandeAmi,
  accepterDemandeAmi,
  refuserDemandeAmi,
} = require('../controllers/amis');

// Route pour envoyer une demande d'amitié
router.post('/envoyer', protect, envoyerDemandeAmi);

// Route pour accepter une demande d'amitié
router.post('/accepter', protect, accepterDemandeAmi);

// Route pour refuser une demande d'amitié
router.post('/refuser', protect, refuserDemandeAmi);

module.exports = router;

