import axios from './axios'

//Obtener horarios disponibles
export const getHorariosRequest = (fecha,tipo) => 
                                axios.post('/availableSlots', {fecha,tipo});

//Agendar cita
export const agendarCitaRequest = (fecha, horario, correo, tipo) => 
                                axios.post('/bookSlot', {fecha, horario, correo, tipo});

//Obtener mis citas
export const getMisCitasRequest = (correo,tipo) => 
                                axios.post('/allSlotsByCorreo', {correo,tipo});
                                
//Obtener las citas de un profesional
export const getMisCitasProRequest = (tipo) => 
                                axios.post('/allSlots', {tipo});

//Cancelar una cita de un alumno
export const cancelCitaRequest = (fecha, correo, tipo) => 
                                axios.post('/cancelAppointment', {fecha, correo, tipo});

//Reagendar una cita de un alumno
export const reagendarCitaRequest = (fechaNueva, horarioNuevo, correo, tipo, fechaVieja ) => 
                                axios.post('/rescheduleAppointment', {fechaNueva, horarioNuevo, correo, tipo, fechaVieja });
