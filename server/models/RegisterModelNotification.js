const mongoose = require('mongoose')

const notificacionSchema = new mongoose.Schema({
  token: String,
  titulo: String,
  cuerpo: String,
  hora: Date
});

const RegisterModelNotification = mongoose.model("notification", notificacionSchema);
module.exports = RegisterModelNotification;
