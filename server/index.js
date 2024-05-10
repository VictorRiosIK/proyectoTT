const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const cors = require('cors')
const RegisterModel = require('./models/Register')
const RegisterStudentModel=require('./models/RegisterStudentModel');
const RegisterProfessionalModel=require('./models/professional');
const RegisterModelCita=require('./models/cita');
const RegisterModelCitaP=require('./models/RegisterModelCitaP');
const RegisterCuestionary=require('./models/RegisterCuestionary');
const followStudent=require('./models/appointmentFollowModel');
const jwt = require('jsonwebtoken');
const bodyParser=require('body-parser');
const bcrypt = require('bcryptjs');
const config = require('./Config.json');
const moment = require('moment');
const jwtSecret = config.jwtSecret;
const mongoURI = config.mongoURI;
const admin = require("firebase-admin");

const serviceAccount = require("./tt2024-f835d-68fdaeb8d78b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
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
                             const token = jwt.sign({ email: email }, jwtSecret);
                            // Si el correo electrónico no existe en ninguno de los dos modelos, crear el registro en RegisterStudentModel
                            RegisterStudentModel.create({ name: name, email: email, password: hashedPassword, boleta: boleta, rol: rol, token: token})
                                .then(result => {
                                   
                                    // Enviar el correo electrónico de verificación
                                    // Configurar el transporte
                                    let transporter = nodemailer.createTransport({
                                        service: 'Gmail',
                                        auth: {
                                            user: 'vrios718@gmail.com', // Tu dirección de correo electrónico
                                            pass: 'fqchchfldzzfafqu' // Tu contraseña de correo electrónico
                                        }
                                    });

                                    // HTML y CSS en línea para el correo electrónico
                                    let correoHTML = `
                                        <html>
                                            <head>
                                                <style>
                                                    /* Estilos CSS en línea */
                                                    body {
                                                        font-family: Arial, sans-serif;
                                                        background-color: #f2f2f2;
                                                        margin: 0;
                                                        padding: 0;
                                                    }
                                                    .container {
                                                        max-width: 600px;
                                                        margin: 0 auto;
                                                        padding: 20px;
                                                        background-color: #ffffff;
                                                        border-radius: 10px;
                                                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                                                    }
                                                    h1 {
                                                        color: #333333;
                                                        text-align: center;
                                                    }
                                                    p {
                                                        color: #666666;
                                                        text-align: center;
                                                    }
                                                    .boton {
                                                        display: block;
                                                        width: 200px;
                                                        margin: 20px auto;
                                                        padding: 10px;
                                                        background-color: #007bff;
                                                        color: #ffffff;
                                                        text-align: center;
                                                        text-decoration: none;
                                                        border-radius: 5px;
                                                    }
                                                </style>
                                            </head>
                                            <body>
                                                <div class="container">
                                                    <h1>¡Bienvenido, ${name}!</h1>
                                                    <p>Gracias por registrarte.</p>
                                                    <p>Por favor, haz clic en el siguiente botón para verificar tu cuenta:</p>
                                                    <a href="https://proyecto-tt-api.vercel.app/verificaCorreo?email=${email}&token=${token}" class="boton">Verificar cuenta</a>
                                                </div>
                                            </body>
                                        </html>
                                    `;

                                    // Configurar los detalles del correo electrónico
                                    let mailOptions = {
                                        from: 'vrios718@gmail.com', // Remitente
                                        to: email, // Destinatario
                                        subject: 'Verificación de cuenta', // Asunto
                                        html: correoHTML // Cuerpo del correo electrónico
                                    };

                                    // Enviar el correo electrónico
                                    transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            console.log('Error al enviar el correo electrónico de verificación:', error);
                                            res.status(500).json({ message: 'Error al enviar el correo electrónico de verificación', error: error });
                                        } else {
                                            console.log('Correo electrónico de verificación enviado:', info.response);
                                            res.status(200).json({ user: result, token: token, message: 'Correo electrónico de verificación enviado con éxito' });
                                        }
                                    });

                                    
                                })
                                .catch(err => res.status(500).json({ message: 'Error al crear la cuenta de estudiante.' }));
                        }
                    })
                    .catch(err => res.status(500).json({ message: 'Error al buscar la cuenta de estudiante.' }));
            }
        })
        .catch(err => res.status(500).json({ message: 'Error al buscar la cuenta de profesional.' }));
});
app.get('/verificaCorreo', (req, res) => {
    const { email, token } = req.query;

    // Verificar si el correo electrónico y el token están presentes en la solicitud
    if (!email || !token) {
        return res.status(400).json({ message: 'Correo electrónico y token son requeridos.' });
    }

    // Buscar en la base de datos la cuenta asociada al correo electrónico proporcionado
    RegisterStudentModel.findOne({ email: email })
        .then(student => {
            if (!student) {
                return res.status(404).json({ message: 'No se encontró una cuenta asociada a este correo electrónico.' });
            } else {
                // Verificar si el token proporcionado coincide con el token almacenado en la cuenta
                if (student.token !== token) {
                    return res.status(403).json({ message: 'El token proporcionado no es válido.' });
                } else {
                    // Si el correo y el token son válidos, actualizar el estado de verificación de la cuenta si es necesario
                    if (student.cuentaValidada === 1) {
                        return res.status(200).json({ message: 'La cuenta ya ha sido verificada anteriormente.' });
                    } else {
                        // Actualizar el estado de verificación de la cuenta a 1
                        student.cuentaValidada = 1;
                        // Guardar el cambio en la base de datos
                        student.save()
                            .then(() => {
                                return res.status(200).json({ message: 'La cuenta ha sido verificada exitosamente.' });
                            })
                            .catch(error => {
                                return res.status(500).json({ message: 'Error al actualizar el estado de verificación de la cuenta.', error: error });
                            });
                    }
                }
            }
        })
        .catch(error => {
            return res.status(500).json({ message: 'Error al buscar la cuenta.', error: error });
        });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Buscar el correo electrónico en RegisterStudentModel
    RegisterStudentModel.findOne({ email: email })
        .then(student => {
            if (student) {
                // Verificar si la cuenta está verificada
                if (student.cuentaValidada === 0) {
                    return res.status(401).json({ message: "La cuenta no ha sido verificada. Por favor, revise su correo electrónico." });
                }

                // Si la cuenta está verificada, comparar la contraseña
                bcrypt.compare(password, student.password, function (err, result) {
                    if (result) {
                        // Si la contraseña es correcta, generar un token JWT y devolver el rol
                        const token = jwt.sign({ email: email }, jwtSecret);
                        res.status(200).json({ message: "Inicio de sesión exitoso", token: token, rol: student.rol, email: student.email, evaluacionP: student.evaluacionP });
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
                                    res.status(200).json({ message: "Inicio de sesión exitoso", token: token, rol: professional.rol, email: professional.email });
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
        .select('name email boleta rol evaluacionP') // Proyección para obtener solo los campos necesarios
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

app.post('/registerCuestionary', (req, res) => {
    const { emailUsuario, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5 } = req.body;

    // Verificar si el usuario existe como estudiante
    RegisterStudentModel.findOne({ email: emailUsuario })
        .then(student => {
            if (!student) {
                // Si el usuario no está registrado como estudiante, responder con un mensaje de error
                return res.status(400).json({ message: 'El usuario no está registrado como estudiante.' });
            }

           

            // Verificar si ya existe una respuesta de cuestionario para el usuario dado
            RegisterCuestionary.findOne({ emailUsuario })
                .then(existingCuestionary => {
                    if (existingCuestionary) {
                        // Si ya existe una respuesta de cuestionario existente, devolver un mensaje de error
                        return res.status(400).json({ message: 'Ya existe una respuesta de cuestionario para este usuario.' });
                    }

                    // Crear una nueva instancia del modelo RegisterCuestionary con los datos
                    const registerCuestionary = new RegisterCuestionary({
                        emailUsuario,
                        respuesta1,
                        respuesta2,
                        respuesta3,
                        respuesta4,
                        respuesta5
                    });

                    // Guardar el registro en la base de datos
                    registerCuestionary.save()
                        .then(() => {
                            // Actualizar la propiedad evaluacionP del usuario en el modelo RegisterStudentModel
                            student.evaluacionP = 1;
                            // Guardar los cambios en el usuario
                            student.save()
                                .then(() => {
                                    // Enviar una respuesta de éxito
                                    res.status(200).json({ message: 'Respuestas del cuestionario guardadas correctamente.' });
                                })
                                .catch(error => {
                                    console.error('Error al actualizar la evaluación del usuario:', error);
                                    res.status(500).json({ message: 'Error al actualizar la evaluación del usuario.' });
                                });
                        })
                        .catch(error => {
                            // Si ocurre un error, enviar una respuesta de error
                            console.error('Error al guardar las respuestas del cuestionario:', error);
                            res.status(500).json({ message: 'Error al guardar las respuestas del cuestionario.' });
                        });
                })
                .catch(error => {
                    console.error('Error al buscar la respuesta de cuestionario existente:', error);
                    res.status(500).json({ message: 'Error al buscar la respuesta de cuestionario existente.' });
                });
        })
        .catch(err => res.status(500).json({ message: 'Error al buscar el usuario como estudiante.' }));
});
app.post('/getCuestionaryResponses', (req, res) => {
    const { emailUsuario } = req.body;

    // Buscar las respuestas de cuestionario para el usuario dado
    RegisterCuestionary.findOne({ emailUsuario })
        .then(cuestionary => {
            if (!cuestionary) {
                // Si no se encuentra ninguna respuesta de cuestionario, devolver un mensaje de error
                return res.status(404).json({ message: 'No se encontraron respuestas de cuestionario para este usuario.' });
            }

            // Si se encuentra una respuesta de cuestionario, devolverla en la respuesta
            res.status(200).json(cuestionary);
        })
        .catch(error => {
            console.error('Error al buscar las respuestas de cuestionario:', error);
            res.status(500).json({ error: 'Error al buscar las respuestas de cuestionario.' });
        });
});



// Ruta para enviar correos
app.post('/enviarcorreoctc', (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { destinatario, asunto, mensaje } = req.body;

    // Configurar el transporte
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vrios718@gmail.com', // Tu dirección de correo electrónico
            pass: 'fqchchfldzzfafqu' // Tu contraseña de correo electrónico
        }
    });

// HTML y CSS en línea para el correo electrónico
let correoHTML = `
    <html>
        <head>
            <style>
                /* Estilos CSS en línea */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333333;
                    text-align: center;
                }
                p {
                    color: #666666;
                    text-align: center;
                }
                .boton {
                    display: block;
                    width: 200px;
                    margin: 20px auto;
                    padding: 10px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-align: center;
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <p>${mensaje}</p>
                
            </div>
        </body>
    </html>
`;

// Configurar los detalles del correo electrónico
let mailOptions = {
    from: 'vrios718@gmail.com', // Remitente
    to: destinatario, // Destinatario
    subject: asunto, // Asunto
    html: correoHTML // Cuerpo del correo electrónico
};

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo electrónico:', error);
            res.status(500).send('Error al enviar el correo electrónico');
        } else {
            console.log('Correo electrónico enviado:', info.response);
            res.status(200).send('Correo electrónico enviado con éxito');
        }
    });
});

app.post('/cancelAppointment', (req, res) => {
    const { fecha, correo, tipo } = req.body; // Fecha, correo y tipo de profesional

    // Determinar el modelo correspondiente según el tipo de profesional
    const RegisterModel = tipo === 'Dentista' ? RegisterModelCita : RegisterModelCitaP;

    // Consultar en la base de datos para buscar la coincidencia por fecha y correo
    RegisterModel.findOne({ fecha: fecha })
        .then(slot => {
            if (!slot) {
                return res.status(404).json({ message: 'No se encontraron horarios para la fecha proporcionada.' });
            }

            // Verificar si el correo está presente en alguno de los horarios
            let horarioEncontrado = false;
            Object.keys(slot._doc).forEach(key => {
                if (slot[key] === correo) {
                    slot[key] = ""; // Limpiar el contenido del horario
                    horarioEncontrado = true;
                }
            });

            if (!horarioEncontrado) {
                return res.status(404).json({ message: 'No se encontraron horarios para el correo proporcionado.' });
            }

            // Guardar los cambios en la base de datos
            slot.save()
                .then(() => {
                    res.json({ message: 'Se ha cancelado la cita correctamente.' });
                })
                .catch(err => {
                    res.status(500).json({ error: 'Error al cancelar la cita.' });
                });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al buscar los horarios.' });
        });
});

app.post('/rescheduleAppointment', (req, res) => {
    const { fechaNueva, horarioNuevo, correo, tipo, fechaVieja } = req.body; // Propiedades recibidas en el cuerpo de la petición

    // Determinar el modelo correspondiente según el tipo de profesional
    const RegisterModel = tipo === 'Dentista' ? RegisterModelCita : RegisterModelCitaP;

    // Consultar en la base de datos para buscar la cita programada en la fecha vieja
    RegisterModel.findOne({ fecha: fechaVieja })
        .then(slot => {
            if (!slot) {
                // Si no se encuentra una cita en la fecha vieja, crear un nuevo documento para la fecha nueva
                const newSlot = new RegisterModel({
                    fecha: fechaNueva,
                    [horarioNuevo]: correo
                });

                // Guardar la nueva cita en la base de datos
                newSlot.save()
                    .then(() => {
                        res.json({ message: 'La cita ha sido programada exitosamente.' });
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'Error al programar la cita en la fecha nueva.' });
                    });
            } else {
                // Verificar si el correo está programado en el horario de la fecha vieja
                let horarioEncontrado = false;
                let horarioViejo;
                Object.entries(slot._doc).forEach(([key, value]) => {
                    if (value === correo) {
                        horarioEncontrado = true;
                        horarioViejo = key;
                    }
                });

                if (!horarioEncontrado) {
                    return res.status(404).json({ message: 'No se encontró una cita programada para el correo proporcionado en la fecha vieja.' });
                }

                // Limpiar el horario de la fecha vieja
                slot[horarioViejo] = "";

                // Guardar los cambios en la base de datos para la cita en la fecha vieja
                slot.save()
                    .then(() => {
                        let horarioField;
                        // Verificar si ya existe una cita programada en la fecha nueva
                        switch (horarioNuevo) {
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
                        RegisterModel.findOne({ fecha: fechaNueva })
                            .then(existingSlot => {
                                if (existingSlot) {
                                    // Actualizar el horario correspondiente
                                    existingSlot[horarioField] = correo;
                                    return existingSlot.save()
                                        .then(() => {
                                            res.status(200).json({ message: `Cita reagendada exitosamente.` });
                                        })
                                        .catch(err => {
                                            res.status(500).json({ message: `Error al actualizar el horario ${horarioField}.` });
                                        });
                                } else {
                                    // Si no existe un documento con la fecha, crear uno nuevo con todos los horarios vacíos
                                    const newSlot = {
                                        fecha: fechaNueva,
                                        primerHorario: horarioNuevo === 1 ? correo : "",
                                        segundoHorario: horarioNuevo === 2 ? correo : "",
                                        tercerHorario: horarioNuevo === 3 ? correo : "",
                                        cuartoHorario: horarioNuevo === 4 ? correo: "",
                                        quintoHorario: horarioNuevo === 5 ? correo : "",
                                        sextoHorario: horarioNuevo === 6 ? correo : ""
                                    };
                                    return RegisterModel.create(newSlot)
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
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'Error al limpiar el horario de la fecha vieja.' });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al buscar la cita programada en la fecha vieja.' });
        });
});
app.post('/saveFollowStudent', (req, res) => {
    const { email, comentario, fechaCita, horarioCita,tipo } = req.body;

    // Crear una instancia del modelo con los datos recibidos
    const newCuestionaryData = new followStudent({
        email: email,
        comentario: comentario,
        fechaCita: fechaCita,
        horarioCita: horarioCita,
        tipo:tipo
    });

    // Guardar los datos en la base de datos
    newCuestionaryData.save()
        .then(() => {
            const RegisterModel = tipo === 'Dentista' ? RegisterModelCita : RegisterModelCitaP;

    // Consultar en la base de datos para buscar la coincidencia por fecha y correo
    RegisterModel.findOne({ fecha: fechaCita })
        .then(slot => {
            if (!slot) {
                return res.status(404).json({ message: 'No se encontraron horarios para la fecha proporcionada.' });
            }

            // Verificar si el correo está presente en alguno de los horarios
            let horarioEncontrado = false;
            Object.keys(slot._doc).forEach(key => {
                if (slot[key] === email) {
                    slot[key] = ""; // Limpiar el contenido del horario
                    horarioEncontrado = true;
                }
            });

            if (!horarioEncontrado) {
                return res.status(404).json({ message: 'No se encontraron horarios para el correo proporcionado.' });
            }

            // Guardar los cambios en la base de datos
            slot.save()
                .then(() => {
                    res.status(200).json({ message: 'Los datos del seguimiento han sido guardados exitosamente y se da por finalizada la cita.' });
                })
                .catch(err => {
                    res.status(500).json({ error: 'Error al guardar seguimiento la cita.' });
                });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al buscar los horarios.' });
        });
           
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al guardar los datos del cuestionario.' });
        });
});

app.post('/getFollowStudentsByEmail', (req, res) => {
    const { email, tipo } = req.body; // Correo electrónico y tipo a buscar

    // Consultar en el modelo FollowStudent para encontrar todas las coincidencias por correo electrónico y tipo
    followStudent.find({ email: email, tipo: tipo })
        .then(users => {
            if (users.length === 0) {
                return res.status(404).json({ message: `No se encontraron alumnos siguiendo este correo electrónico con tipo ${tipo}.` });
            }

            res.json({ users: users });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error al buscar usuarios.' });
        });
});
app.post('/enviarNotificacion', (req, res) => {
  const { fecha, hora, minuto, mensaje } = req.body;

  // Parsea la fecha y la hora en el formato correcto utilizando Moment.js
  const fechaFormateada = moment(fecha, 'DD/MM/YYYY').format('YYYY-MM-DD');
  const horaFormateada = moment(`${fechaFormateada} ${hora}:${minuto}`, 'YYYY-MM-DD HH:mm');

  const payload = {
    notification: {
      title: "Título de la notificación",
      body: mensaje,
    },
    // Otras opciones como datos adicionales...
    // Aquí se agrega el campo 'scheduledTime' para programar el envío de la notificación
    scheduledTime: horaFormateada.toDate()
  };

  const options = {
    timeToLive: 60 * 60, // Tiempo de vida de la notificación en segundos (opcional)
  };

  admin.messaging().send(payload)
    .then((response) => {
      console.log("Notificación programada enviada:", response);
      res.status(200).send("Notificación programada enviada");
    })
    .catch((error) => {
      console.error("Error al programar la notificación:", error);
      res.status(500).send("Error al programar la notificación");
    });
});
app.listen(3001, () => {
    console.log("Server is Running PORT 3001")
})
