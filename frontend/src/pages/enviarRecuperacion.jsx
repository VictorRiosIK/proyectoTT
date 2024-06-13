import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import img from '../assets/email.png'
import { cambiarContraseñaRequest } from '../api/citas.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { buscarPorEmailRequest } from '../api/citas.js';
import { useParams } from 'react-router-dom';
import { recuperarRequest } from '../api/auth.js';

function enviarRecuperacion() {
    const [correo, setCorreo] = useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [adds, setAdd] = useState([]);

    const enviarRec = async () => {
        try {
            if(correo){
                console.log(correo);
                const res =  await recuperarRequest(correo);
                setAdd(['Correo enviado'])
                console.log(res);
            }else{
                setErrors(['Ingresa tu correo electronico'])
            }

            
        } catch (error) {
            console.log(error);
            setErrors([error.response.data.message])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(vieja, nueva);
        await enviarRec();

    }

    //funcion para eliminar los mensajes pasados un tiempo
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [errors])
    //funcion para eliminar los mensajes pasados un tiempo
    useEffect(() => {
        if (adds.length > 0) {
            const timer = setTimeout(() => {
                setAdd([])
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [adds])

    return (
        <div className='d-flex justify-content-center align-items-center  py-5 font-serif max-lg:px-8'>
            <div className="container text-center">
                <div className="row align-items-start">
                    <div className="col self-center h-[30rem] w-[50%] content-center bg-slate-100 rounded m-0 ">
                        <h1 className='mb-4 text-sky-700'>Revisa tu correo electronico</h1>
                        <img src={img} alt="" className='max-w-[300px] min-w-[100px] w-100' />
                        <p className='mt-4 mb-0 fs-4 text-sky-700'>Ingresa al link que te enviaremos para recuperar tu contraseña</p>
                    </div>
                    <div className="col h-[30rem] m-0 p-0">
                        <div className="bg-sky-700 h-[30rem] p-3 rounded w-100 content-center">
                            <div className="">
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

                                <form className='' onSubmit={handleSubmit} autoComplete='off'>
                                    <div className="mb-3">
                                        <label htmlFor="correo" className='flex'>
                                            <strong className='text-white fs-5'>Correo electronico</strong>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            autoComplete="off"
                                            name="correo"
                                            className="form-control rounded-50"
                                            onChange={(e) => setCorreo(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="flex  btn btn-outline-light text-center place-content-center w-100 rounded-50 fs-5">
                                        <FontAwesomeIcon className='flex p-1' icon={faPaperPlane} />
                                        Enviar
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

export default enviarRecuperacion
