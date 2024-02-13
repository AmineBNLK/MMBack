const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JoueurSchema = new mongoose.Schema(
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
    email: {
      type: String,
      required: [true, 'Ajoutez un email'],
      unique: [true, 'Email exist déja'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: String,
      enum: ['Joueur', 'Organisation'],
      default: 'Joueur',
    },
    password: {
      type: String,
      maxlenght: [20, 'Mot de passe ne pas depassé 20 caracteres'],
    },
    address: {
      type: String,
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
    posts: {
      type: [String],
      required: true,
      enum: [
        'Gardien de but (GK)',
        'Arrière droit (ARD)',
        'Arrière gauche (ARG)',
        'Défenseur central (DC)',
        'Milieu central (MC)',
        'Milieu défensif (MDF)',
        'Milieu offensif (MO)',
        'Attaquant (ATT)',
        'Ailier droit (AD)',
        'Ailier gauche (AG)',
      ],
    },
    niveau: {
      // Array of strings
      type: [String],
      required: true,
      enum: ['Débutant', 'Occasionnel', 'Régulier', 'Profesionnel'],
    },
    averageRating: {
      type: Number,
      min: [1, 'La notation doit etre au moins de 1'],
      max: [10, 'La notation ne doit pas depassé 10'],
    },
    dateDeNaissance: {
      type: Date,
    },
    description: {
      type: String,
    },
    hasCompletedProfile: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
    terrains: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Terrain',
      },
    ],
    tournois: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournoi',
      },
    ],
    tempAmis:[String],
    
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
JoueurSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sing JWT and return
JoueurSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
JoueurSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Joueur', JoueurSchema);
