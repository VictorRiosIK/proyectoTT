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
    const { fecha } = req.body; // Fecha seleccionada desde la aplicación Android

    // Consulta a la base de datos para obtener el documento correspondiente a la fecha
    RegisterModelCita.findOne({ fecha: fecha })
        .then(slot => {
            if (!slot) {
                return res.status(404).json({ error: 'No se encontraron horarios para la fecha especificada.' });
            }

            // Filtrar los horarios disponibles donde la cadena está vacía en el documento
            const availableSlots = [];
            if (slot.primerHorario === "") {
                availableSlots.push({ startTime: '09:00', endTime: '10:30' });
            }
            if (slot.segundoHorario === "") {
                availableSlots.push({ startTime: '10:30', endTime: '12:00' });
            }
            if (slot.tercerHorario === "") {
                availableSlots.push({ startTime: '12:00', endTime: '13:30' });
            }
            if (slot.cuartoHorario === "") {
                availableSlots.push({ startTime: '13:30', endTime: '15:00' });
            }
            if (slot.quintoHorario === "") {
                availableSlots.push({ startTime: '15:00', endTime: '16:30' });
            }
            if (slot.sextoHorario === "") {
                availableSlots.push({ startTime: '16:30', endTime: '18:00' });
            }

            res.json({ availableSlots });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al obtener los horarios disponibles.' });
        });
});

// Endpoint para reservar un horario
app.post('/bookSlot', (req, res) => {
    const { fecha, horario } = req.body;

    RegisterModelCita.findOne({ fecha: fecha })
        .then(existingSlot => {
            if (existingSlot) {
                // Determinar la propiedad de horario a actualizar
                let horarioField;
                switch (horario) {
                    case 1:
                        horarioField = 'primerHorario';
                        break;
                    case 2:
                        horarioField = 'segundoHorario';
                        break;
                    case 3:
                        horarioField = 'tercerHorario';
                        break;
                    case 4:
                        horarioField = 'cuartoHorario';
                        break;
                    case 5:
                        horarioField = 'quintoHorario';
                        break;
                    case 6:
                        horarioField = 'sextoHorario';
                        break;
                    default:
                        return res.status(400).json({ error: 'Número de horario inválido.' });
                }

                // Actualizar el horario correspondiente
                existingSlot[horarioField] = horario; // Asignar una cadena vacía por ahora
                return existingSlot.save()
                    .then(() => {
                        res.json({ message: `Horario ${horarioField} actualizado exitosamente.` });
                    })
                    .catch(err => {
                        res.status(500).json({ error: `Error al actualizar el horario ${horarioField}.` });
                    });
            } else {
                // Si no existe un documento con la fecha, crear uno nuevo con todos los horarios vacíos
                const newSlot = {
                    fecha: fecha,
                    primerHorario: horario === 1 ? horario : "",
                    segundoHorario: horario === 2 ? horario : "",
                    tercerHorario: horario === 3 ? horario : "",
                    cuartoHorario: horario === 4 ? horario: "",
                    quintoHorario: horario === 5 ? horario : "",
                    sextoHorario: horario === 6 ? horario : ""
                };
                return RegisterModelCita.create(newSlot)
                    .then(() => {
                        res.json({ message: 'Nuevo horario reservado exitosamente.' });
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'Error al crear el nuevo horario.' });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al buscar el horario existente.' });
        });
});
app.listen(3001, () => {
    console.log("Server is Running PORT 3001")
})
