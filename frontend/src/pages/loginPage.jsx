import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import logo from '../assets/EscudoESCOM.png'

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
    <div className='d-flex justify-content-center align-items-center  py-5 font-serif'>
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col self-center h-[32rem] w-[50%] content-center bg-slate-100 rounded m-0 ">
            <h1 className='mb-4 text-sky-700'>¡Bienvenido!</h1>
            <img src={logo} alt="" className='max-w-[490px] min-w-[100px] w-100' />
            <p className='mt-4 mb-0 fs-4 text-sky-700'>¿No tienes cuenta?</p>
            <div className="">
              <Link className='btn btn-outline-dark w-100 rounded-50 text-decoration-none fs-5' to={'/register'}>Registrarse</Link>
            </div>
          </div>
          <div className="col h-[32rem] m-0 p-0">
            <div className="bg-sky-700 h-[32rem] p-3 rounded w-100 content-center">
              <div className="">
                <h2 className='text-white fs-2'>Ingresar</h2>
                {
                  errors.map((error, i) => (
                    <div className='bg-danger text-white p-2 rounded' key={i}>
                      {error}
                    </div>

                  ))
                }
                <form className='' onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className='flex'>
                      <strong className='text-white fs-5'>Email</strong>
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
                    <label htmlFor="email" className='flex'>
                      <strong className='text-white fs-5'>Contraseña</strong>
                    </label>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      name="password"
                      className="form-control rounded-50"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-light w-100 rounded-50 fs-5">
                    Ingresar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default loginPage
