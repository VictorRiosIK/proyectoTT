const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')
const RegisterStudentModel=require('./models/RegisterStudentModel');
const RegisterProfessionalModel=require('./models/professional');
const RegisterModelCita=require('./models/cita');
const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser');
const bcrypt = require('bcryptjs');
const config = require('./Config.json');

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

app.post('/registerProfessional', (req, res) => {
    const { name, email, password, rol } = req.body;
    RegisterStudentModel.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ error: 'El correo electrónico ya está registrado (Estudiante).' });
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
    

    // Verificar si el correo electrónico ya existe en RegisterProfessionalModel
    RegisterProfessionalModel.findOne({ email: email })
        .then(professional => {
            if (professional) {
                // Si el correo electrónico ya existe en RegisterProfessionalModel, devolver un mensaje de error
                return res.status(400).json({ error: 'Ya existe una cuenta registrada con este correo electrónico (profesional).' });
            } else {
                // Si el correo electrónico no existe en RegisterProfessionalModel, verificar si existe en RegisterStudentModel
                RegisterStudentModel.findOne({ email: email })
                    .then(student => {
                        if (student) {
                            // Si el correo electrónico ya existe en RegisterStudentModel, devolver un mensaje de error
                            return res.status(400).json({ error: 'Ya existe una cuenta registrada con este correo electrónico (estudiante).' });
                        } else {
                            const hashedPassword = bcrypt.hashSync(password, 10);
                            // Si el correo electrónico no existe en ninguno de los dos modelos, crear el registro en RegisterStudentModel
                            RegisterStudentModel.create({ name: name, email: email, password: hashedPassword, boleta: boleta, rol: rol })
                                .then(result => {
                                    const token = jwt.sign({ email: email }, jwtSecret);
                                    res.json({ user: result, token: token });
                                })
                                .catch(err => res.status(500).json({ error: 'Error al crear la cuenta de estudiante.' }));
                        }
                    })
                    .catch(err => res.status(500).json({ error: 'Error al buscar la cuenta de estudiante.' }));
            }
        })
        .catch(err => res.status(500).json({ error: 'Error al buscar la cuenta de profesional.' }));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Buscar el correo electrónico en RegisterStudentModel
    RegisterStudentModel.findOne({ email: email })
        .then(student => {
            if (student) {
                // Si el correo electrónico existe en RegisterStudentModel, comparar la contraseña
                bcrypt.compare(password, student.password, function (err, result) {
                    if (result) {
                        // Si la contraseña es correcta, generar un token JWT y devolver el rol
                        const token = jwt.sign({ email: email }, jwtSecret);
                        res.json({ message: "Inicio de sesión exitoso", token: token, rol: student.rol,email:student.email });
                    } else {
                        res.status(401).json({ error: "Credenciales inválidas" });
                    }
                });
            } else {
                // Si el correo electrónico no existe en RegisterStudentModel, buscar en RegisterProfessionalModel
                RegisterProfessionalModel.findOne({ email: email })
                    .then(professional => {
                        if (professional) {
                            // Si el correo electrónico existe en RegisterProfessionalModel, comparar la contraseña
                            bcrypt.compare(password, professional.password, function (err, result) {
                                if (result) {
                                    // Si la contraseña es correcta, generar un token JWT y devolver el rol
                                    const token = jwt.sign({ email: email }, jwtSecret);
                                    res.json({ message: "Inicio de sesión exitoso", token: token, rol: professional.rol,email:professional.email });
                                } else {
                                    res.status(401).json({ error: "Credenciales inválidas" });
                                }
                            });
                        } else {
                            // Si el correo electrónico no existe en RegisterStudentModel ni en RegisterProfessionalModel, devolver un error
                            res.status(404).json({ error: "Usuario no encontrado" });
                        }
                    })
                    .catch(err => res.status(500).json({ error: "Error interno del servidor" }));
            }
        })
        .catch(err => res.status(500).json({ error: "Error interno del servidor" }));
});
// Endpoint para consultar los horarios disponibles para una fecha específica
app.get('/availableSlots', (req, res) => {
    const {fecha,horario}=req.body; // Fecha seleccionada desde la aplicación Android

    // Lógica para obtener los horarios disponibles desde la base de datos
    // Puedes usar Mongoose para interactuar con MongoDB y realizar consultas

    // Supongamos que availableSlots es un array con los horarios disponibles para la fecha seleccionada
    const availableSlots = [
        { startTime: '09:00', endTime: '10:30' },
        { startTime: '10:30', endTime: '12:00' },
        { startTime: '12:00', endTime: '13:30' },
        { startTime: '13:30', endTime: '15:00' },
        { startTime: '15:00', endTime: '16:30' },
        { startTime: '16:30', endTime: '18:00' }
        // Otros horarios disponibles...
    ];

    res.json({ availableSlots });
});

// Endpoint para reservar un horario
app.post('/bookSlot', async (req, res) => {
    const {fecha,horario}=req.body;// Fecha y horario seleccionado desde la aplicación Android

    // Lógica para marcar el horario como ocupado en la base de datos
    // Actualiza el estado de disponibilidad del horario correspondiente
    try {
        const { fecha, horario } = req.body;

        // Buscar si ya existe un documento con la fecha proporcionada
        const existingSlot = await RegisterModelCita.findOne({ fecha: fecha });

        if (existingSlot) {
            // Si ya existe un documento con la fecha, actualizar el primerHorario
            existingSlot.primerHorario = horario;
            await existingSlot.save(); // Guardar los cambios en la base de datos
            res.json({ message: 'Horario reservado exitosamente.' });
        } else {
            // Si no existe un documento con la fecha, crear uno nuevo
            await RegisterModelCita.create({ fecha: fecha, primerHorario: horario });
            res.json({ message: 'Nuevo horario reservado exitosamente.' });
        }
    } catch (error) {
        // Manejar errores
        console.error(error);
        res.status(500).json({ error: 'Error al reservar el horario.' });
    }
    //res.json({ message: 'Horario reservado exitosamente.' });
});
app.listen(3001, () => {
    console.log("Server is Running PORT 3001")
})
