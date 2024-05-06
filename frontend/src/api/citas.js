import axios from './axios'

//*Obtener horarios disponibles
export const getHorariosRequest = (fecha,tipo) => 
                                axios.post('/availableSlots', {fecha,tipo});

//*Agendar cita
export const agendarCitaRequest = (fecha, horario, correo, tipo) => 
                                axios.post('/bookSlot', {fecha, horario, correo, tipo});

//*Obtener mis citas
export const getMisCitasRequest = (correo,tipo) => 
                                axios.post('/allSlotsByCorreo', {correo,tipo});
                                
//*Obtener las citas de un profesional
export const getMisCitasProRequest = (tipo) => 
                                axios.post('/allSlots', {tipo});

//Obtener 
export const BuscarPorEmailRequest = (correo, tipo) => 
                                axios.post('/searchByEmail', {correo, tipo});

//Registrar cuestionario
export const enviarCuestionarioRequest = (emailUsuario, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) => 
                                axios.post('/registerCuestionary', {emailUsuario, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5});

//Obtener respuestas de cuestionario
export const getRespuestasCuestionarioRequest = (emailUsuario) => 
                                axios.post('/getCuestionaryResponses', {emailUsuario});

//*Cancelar una cita de un alumno
export const cancelCitaRequest = (fecha, correo, tipo) => 
                                axios.post('/cancelAppointment', {fecha, correo, tipo});

//Reagendar una cita de un alumno
export const reagendarCitaRequest = (fechaNueva, horarioNuevo, correo, tipo, fechaVieja ) => 
                                axios.post('/rescheduleAppointment', {fechaNueva, horarioNuevo, correo, tipo, fechaVieja });


//Guardar 
export const guardarSeguimientoRequest = ( email, comentario, fechaCita, horarioCita,tipo) => 
                                axios.post('/saveFollowStudent', { email, comentario, fechaCita, horarioCita,tipo});

//Obtener seguimiento
export const getSeguimientoRequest = (email, tipo) => 
                                axios.post('/getFollowStudentsByEmail', {email, tipo});