const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    fecha: String,
    primerHorario: String,
    segundoHorario: String,
    tercerHorario: String,
    cuartoHorario: String,
    quintoHorario: String,
    sextoHorario: String
})

const RegisterModelCita = mongoose.model("citas", RegisterSchema);
module.exports = RegisterModel;
