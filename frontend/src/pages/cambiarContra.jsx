import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import img from '../assets/contra.png'
import { cambiarContraseñaRequest } from '../api/citas.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { buscarPorEmailRequest } from '../api/citas.js';

function cambiarContra() {
    const [vieja, setVieja] = useState();
    const [nueva, setNueva] = useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [adds, setAdd] = useState([]);
    const [boleta, setBoleta] = useState([]);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const updateContrasena = async () => {
        try {
            const res = await cambiarContraseñaRequest(user.email, vieja, nueva, user.rol);
            console.log(res)
            setAdd([res.data.message])
        } catch (error) {
            console.log(error);
            setErrors([error.response.data.message]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(vieja, nueva);
        await updateContrasena();
       
    }

    const getAlumno = async()=>{
        const res = await buscarPorEmailRequest(user.email,'Alumno');
        console.log(res);
        setBoleta(res.data.user);
    }

    //funcion para eliminar los mensajes pasados un tiempo
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [errors]);
    //funcion para eliminar los mensajes pasados un tiempo
    useEffect(() => {
        if (adds.length > 0) {
            const timer = setTimeout(() => {
                setAdd([])
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [adds])

    useEffect(() => {
        if (user.rol === 'Alumno') {
            getAlumno();
        }
    }, [])

    return (
        <div className='d-flex justify-content-center align-items-center  py-5 font-serif'>
            <div className="container text-center">
                <div className="row align-items-start">
                    <div className="col self-center h-[30rem] w-[50%] content-center bg-slate-100 rounded m-0 ">
                        <h1 className='mb-4 text-sky-700'>¡No olvides tu contraseña!</h1>
                        <img src={img} alt="" className='max-w-[300px] min-w-[100px] w-100' />
                        <p className='mt-4 mb-0 fs-4 text-sky-700'>Guardala en un lugar seguro</p>
                    </div>
                    <div className="col h-[30rem] m-0 p-0">
                        <div className="bg-sky-700 h-[30rem] p-3 rounded w-100 content-center">
                            <div className="">

                                {/* <h2 className='text-white fs-2 mb-4'>Actualizar contraseña</h2> */}
                                {
                                    errors.map((error, i) => (
                                        <div className='bg-danger text-white p-2 rounded' key={i}>
                                            {error}
                                        </div>

                                    ))
                                }
                                {
                                    adds.map((add, i) => (
                                        <div className='bg-success text-white p-2 rounded' key={i}>
                                            {add}
                                        </div>

                                    ))
                                }

                                <div className="mb-3">
                                    <label htmlFor="email" className='flex'>
                                        <strong className='text-white fs-5'>Correo</strong>
                                    </label>
                                    <input
                                        type="text"
                                        name="Correo"
                                        className="form-control rounded-50"
                                        value={user.email}
                                        disabled
                                    />
                                </div>

                                {
                                    user.rol === 'Alumno' &&
                                    <div className="mb-3">
                                    <label htmlFor="email" className='flex'>
                                        <strong className='text-white fs-5'>Boleta</strong>
                                    </label>
                                    <input
                                        type="text"
                                        name="Correo"
                                        className="form-control rounded-50"
                                        value={boleta.boleta}
                                        disabled
                                    />
                                </div>
                                }


                                <form className='' onSubmit={handleSubmit} autoComplete='off'>
                                    <div className="mb-3">
                                        <label htmlFor="vieja" className='flex'>
                                            <strong className='text-white fs-5'>Contraseña Actual</strong>
                                        </label>
                                        <input 
                                            type="password"
                                            placeholder="Contraseña"
                                            autoComplete="off"
                                            name="vieja"
                                            className="form-control rounded-50"
                                            onChange={(e) => setVieja(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nueva" className='flex'>
                                            <strong className='text-white fs-5'>Nueva Contraseña</strong>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Nueva contraseña"
                                            name="nueva"
                                            className="form-control rounded-50"
                                            onChange={(e) => setNueva(e.target.value)}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <button type="submit" className="flex  btn btn-outline-light text-center place-content-center w-100 rounded-50 fs-5">
                                        <FontAwesomeIcon className='flex p-1' icon={faArrowsRotate} />
                                        Actualizar
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

export default cambiarContra
