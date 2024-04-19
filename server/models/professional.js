const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tipo:String
})

const RegisterProfessionalModel = mongoose.model("professional", RegisterSchema);
module.exports = RegisterProfessionalModel;
