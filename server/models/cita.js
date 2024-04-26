const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    fecha: String,
    09:00-10:30: String,
    segundoHorario: String,
    tercerHorario: String,
    cuartoHorario: String,
    quintoHorario: String,
    sextoHorario: String
})

const RegisterModelCita = mongoose.model("cita", RegisterSchema);
module.exports = RegisterModelCita;
