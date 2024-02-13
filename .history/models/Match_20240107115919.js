const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema(
  {
    dateDuMatch: {
      type: Date,
      required: [true, 'Ajoutez une date pour le match'],
    },
    heureDebut: {
      type: String,
      required: [true, "Ajoutez l'heure du début du match"],
    },
    nombreJoueur: {
      type: Number,
      required: [true, 'Ajoutez le nombre de joueurs'],
    },
    numeroTel: {
      type: String,
      required: [true, 'Ajoutez un numéro de téléphone'],
      maxlength: [
        20,
        'Le numéro de téléphone ne doit pas dépasser 20 chiffres',
      ],
    },
    trancheAge: {
      type: Number,
      required: [true, "Ajoutez la tranche d'âge"],
    },
    region: {
      type: [String],
      required: true,
      enum: [
        // ... (liste des régions)
      ],
    },
    placeDisponible: {
      type: Number,
      required: [true, 'Ajoutez le nombre de places disponibles'],
    },
    adresse: {
      type: String,
      required: [true, "Ajoutez l'adresse"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Match', MatchSchema);
