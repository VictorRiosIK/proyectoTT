import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

function verificacion() {

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
            <img src={logo} alt="" className='max-w-[290px] min-w-[100px] w-100' />
            
            
          </div>
          <div className="col h-[32rem] m-0 p-0">
            <div className="bg-sky-700 h-[32rem] p-3 rounded w-100 content-center">
              <div className="">
                <h2 className='text-white fs-1'>Verificado</h2>
                <FontAwesomeIcon className='text-9xl mx-2 text-white' icon={faCircleCheck} />
                <p className='mt-4 mb-0 fs-4 text-white'>Ahora puedes acceder al sitio con tu correo y contraseña</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default verificacion
