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
            

