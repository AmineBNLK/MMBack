const mongoose = require('mongoose');

const TerrainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ajoutez un nom'],
      trim: true,
      maxlength: [50, 'Nom ne doit pas dépasser 50 caractères'],
    },
    location: {
      type: String,
      // required: true,
    },
    region: {
      type: String,
      required: [true, 'Ajoutez une région'],
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
    tarifs: {
      type: String,
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
    joueur: {
      type: mongoose.Schema.ObjectId,
      ref: 'Joueur',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Terrain', TerrainSchema);
