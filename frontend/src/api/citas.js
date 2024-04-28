import axios from './axios'

//Obtener horarios disponibles
export const getHorariosRequest = (fecha) => 
                                axios.post('/availableSlots', {fecha});


//Agendar cita
export const agendarCitaRequest = (fecha, horario, correo) => 
                                axios.post('/bookSlot', {fecha, horario, correo});

//Obtener mis citas
export const getMisCitasRequest = (correo) => 
                                axios.post('/allSlotsByCorreo', {correo});
            

