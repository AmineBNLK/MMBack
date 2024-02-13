const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joueur',
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joueur',
  },
  message: {
    type: String,
    required: true,
  },
});
