const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// Chemin du fichier de la photo par défaut
const defaultPhotoPath =
  'https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg';
// path.join(__dirname, 'public', 'uploads', 'PDP.jpg');

const JoueurSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ajoutez un nom'],
      trim: true,
      maxlength: [50, 'Nom ne doit pas depassé 50 caractéres'],
    },
    age: {
      type: Number,
      default: '0',
    },
    email: {
      type: String,
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
    hasCompletedProfile: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: 'ajouter un numero',
      maxlength: [30, 'Numero de telephone ne doit pas depassé 20 chiffres'],
    },
    photo: {
      type: String,
      default: defaultPhotoPath,
    },
    adresse: {
      type: String,
      default: null,
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
    tempAmis: [
      {
        type: mongoose.Schema.Types,
        ref: 'Joueur',
      },
    ],
    amis: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Joueur',
      },
    ],
    googleId: {
      type: String,
    },
    description: {
      type: String,
      default: 'Pas de description',
    },
  },
  {
    timestamps: true,
  }
);

// Ajoutez la méthode ajouterAmiTemporaire
JoueurSchema.methods.ajouterAmiTemporaire = async function (amiId) {
  // Vérifiez si l'amiId n'est pas déjà dans la liste des amis temporaires
  if (!this.tempAmis.includes(amiId)) {
    this.tempAmis.push(amiId);
    await this.save();
  }
};

// Ajoutez la méthode accepterAmiTemporaire
JoueurSchema.methods.accepterAmiTemporaire = async function (amiId) {
  // Vérifiez si l'amiId est dans la liste des amis temporaires
  if (this.tempAmis.includes(amiId)) {
    // Retirez l'ami de la liste des amis temporaires
    this.tempAmis = this.tempAmis.filter(
      (id) => id.toString() !== amiId.toString()
    );

    // Ajoutez l'ami à la liste des amis permanents
    this.amis.push(amiId);

    // Récupérez le joueur Y
    const joueurY = await this.model('Joueur').findById(amiId);

    // Vérifiez si l'ID du joueur X n'est pas déjà dans la liste des amis permanents du joueur Y
    if (!joueurY.amis.includes(this._id)) {
      // Ajoutez l'ID du joueur X à la liste des amis permanents du joueur Y
      joueurY.amis.push(this._id);
      await joueurY.save();
    }

    await this.save();
  }
};

// Ajoutez la méthode refuserAmiTemporaire
JoueurSchema.methods.refuserAmiTemporaire = async function (amiId) {
  // Vérifiez si l'amiId est dans la liste des amis temporaires
  if (this.tempAmis.includes(amiId)) {
    // Retirez l'ami de la liste des amis temporaires
    this.tempAmis = this.tempAmis.filter(
      (id) => id.toString() !== amiId.toString()
    );
    await this.save();
  }
};

// Ajoutez la méthode supprimerAmiPermanent
JoueurSchema.methods.supprimerAmiMutuel = async function (amiId) {
  // Supprimer amiId de la liste amis
  this.amis = this.amis.filter((id) => id.toString() !== amiId.toString());
  // Enregistrez les modifications
  await this.save();
};

// Ajoutez la méthode annulerDemandeAmi
JoueurSchema.methods.annulerDemandeAmi = async function (amiId) {
  // Supprimer amiId de la liste tempAmis
  this.tempAmis = this.tempAmis.filter(
    (id) => id.toString() !== amiId.toString()
  );

  // Enregistrez les modifications
  await this.save();
};

// // Encrypt password using bcrypt
// JoueurSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     // Si le mot de passe n'est pas modifié, passez au prochain middleware
//     return next();
//   }

//   const salt = await bcrypt.genSalt(10);

//   // Vérifiez si le mot de passe existe avant de le hasher
//   if (this.password) {
//     this.password = await bcrypt.hash(this.password, salt);
//   }

//   next();
// });

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
