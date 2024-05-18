import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import Select from 'react-select';
import img from '../assets/profesionals.png'

function registerProPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [selection, setSelection] = useState(null);
  const { signupProfesional, isAuthenticated, errors, adds } = useAuth();
  const navigate = useNavigate();
  const opcionesS = [{ value: 'Psicologo', label: 'Psicologo' }, { value: 'Dentista', label: 'Dentista' }];
  let selectedR = null;

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(name , email , password , selection);
    if (name && email && password && selection) {
      console.log(name , email , password , selection);
      await signupProfesional(name, email, password, selection);
    }
  }
  const handleChange = (selectedOption) => {
    // console.log('Cambio')
    setSelection(selectedOption.value);
    console.log(selection)
    // selectedR = selectedOption
    // console.log(selectedR.value);
  }

  return (
    <div>
      <div className=" text-center">
        <div className="row align-items-start max-md:m-5 rounded gap-4">
          <div className="col self-center h-[34rem] w-[50%] content-center bg-slate-100 rounded m-0 ">
            <div className=" w-100 h-[95%] content-center bg-gray-200 rounded p-4">
              <h1 className='mb-4 text-sky-700 fw-bold my-2'>Registrar Profesional</h1>
              <img src={img} alt="" className='max-w-[490px] min-w-[100px] w-100 rounded ' />
            </div>
          </div>

          <div className="col self-center h-[34rem] w-[100%] content-center bg-sky-700 rounded m-0">
            <div className="d-flex justify-content-center align-items-center ">
              <div className=" h-[30rem] p-3 rounded w-100">

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
                  <div className="mb-3">
                    <label htmlFor="rol" className='flex'>
                      <strong className='text-white fs-5 '>Profesión</strong>
                    </label>
                    <Select className="p-2 fs-4 rounded w-100 " placeholder="Seleccionar opción" required options={opcionesS} onChange={handleChange}></Select>
                  </div>
                  <button type="submit" className="btn btn-outline-light w-100 rounded-50 fs-5">
                    Registrar
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

export default registerProPage
