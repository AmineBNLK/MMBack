const express = require('express');
const router = express.Router();
const amis = require('../controllers/amis');

// Route pour envoyer une demande d'ami
router.post('/envoyer-demande', amis.envoyerDemandeAmi);

// Route pour accepter une demande d'ami
router.post('/accepter-demande', amis.accepterDemandeAmi);

module.exports = router;
