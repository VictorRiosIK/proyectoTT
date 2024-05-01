// Esquema del modelo para guardar las respuestas, incluyendo el correo del usuario
const RespuestasSchema = new mongoose.Schema({
  emailUsuario: String, // Correo del usuario
  respuesta1: String,
  respuesta2: String,
  respuesta3: String,
  respuesta4: String,
  respuesta5: String
});
