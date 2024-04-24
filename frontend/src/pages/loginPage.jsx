import axios from 'axios'
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'
import { useEffect } from 'react';

function loginPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const {signinEstudiante,isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signinEstudiante(email, password);
    // axios.post('https://proyecto-tt-api.vercel.app/login', {email, password})
    // .then(result => console.log(result))
    // .catch(err => console.log(err))
  }
  
  //Si esta autenticado cambia de pagina
  useEffect(()=>{
    if(isAuthenticated){
        navigate('/');
    }
    
  }, [isAuthenticated])

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
    <div className="bg-white p-3 rounded w-25">
      <h2>Ingresar</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            name="email"
            className="form-control rounded-0"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Contraseña</strong>
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            className="form-control rounded-0"
            onChange={(e) => setPassword(e.target.value)}          
          />
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-0">
          Ingresar
        </button>
        <p>¿No tienes cuenta?</p>
        <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
        <Link className='text-black' to={'/register'}>Registrarse</Link>
        </button>
      </form>
    </div>
  </div>
    </div>
  )
}

export default loginPage
