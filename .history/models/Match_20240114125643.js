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
      unique: true,
    },
    trancheAge: {
      type: Number,
      required: [true, "Ajoutez la tranche d'âge"],
    },
    region: {
      type: [String],
      required: true,
      enum: [
        'Adrar',
        'Chlef',
        'Laghouat',
        'Oum El Bouaghi',
        'Batna',
        'Bejaia',
        'Biskra',
        'Bechar',
        'Blida',
        'Bouira',
        'Tamanrasset',
        'Tebessa',
        'Tlemcen',
        'Tiaret',
        'Tizi Ouzou',
        'Algiers',
        'Djelfa',
        'Jijel',
        'Setif',
        'Saïda',
        'Skikda',
        'Sidi Bel Abbes',
        'Annaba',
        'Guelma',
        'Constantine',
        'Medea',
        'Mostaganem',
        'Msila',
        'Mascara',
        'Ouargla',
        'Oran',
        'El Bayadh',
        'Illizi',
        'Bordj Bou Arreridj',
        'Boumerdes',
        'El Tarf',
        'Tindouf',
        'Tissemsilt',
        'El Oued',
        'Khenchela',
        'Souk Ahras',
        'Tipaza',
        'Mila',
        'Aïn Defla',
        'Naama',
        'Aïn Temouchent',
        'Ghardaia',
        'Relizane',
        'Timimoun',
        'Bordj Badji Mokhtar',
        'Ouled Djellal',
        'Béni Abbès',
        'In Salah',
        'In Guezzam',
        'Touggourt',
        'Djanet',
        'El M’Ghaier',
        'El Meniaa',
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
    joueur: {
      type: mongoose.Schema.O
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Match', MatchSchema);
