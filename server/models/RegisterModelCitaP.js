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

const RegisterModelCitaP = mongoose.model("citaP", RegisterSchema);
module.exports = RegisterModelCitaP;
