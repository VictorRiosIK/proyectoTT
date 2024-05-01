const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    boleta: String,
    rol:String,
    evaluacionP: {
        type: Number,
        default: 0
    }
})

const RegisterStudentModel = mongoose.model("users2", RegisterSchema);
module.exports = RegisterStudentModel;
