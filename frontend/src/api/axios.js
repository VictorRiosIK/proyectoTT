import axios from "axios";


const API = 'http://localhost:3001'
const webAPI = 'https://proyecto-tt-api.vercel.app';

const instance = axios.create({
    baseURL: API,
   // withCredentials: true,
});

export default instance