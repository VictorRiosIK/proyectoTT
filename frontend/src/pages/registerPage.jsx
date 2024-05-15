import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import logo from '../assets/logo.png'

function registerPage() {
  const [name, setName] = useState()
  const [boleta, setBoleta] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const rol = 'Alumno';
  const { signupEstudiante, isAuthenticated, errors, adds } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && boleta && email && password && rol) {
      signupEstudiante(name, boleta, email, password, rol);
    }
    //http://localhost:3001  https://proyecto-tt-api.vercel.app/registerStudent
    //   axios.post('http://localhost:3001/registerStudent', {name, boleta, email, password, rol})
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err))
  }
  //Si esta autenticado cambia de pagina
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/');
  //   }

  // }, [isAuthenticated])

  return (
    <div className="d-flex justify-content-center align-items-center  py-5 font-serif">
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col self-center h-[32rem] w-[50%] content-center bg-slate-100 rounded m-0">
            <h1 className='mb-4 text-sky-700'>¡Bienvenido!</h1>
            <img src={logo} alt="" className='max-w-[290px] min-w-[100px] w-100 rounded-3xl' />
            <p className='mt-4 mb-0 fs-4 text-sky-700'>¿Ya tienes cuenta?</p>
            <div className='m-0'>
              <Link className='btn btn-outline-dark w-100 rounded-50 text-decoration-none fs-5' to={'/login'}>Ingresar</Link>
            </div>
          </div>
          <div className="col h-[32rem]  m-0 p-0">
            <div className="bg-sky-700 h-[32rem] p-3 rounded w-100">
              <h2 className='text-white fs-2'>Registrate</h2>
              {
                errors.map((error, i) => (
                  <div className='bg-danger text-white p-2 rounded' key={i}>
                    {error}
                  </div>

                ))
              }
              {
                (adds !== null) &&
                <div className='bg-success  text-black p-2 rounded' key={adds}>
                  {adds}
                </div>

              }
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className='flex'>
                    <strong className='text-white fs-5 '>Nombre</strong>
                  </label>
                  <input required
                    type="text"
                    placeholder="Nombre"
                    autoComplete="off"
                    name="name"
                    className="form-control rounded-50"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="boleta" className='flex'>
                    <strong className='text-white fs-5 '>Boleta</strong>
                  </label>
                  <input required maxLength={10} minLength={10} pattern='^[0-9,$]*$'
                    type="text"
                    placeholder="Boleta"
                    autoComplete="off"
                    name="boleta"
                    className="form-control rounded-50"
                    onChange={(e) => setBoleta(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className='flex'>
                    <strong className='text-white fs-5 '>Email</strong>
                  </label>
                  <input required
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-50"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className='flex'>
                    <strong className='text-white fs-5 '>Contraseña</strong>
                  </label>
                  <input required 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    className="form-control rounded-50"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-outline-light w-100 rounded-50 my-4 fs-5">
                  Registrar
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default registerPage
