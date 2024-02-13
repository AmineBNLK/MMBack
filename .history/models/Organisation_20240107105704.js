const mongoose = require('mongoose');

const OrganisationSchema = new mongoose.Schema(
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
      enum: [ {
        type: String,
    },
    description: {
      type: String,
    },
    annonce: {
      type: String,
    },
    site: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Organisation', OrganisationSchema);
