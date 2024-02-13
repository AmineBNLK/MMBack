const express = require('express');
const router = express.Router();
const amisController = require('../c');

// Route pour envoyer une demande d'ami
router.post('/envoyer-demande', amisController.envoyerDemandeAmi);

// Route pour accepter une demande d'ami
router.post('/accepter-demande', amisController.accepterDemandeAmi);

module.exports = router;
