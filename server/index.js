const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')
const RegisterStudentModel=require('./models/RegisterStudentModel');
const RegisterProfessionalModel=require('./models/professional');
const RegisterModelCita=require('./models/cita');
const RegisterModelCitaP=require('./models/RegisterModelCitaP');
const RegisterCuestionary=require('./models/RegisterCuestionary');
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
                return res.status(400).json({ message: 'El correo electrónico ya está registrado (Estudiante).' });
            } else {
                const hashedPassword = bcrypt.hashSync(password, 10);
                RegisterProfessionalModel.findOne({ email: email })
                    .then(professional => {
                        if (professional) {
                            return res.status(400).json({ message: 'Ya existe una cuenta de profesional.' });
                        } else {
                            RegisterProfessionalModel.create({ name: name, email: email, password: hashedPassword, rol: rol })
                                .then(result => {
                                    const token = jwt.sign({ email: email },jwtSecret);
                                    res.status(200).json({ professional: result, token: token });
                                })
                                .catch(err => res.status(500).json({ message: 'Error al crear la cuenta profesional.' }));
                        }
                    })
                    .catch(err => res.status(500).json({ message: 'Error al buscar la cuenta profesional.' }));
            }
        })
        .catch(err => res.status(500).json({ message: 'Error al buscar la cuenta.' }));
});

app.post('/registerStudent', (req, res) => {
    const { name, email, password, boleta, rol } = req.body;
    

    // Verificar si el correo electrónico ya existe en RegisterProfessionalModel
    RegisterProfessionalModel.findOne({ email: email })
        .then(professional => {
            if (professional) {
                // Si el correo electrónico ya existe en RegisterProfessionalModel, devolver un mensaje de error
                return res.status(400).json({ message: 'Ya existe una cuenta registrada con este correo electrónico (profesional).' });
            } else {
                // Si el correo electrónico no existe en RegisterProfessionalModel, verificar si existe en RegisterStudentModel
                RegisterStudentModel.findOne({ email: email })
                    .then(student => {
                        if (student) {
                            // Si el correo electrónico ya existe en RegisterStudentModel, devolver un mensaje de error
                            return res.status(400).json({ message: 'Ya existe una cuenta registrada con este correo electrónico (estudiante).' });
                        } else {
                            const hashedPassword = bcrypt.hashSync(password, 10);
                            // Si el correo electrónico no existe en ninguno de los dos modelos, crear el registro en RegisterStudentModel
                            RegisterStudentModel.create({ name: name, email: email, password: hashedPassword, boleta: boleta, rol: rol })
                                .then(result => {
                                    const token = jwt.sign({ email: email }, jwtSecret);
                                    res.status(200).json({ user: result, token: token });
                                })
                                .catch(err => res.status(500).json({ message: 'Error al crear la cuenta de estudiante.' }));
                        }
                    })
                    .catch(err => res.status(500).json({ message: 'Error al buscar la cuenta de estudiante.' }));
            }
        })
        .catch(err => res.status(500).json({ message: 'Error al buscar la cuenta de profesional.' }));
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
                        res.status(200).json({ message: "Inicio de sesión exitoso", token: token, rol: student.rol,email:student.email,evaluacionP:student.evaluacionP });
                    } else {
                        res.status(401).json({ message: "Credenciales inválidas" });
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
                                    res.status(200).json({ message: "Inicio de sesión exitoso", token: token, rol: professional.rol,email:professional.email });
                                } else {
                                    res.status(401).json({ message: "Credenciales inválidas" });
                                }
                            });
                        } else {
                            // Si el correo electrónico no existe en RegisterStudentModel ni en RegisterProfessionalModel, devolver un error
                            res.status(404).json({ message: "Usuario no encontrado" });
                        }
                    })
                    .catch(err => res.status(500).json({ message: "Error interno del servidor" }));
            }
        })
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }));
});
// Endpoint para consultar los horarios disponibles para una fecha específica
app.post('/availableSlots', (req, res) => {
    const { fecha,tipo } = req.body; // Fecha seleccionada desde la aplicación Android
    // Verificar si el tipo de profesional es Dentista o Psicologo
    if (tipo !== 'Dentista' && tipo !== 'Psicologo') {
        return res.status(400).json({ message: 'Tipo de profesional inválido.' });
    }
    // Determinar el modelo correspondiente según el tipo de profesional
    const RegisterModel = tipo === 'Dentista' ? RegisterModelCita : RegisterModelCitaP;

    // Consulta a la base de datos para obtener el documento correspondiente a la fecha y tipo de profesional
    RegisterModel.findOne({ fecha: fecha })
        .then(slot => {
             // Si no se encuentra un documento para la fecha, regresa todos los horarios disponibles
            if (!slot) {
                const availableSlots = [
                    { startTime: '09:00', endTime: '10:30' },
                    { startTime: '10:30', endTime: '12:00' },
                    { startTime: '12:00', endTime: '13:30' },
                    { startTime: '13:30', endTime: '15:00' },
                    { startTime: '15:00', endTime: '16:30' },
                    { startTime: '16:30', endTime: '18:00' }
                    // Agrega aquí otros horarios disponibles si es necesario
                ];
                return res.status(200).json({ availableSlots });
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

            res.status(200).json({ availableSlots });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error al obtener los horarios disponibles.' });
        });
});

// Endpoint para reservar un horario
app.post('/bookSlot', (req, res) => {
    const { fecha, horario, correo, tipo } = req.body;
    if (tipo !== 'Dentista' && tipo !== 'Psicologo') {
        return res.status(400).json({ message: 'Tipo de profesional inválido.' });
    }
    if (tipo === 'Dentista') {
        // Verificar si ya existe una cita con el correo proporcionado
    RegisterModelCita.findOne({ $or: [
        { primerHorario: correo },
        { segundoHorario: correo },
        { tercerHorario: correo },
        { cuartoHorario: correo },
        { quintoHorario: correo },
        { sextoHorario: correo }
    ]})
    .then(existingSlot => {
        if (existingSlot) {
            return res.status(400).json({ message: 'Ya existe una cita para este correo en el apartado actual.' });
        } else {
            // Determinar la propiedad de horario a actualizar o crear
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
                    return res.status(400).json({ message: 'Número de horario inválido.' });
            }

            // Actualizar o crear la cita correspondiente
            RegisterModelCita.findOne({ fecha: fecha })
                .then(existingSlot => {
                    if (existingSlot) {
                        // Actualizar el horario correspondiente
                        existingSlot[horarioField] = correo;
                        return existingSlot.save()
                            .then(() => {
                                res.status(200).json({ message: `Cita agendada exitosamente.` });
                            })
                            .catch(err => {
                                res.status(500).json({ message: `Error al actualizar el horario ${horarioField}.` });
                            });
                    } else {
                        // Si no existe un documento con la fecha, crear uno nuevo con todos los horarios vacíos
                        const newSlot = {
                            fecha: fecha,
                            primerHorario: horario === 1 ? correo : "",
                            segundoHorario: horario === 2 ? correo : "",
                            tercerHorario: horario === 3 ? correo : "",
                            cuartoHorario: horario === 4 ? correo: "",
                            quintoHorario: horario === 5 ? correo : "",
                            sextoHorario: horario === 6 ? correo : ""
                        };
                        return RegisterModelCita.create(newSlot)
                            .then(() => {
                                res.status(200).json({ message: 'Cita agendada exitosamente.' });
                            })
                            .catch(err => {
                                res.status(500).json({ message: 'Error al crear el nuevo horario.' });
                            });
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: 'Error al buscar el horario existente.' });
                });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Error al buscar la cita existente.' });
    });
    } else if (tipo === 'Psicologo') {
        // Lógica para Psicologo
    RegisterModelCitaP.findOne({ $or: [
        { primerHorario: correo },
        { segundoHorario: correo },
        { tercerHorario: correo },
        { cuartoHorario: correo },
        { quintoHorario: correo },
        { sextoHorario: correo }
    ]})
    .then(existingSlot => {
        if (existingSlot) {
            return res.status(400).json({ message: 'Ya existe una cita para este correo en el apartado actual.' });
        } else {
            // Determinar la propiedad de horario a actualizar o crear
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
                    return res.status(400).json({ message: 'Número de horario inválido.' });
            }

            // Actualizar o crear la cita correspondiente
            RegisterModelCitaP.findOne({ fecha: fecha })
                .then(existingSlot => {
                    if (existingSlot) {
                        // Actualizar el horario correspondiente
                        existingSlot[horarioField] = correo;
                        return existingSlot.save()
                            .then(() => {
                                res.status(200).json({ message: `Cita agendada exitosamente.` });
                            })
                            .catch(err => {
                                res.status(500).json({ message: `Error al actualizar el horario ${horarioField}.` });
                            });
                    } else {
                        // Si no existe un documento con la fecha, crear uno nuevo con todos los horarios vacíos
                        const newSlot = {
                            fecha: fecha,
                            primerHorario: horario === 1 ? correo : "",
                            segundoHorario: horario === 2 ? correo : "",
                            tercerHorario: horario === 3 ? correo : "",
                            cuartoHorario: horario === 4 ? correo: "",
                            quintoHorario: horario === 5 ? correo : "",
                            sextoHorario: horario === 6 ? correo : ""
                        };
                        return RegisterModelCitaP.create(newSlot)
                            .then(() => {
                                res.status(200).json({ message: 'Nuevo horario reservado exitosamente.' });
                            })
                            .catch(err => {
                                res.status(500).json({ message: 'Error al crear el nuevo horario.' });
                            });
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: 'Error al buscar el horario existente.' });
                });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Error al buscar la cita existente.' });
    });
       
    }
    
});

app.post('/allSlotsByCorreo', (req, res) => {
    const { correo, tipo } = req.body; // Correo que se desea filtrar y tipo de profesional

    // Verificar si el tipo de profesional es Dentista o Psicologo
    if (tipo !== 'Dentista' && tipo !== 'Psicologo') {
        return res.status(400).json({ message: 'Tipo de profesional inválido.' });
    }
    // Determinar el modelo correspondiente según el tipo de profesional
    const RegisterModel = tipo === 'Dentista' ? RegisterModelCita : RegisterModelCitaP;

    // Consulta a la base de datos para obtener todos los horarios que coincidan con el correo
    RegisterModel.find({
        $or: [
            { primerHorario: correo },
            { segundoHorario: correo },
            { tercerHorario: correo },
            { cuartoHorario: correo },
            { quintoHorario: correo },
            { sextoHorario: correo }
        ]
    })
    .then(slots => {
        // Filtrar los campos del documento que coinciden con el correo proporcionado y agregar la fecha
        const filteredSlots = slots.map(slot => {
            const filteredSlot = { fecha: slot.fecha };
            Object.keys(slot._doc).forEach(key => {
                if (slot[key] === correo) {
                    filteredSlot[key] = slot[key];
                }
            });
            return filteredSlot;
        });

        res.status(200).json({ slots: filteredSlots });
    })
    .catch(err => {
        res.status(500).json({ message: 'Error al obtener los horarios.' });
    });
});
app.post('/allSlots', (req, res) => {
    const { tipo } = req.body; // Tipo de profesional
    // Verificar si el tipo de profesional es Dentista o Psicologo
    if (tipo !== 'Dentista' && tipo !== 'Psicologo') {
        return res.status(400).json({ message: 'Tipo de profesional inválido.' });
    }
    // Determinar el modelo correspondiente según el tipo de profesional
    const RegisterModel = tipo === 'Dentista' ? RegisterModelCita : RegisterModelCitaP;

    RegisterModel.find()
        .then(slots => {
            // Ajustar los datos de salida para incluir solo la fecha y todos los horarios
            const adjustedSlots = slots.map(slot => {
                // Crear un nuevo objeto para contener solo la fecha y todos los horarios
                const adjustedSlot = {
                    source: tipo,
                    fecha: slot.fecha,
                    primerHorario: slot.primerHorario,
                    segundoHorario: slot.segundoHorario,
                    tercerHorario: slot.tercerHorario,
                    cuartoHorario: slot.cuartoHorario,
                    quintoHorario: slot.quintoHorario,
                    sextoHorario: slot.sextoHorario
                };
                return adjustedSlot;
            });

            res.status(200).json({ slots: adjustedSlots });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error al obtener los horarios.' });
        });
});
app.post('/searchByEmail', (req, res) => {
    const { correo, tipo } = req.body; // Correo que se desea buscar y tipo de usuario

    // Verificar si el tipo de usuario es Alumno o Profesional
    if (tipo !== 'Alumno' && tipo !== 'Profesional') {
        return res.status(400).json({ message: 'Tipo de usuario inválido.' });
    }

    // Determinar el modelo correspondiente según el tipo de usuario
    const RegisterModel = tipo === 'Alumno' ? RegisterStudentModel : RegisterProfessionalModel;

    // Consultar en la base de datos para buscar la coincidencia por correo
    RegisterModel.findOne({ email: correo })
        .select('name email boleta rol') // Proyección para obtener solo los campos necesarios
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
            res.status(200).json({ user });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error al buscar el usuario.' });
        });
});

// Ruta POST para guardar las respuestas
app.post('/cuestionario', async (req, res) => {
  try {
    // Extrae el correo del usuario del cuerpo de la solicitud
    const { emailUsuario, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5 } = req.body;

    // Crea una nueva instancia del modelo Respuestas con los datos del cuerpo de la solicitud
    const respuestas = new Respuestas({
      emailUsuario,
      respuesta1,
      respuesta2,
      respuesta3,
      respuesta4,
      respuesta5
    });

    // Guarda las respuestas en la base de datos
    await respuestas.save();

    // Envía una respuesta de éxito
    res.status(201).json({ message: 'Respuestas guardadas correctamente' });
  } catch (error) {
    // Si ocurre un error, envía una respuesta de error
    console.error('Error al guardar las respuestas:', error);
    res.status(500).json({ error: 'Error al guardar las respuestas' });
  }
});
app.listen(3001, () => {
    console.log("Server is Running PORT 3001")
})
