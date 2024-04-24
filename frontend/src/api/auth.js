import axios from './axios'


//Nuevo registroAlumno
export const registerRequest = (name,boleta,email,password,rol) => 
                                axios.post('/registerStudent', {name, boleta, email, password, rol})
//export const registerRequest = user => axios.post(`/register`,user)


//Nuevo login
export const loginRequest = (email,password) => axios.post('/login', {email, password})
//export const loginRequest = user => axios.post(`/login`,user)



export const verifyTokenRequest = ()=> axios.get('/verify')