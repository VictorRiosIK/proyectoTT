const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')
const jwt = require('jsonwebtoken');

const app = express()
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://vrios718:s1FPobKWDOAjPH6c@cluster0.696magv.mongodb.net/test?retryWrites=true&w=majority');


app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
   const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => {
                // Generar un token JWT
                        const token = jwt.sign({ email: email }, 'tu_secreto');
                        res.json({ user: result, token: token });
            })
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
    
   
})


app.listen(3001, () => {
    console.log("Server is Running")
})
