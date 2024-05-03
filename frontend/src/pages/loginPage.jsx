import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react';

function loginPage() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { signinEstudiante, isAuthenticated, errors } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signinEstudiante(email, password);
    // axios.post('https://proyecto-tt-api.vercel.app/login', {email, password})
    // .then(result => console.log(result))
    // .catch(err => console.log(err))
  }

  //Si esta autenticado cambia de pagina
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

  }, [isAuthenticated])



  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-primary p-3 rounded w-50">
          <h2>Ingresar</h2>
          {
                    errors.map((error, i) =>(
                        <div className='bg-danger text-white p-2 rounded' key={i}>
                            {error}
                        </div>
                        
                    ))
          }
          <form className='' onSubmit={handleSubmit}>
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
              <label htmlFor="email">
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
              Ingresar
            </button>
            <p>¿No tienes cuenta?</p>
            <div className="">
              <Link className='btn btn-dark w-100 rounded-50 text-decoration-none' to={'/register'}>Registrarse</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default loginPage
