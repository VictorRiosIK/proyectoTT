const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')
const RegisterStudentModel=require('./models/RegisterStudentModel');
const RegisterProfessionalModel=require('./models/professional');
const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser');
const bcrypt = require('bcryptjs');
const config = require('./config.json');

const jwtSecret = config.jwtSecret;
const mongoURI = config.mongoURI;

mongoose.connect(mongoURI);
const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json({ error: 'Ya existe una cuenta registrada con este correo electrónico.' });
            } else {
                RegisterModel.create({ name: name, email: email, password: password })
                    .then(result => {
                        const token = jwt.sign({ email: email },jwtSecret );
                        res.json({ user: result, token: token });
                    })
                    .catch(err => res.status(500).json({ error: 'Error al crear la cuenta.' }));
            }
        })
        .catch(err => res.status(500).json({ error: 'Error interno del servidor.' }));
});

app.post('/registerProfessional', (req, res) => {
    const { name, email, password, rol } = req.body;
    RegisterModel.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
            } else {
                const hashedPassword = bcrypt.hashSync(password, 10);
                RegisterProfessionalModel.findOne({ email: email })
                    .then(professional => {
                        if (professional) {
                            return res.status(400).json({ error: 'Ya existe una cuenta de profesional.' });
                        } else {
                            RegisterProfessionalModel.create({ name: name, email: email, password: hashedPassword, rol: rol })
                                .then(result => {
                                    const token = jwt.sign({ email: email },jwtSecret);
                                    res.json({ professional: result, token: token });
                                })
                                .catch(err => res.status(500).json({ error: 'Error al crear la cuenta profesional.' }));
                        }
                    })
                    .catch(err => res.status(500).json({ error: 'Error al buscar la cuenta profesional.' }));
            }
        })
        .catch(err => res.status(500).json({ error: 'Error al buscar la cuenta.' }));
});

app.post('/registerStudent', (req, res) => {
    const { name, email, password, boleta, rol } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    RegisterStudentModel.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: 'Ya existe una cuenta registrada con este correo electrónico.' });
            } else {
                RegisterStudentModel.create({ name: name, email: email, password: hashedPassword, boleta: boleta, rol: rol })
                    .then(result => {
                        const token = jwt.sign({ email: email }, jwtSecret);
                        res.json({ user: result, token: token });
                    })
                    .catch(err => res.status(500).json({ error: 'Error al crear la cuenta de estudiante.' }));
            }
        })
        .catch(err => res.status(500).json({ error: 'Error al buscar la cuenta.' }));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    RegisterStudentModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        const token = jwt.sign({ email: email },jwtSecret);
                        res.json({ message: "Inicio de sesión exitoso", token: token });
                    } else {
                        res.status(401).json({ error: "Credenciales inválidas" });
                    }
                });
            } else {
                res.status(404).json({ error: "Usuario no encontrado" });
            }
        })
        .catch(err => res.status(500).json({ error: "Error interno del servidor" }));
});

app.listen(3001, () => {
    console.log("Server is Running")
})
