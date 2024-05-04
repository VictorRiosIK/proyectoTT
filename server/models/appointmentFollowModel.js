const mongoose = require('mongoose')
const RegisterSchema = new mongoose.Schema({
  email: String, // Correo del usuario
  comentario: String,
  fechaCita:String,
  horarioCita:String,
  tipo:String
})

const followStudent = mongoose.model("followStudent", RegisterSchema);
module.exports = followStudent;
