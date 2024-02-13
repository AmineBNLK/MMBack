const mongoose = require('mongoose');

const TournoiSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Ajoutez un nom pour le tournoi'],
      trim: true,
      maxlength: [50, 'Le nom du tournoi ne doit pas dépasser 50 caractères'],
    },
    date: {
      type: Date,
      required: [true, 'Ajoutez une date pour le tournoi'],
    },
    nombreJoueurs: {
      type: Number,
      required: [true, 'Ajoutez le nombre de joueurs'],
      max: [11, 'Le nombre de joueurs ne peut pas dépasser 11'],
    },
    cashPrize: {
      type: Number,
      required: [true, 'Ajoutez le montant du cash prize'],
    },
    nombreEquipes: {
      type: Number,
      required: [true, 'Ajoutez le nombre d\'équipes'],
      enum: [8, 16, 32, 64, 128],
    },
    telephone: {
      type: String,
      required: [true, 'Ajoutez un numéro de téléphone'],
      maxlength: [20, 'Le numéro de téléphone ne doit pas dépasser 20 chiffres'],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tournoi', TournoiSchema);
