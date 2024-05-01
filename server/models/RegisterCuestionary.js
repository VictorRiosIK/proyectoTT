const mongoose = require('mongoose')
const RegisterSchema = new mongoose.Schema({
    emailUsuario: String, // Correo del usuario
  respuesta1: String,
  respuesta2: String,
  respuesta3: String,
  respuesta4: String,
  respuesta5: String
})

const RegisterCuestionary = mongoose.model("respcuestionary", RegisterSchema);
module.exports = RegisterCuestionary;
