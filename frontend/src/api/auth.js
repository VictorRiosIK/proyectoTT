import axios from 'axios'

const API = 'http://localhost:3001/api'
const webAPI = 'https://proyecto-tt-api.vercel.app/api';

export const registerRequest = user => axios.post(`${webAPI}/register`,user)

export const loginRequest = user => axios.post(`${API}/login`,user)