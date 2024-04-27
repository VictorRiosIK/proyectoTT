import axios from 'axios'
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'
import { useEffect } from 'react';

function registerPage() {
    const [name, setName] = useState()
    const [boleta, setBoleta] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const rol = 1;
    const {signupEstudiante,  isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      signupEstudiante(name,boleta,email,password,rol); //http://localhost:3001  https://proyecto-tt-api.vercel.app/registerStudent
    //   axios.post('http://localhost:3001/registerStudent', {name, boleta, email, password, rol})
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err))
    }
  //Si esta autenticado cambia de pagina
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

  }, [isAuthenticated])
  return (
    <div className="d-flex justify-content-center align-items-center  vh-100">
    <div className="bg-primary p-3 rounded w-50">
      <h2>Registrate</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">
            <strong>Nombre</strong>
          </label>
          <input
            type="text"
            placeholder="Nombre"
            autoComplete="off"
            name="name"
            className="form-control rounded-50"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="boleta">
            <strong>Boleta</strong>
          </label>
          <input
            type="text"
            placeholder="Boleta"
            autoComplete="off"
            name="boleta"
            className="form-control rounded-50"
            onChange={(e) => setBoleta(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            name="email"
            className="form-control rounded-50"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">
            <strong>Contraseña</strong>
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            className="form-control rounded-50"
            onChange={(e) => setPassword(e.target.value)}          
          />
        </div>
        <button type="submit" className="btn btn-light w-100 rounded-50">
          Registrar
        </button>
        <p>¿Ya tienes cuenta?</p>
        <div >
        <Link className='btn btn-dark w-100 rounded-50 text-decoration-none' to={'/login'}>Ingresar</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default registerPage
