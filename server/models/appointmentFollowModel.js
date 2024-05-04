const mongoose = require('mongoose')
const RegisterSchema = new mongoose.Schema({
  email: String, // Correo del usuario
  comentario: String,
  fechaCita:String,
  horarioCita:String
})

const RegisterCuestionary = mongoose.model("respcuestionary", RegisterSchema);
module.exports = RegisterCuestionary;
