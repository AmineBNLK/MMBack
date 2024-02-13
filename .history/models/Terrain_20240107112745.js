const mongoose = require('mongoose');

const TerrainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ajoutez un nom'],
      trim: true,
      maxlength: [50, 'Nom ne doit pas dépasser 50 caractères'],
    },
    region: {
      type: String,
      required: [true, 'Ajoutez une région'],
      enum: [
        'Adrar',
        'Chlef',
        // ... (ajoutez toutes les régions nécessaires)
        'El Meniaa',
      ],
    },
    tarifs: {
      type: Number,
      required: [true, 'Ajoutez des tarifs'],
    },
    capacity: {
      type: Number,
      required: [true, 'Ajoutez une capacité'],
    },
    telephone: {
      type: String,
      maxlength: [20, 'Numéro de téléphone ne doit pas dépasser 20 chiffres'],
    },
    image: {
      type: String,
      default: 'no-photo.jpg',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Terrain', OrganisationSchema);