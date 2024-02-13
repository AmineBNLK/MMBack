const mongoose = require('mongoose');

const RapportSchema = new mongoose.Schema({
  sujet: {
    type: String,
    required: [true, 'Veuillez ajouter un sujet au rapport'],
  },
  description: {
    type: String,
    required: [true, 'Veuillez ajouter une description au rapport'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  hj: {
    type: mongoose.Schema.ObjectId,
    ref: 'Joueur', // ou tout autre modèle d'utilisateur
    required: true,
  },
});

module.exports = mongoose.model('Rapport', RapportSchema);
