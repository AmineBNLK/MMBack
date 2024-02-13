const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ajoutez un nom'],
      trim: true,
      maxlength: [50, 'Nom ne doit pas depassé 50 caractéres'],
    },
    phone: {
      type: String,
      maxlength: [20, 'Numero de telephone ne doit pas depassé 20 chiffres'],
    },
    password: {
      type: String,
      maxlenght: [20, 'Mot de passe ne pas depassé 20 caracteres'],
    },
    address: {
      type: String,
    },
    localtion: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    jourDeMatch: {
      type: Date,
    },
    heureDeDebut: {
      type: Date,
    },
    heureDeFin: {
      type: Date,
    },
    description: {
      type: String,
    },
    prix: {
      type: String,
      enum: ['Stade gratuit', 'Stade payant'],
    },
    /*joueur: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true,
      },*/
    nombreDeJoueur: {
      type: [String],
      required: true,
      enum: ['10', '12', '14', '16', '18', '20', '22'],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Organisation', MatchSchema);
