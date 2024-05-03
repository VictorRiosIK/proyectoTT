import axios from 'axios'
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import Select from 'react-select';

function registerProPage() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const {signupProfesional,  isAuthenticated, errors,adds} = useAuth();
    const navigate = useNavigate();
    const opcionesS = [{value:'Psicologo',label:'Psicologo'},{value:'Dentista',label:'Dentista'}];
    let selectedR = null;

    const handleSubmit = (e) => {
      e.preventDefault();
      if(name && email && password && selectedR){
        signupProfesional(name,email,password,selectedR.value);
      }
    }
    const handleChange = (selectedOption) => {
        selectedR = selectedOption
        console.log(selectedR.value);
      }

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100">
    <div className="bg-primary p-3 rounded w-50">
      <h2>Registrar Profesional</h2>
        {
          errors.map((error, i) =>(
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
          <label htmlFor="name">
            <strong>Nombre</strong>
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
          <label htmlFor="email">
            <strong>Email</strong>
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
          <label htmlFor="password">
            <strong>Contraseña</strong>
          </label>
          <input required
            type="password"
            placeholder="Contraseña"
            name="password"
            className="form-control rounded-50"
            onChange={(e) => setPassword(e.target.value)}          
          />
        </div>
        <div className="mb-3">
        <label htmlFor="rol">
            <strong>Profesión</strong>
          </label>
        <Select className="p-2 fs-4 rounded w-100 " placeholder="Seleccionar opción" options={opcionesS} onChange={handleChange}></Select>
        </div>
        <button type="submit" className="btn btn-light w-100 rounded-50">
          Registrar
        </button>
        
      </form>
    </div>
  </div>
  )
}

export default registerProPage
