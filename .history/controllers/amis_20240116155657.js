const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Joueur = require('../models/Joueur');

exports.envoyerDemandeAmi = async (req, res, next) => {
  try {
    const { utilisateurId, amiId } = req.body;

    const utilisateur = await Joueur.findById(utilisateurId);
    const ami = await Joueur.findById(amiId);

    if (!utilisateur || !ami) {
      return res
        .status(404)
        .json({ message: 'Utilisateur ou ami non trouvé.' });
    }

    // Votre logique pour envoyer une demande d'ami
    await ami.ajouterAmiTemporaire(utilisateurId);

    res.status(200).json({ message: "Demande d'ami envoyée avec succès." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.accepterDemandeAmi = async (req, res, next) => {
  try {
    const { utilisateurId, amiId } = req.body;

    const utilisateur = await Joueur.findById(utilisateurId);

    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Votre logique pour accepter une demande d'ami
    await utilisateur.accepterAmiTemporaire(amiId);

    res.status(200).json({ message: "Demande d'ami acceptée avec succès." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.refuserDemandeAmi = async (req, res, next) => {
  try {
    const { utilisateurId, amiId } = req.body;

    const utilisateur = await Joueur.findById(utilisateurId);

    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Votre logique pour refuser une demande d'ami
    await utilisateur.refuserAmiTemporaire(amiId);

    res.status(200).json({ message: "Demande d'ami refusée avec succès." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.supprimerAmiPermanent = async (req, res, next) => {
    try {
      const { utilisateurId, amiId } = req.body;
  
      const utilisateur = await Joueur.findById(utilisateurId);
  
      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      // Appeler la nouvelle méthode pour supprimer l'ami mutuellement
      await utilisateur.supprimerAmiMutuel(amiId);
  
      res.status(200).json({ message: 'Ami supprimé avec succès.' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
