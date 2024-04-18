const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')
const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser');
const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://vrios718:s1FPobKWDOAjPH6c@cluster0.696magv.mongodb.net/test?retryWrites=true&w=majority');


app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
   const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            const token = jwt.sign({ email: email }, 'tu_secreto');
                        res.json({ user: "Ya existe una cuenta", token: token });
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
// Endpoint para inicio de sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    res.json({ email: "prueba", password:"123" });
   
}); 

app.listen(3001, () => {
    console.log("Server is Running")
})
