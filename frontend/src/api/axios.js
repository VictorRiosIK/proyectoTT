import axios from "axios";


const API = 'http://localhost:3001/api'
const webAPI = 'https://proyecto-tt-api.vercel.app/api';

const instance = axios.create({
    baseURL: API,
    withCredentials: true,
});

export default instance