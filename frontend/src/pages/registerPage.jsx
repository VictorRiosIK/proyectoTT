import axios from 'axios'
import { useState } from "react";
import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'

function registerPage() {
    const [name, setName] = useState()
    const [boleta, setBoleta] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const rol = 1;
    const {signupEstudiante} = useAuth();


    const handleSubmit = (e) => {
      e.preventDefault();
      signupEstudiante(name,boleta,email,password,rol); //http://localhost:3001  https://proyecto-tt-api.vercel.app/registerStudent
    //   axios.post('http://localhost:3001/registerStudent', {name, boleta, email, password, rol})
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err))
    }

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
    <div className="bg-white p-3 rounded w-25">
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
            className="form-control rounded-0"
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
            className="form-control rounded-0"
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
            className="form-control rounded-0"
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
            className="form-control rounded-0"
            onChange={(e) => setPassword(e.target.value)}          
          />
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-0">
          Registrar
        </button>
        <p>¿Ya tienes cuenta?</p>
        <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
        <Link className='text-black' to={'/login'}>Ingresar</Link>
        </button>
      </form>
    </div>
  </div>
  )
}

export default registerPage
