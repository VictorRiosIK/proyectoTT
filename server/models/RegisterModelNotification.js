const mongoose = require('mongoose')

const notificacionSchema = new mongoose.Schema({
  token: String,
  titulo: String,
  cuerpo: String,
  hora: Date,
  enviada: {
        type: Number,
        default: 0
    },
  fechaEnvio: String,
  email:String
});

const RegisterModelNotification = mongoose.model("notification", notificacionSchema);
module.exports = RegisterModelNotification;
