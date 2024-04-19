const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')
const RegisterStudentModel=require('./models/RegisterStudentModel');
const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser');
const bcrypt = require('bcryptjs');
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
            const token = jwt.sign({ email: email }, 'q66eSaeLDeYHOdZBW5LeWi2yejcdirPxliq3Lf+mLdo');
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
    
   
});
app.post('/registerStudent', (req, res) => {
    const { name, email, password, boleta, rol } = req.body;

    // Hash de la contraseña
     const hashedPassword = bcrypt.hashSync(password, 10);

        RegisterStudentModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    return res.json({ user: "Ya existe una cuenta", token: token });
                } else {
                    // Crear un nuevo usuario con la contraseña cifrada
                    RegisterStudentModel.create({ name: name, email: email, password: hashedPassword, boleta: boleta, rol: rol })
                        .then(result => {
                            // Generar un token JWT
                            const token = jwt.sign({ email: email }, 'q66eSaeLDeYHOdZBW5LeWi2yejcdirPxliq3Lf+mLdo');
                            res.json({ user: result, token: token });
                        })
                        .catch(err => res.status(500).json({ error: 'Error al crear el usuario' }));
                }
            })
            .catch(err => res.status(500).json({ error: 'Error al buscar el usuario' }));
    });
});
// Endpoint para inicio de sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    RegisterStudentModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // Si el usuario existe, comparar la contraseña almacenada con la proporcionada
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result) {
                        // Si la contraseña es correcta, generar un token JWT
                        const token = jwt.sign({ email: email }, 'q66eSaeLDeYHOdZBW5LeWi2yejcdirPxliq3Lf+mLdo');
                        res.json({ message: "Inicio de sesión exitoso", token: token });
                    } else {
                        // Contraseña incorrecta
                        res.status(401).json({ message: "Credenciales inválidas" });
                    }
                });
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
