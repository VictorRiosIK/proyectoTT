import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import img from '../assets/contra.png'
import { cambiarContraseñaRequest } from '../api/citas.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faArrowsRotate, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { buscarPorEmailRequest } from '../api/citas.js';
import { useParams } from 'react-router-dom';
import { resetRequest } from '../api/auth.js';
import { Tooltip } from 'react-tooltip'


function recuperarCon() {
    const [confirm, setConfirm] = useState();
    const [nueva, setNueva] = useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [adds, setAdd] = useState([]);
    const params = useParams();
    const { token} = params;
    const updateContrasena = async () => {
        try {
            if (token, nueva, confirm) {
                if (nueva === confirm) {
                    console.log(token, nueva, confirm);
                    const res = await resetRequest(nueva, token);
                    console.log(res);
                    setAdd(['Cambio de contraseña exitoso'])
                } else {
                    setErrors(['Contraseñas no coinciden'])
                }

            } else {
                setErrors(['Ingresar campos necesarios']);
            }

        } catch (error) {
            console.log(error);
            setErrors([error.response.data.message])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(vieja, nueva);
        await updateContrasena();

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
        <div className='d-flex justify-content-center align-items-center  py-5 font-serif max-lg:px-5'>
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
                                <div className='text-start w-100'>
                                    <button className=" btn text-white m-0 p-0 place-content-start my-anchor-element"><FontAwesomeIcon className='' icon={faCircleQuestion} /></button>
                                    <Tooltip anchorSelect=" .my-anchor-element" place="top">
                                        <p>La contraseña debe contener al menos una letra mayúscula, 
                                        <br />una  letra minúscula, un número, un carácter especial 
                                         <br /> y tener una longitud mínima de 8 caracteres.</p>
                                    </Tooltip>
                                </div>
                                <form className='' onSubmit={handleSubmit} autoComplete='off'>
                                    <div className="mb-3">
                                        <label htmlFor="vieja" className='flex gap-1'>
                                            <strong className='text-white fs-5'>Nueva Contraseña</strong>

                                        </label>

                                        <input
                                            type="password"
                                            placeholder="Contraseña"
                                            autoComplete="off"
                                            name="vieja"
                                            className="form-control rounded-50"
                                            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$'
                                            onChange={(e) => setNueva(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nueva" className='flex'>
                                            <strong className='text-white fs-5'>Confirmar Contraseña</strong>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Confirmar contraseña"
                                            name="nueva"
                                            className="form-control rounded-50"
                                            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$'
                                            onChange={(e) => setConfirm(e.target.value)}
                                            autoComplete='off'
                                        />
                                    </div>
                                    <button type="submit" className="flex  btn btn-outline-light text-center place-content-center w-100 rounded-50 fs-5">
                                        <FontAwesomeIcon className='flex p-1' icon={faArrowsRotate} />
                                        Cambiar
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

export default recuperarCon
