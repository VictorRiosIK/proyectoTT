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

    // Buscar el usuario por su correo electrónico
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // Si el usuario existe, comprobar la contraseña
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (match) {
                            // Si la contraseña es correcta, generar un token JWT
                            const token = jwt.sign({ email: email }, 'tu_secreto');
                            res.json({ message: "Inicio de sesión exitoso", token: token });
                        } else {
                            // Contraseña incorrecta
                            res.status(401).json({ message: "Credenciales inválidas" });
                        }
                    })
                    .catch(err => res.status(500).json({ message: "Error interno del servidor" }));
            } else {
                // Usuario no encontrado
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        })
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }));
});

app.listen(3001, () => {
    console.log("Server is Running")
})
