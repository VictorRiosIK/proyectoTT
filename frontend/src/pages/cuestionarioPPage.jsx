import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import Select from 'react-select';
import {enviarCuestionarioRequest} from '../api/citas.js'


function cuestionarioPPage() {
    const { isAuthenticated, adds } = useAuth();
    const navigate = useNavigate();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [errors, setErrors] = useState([]);
    
    const opcionesP1 = [
        {
            value: 'Por la mañana.', label: 'Por la mañana.'
        },
        {
            value: 'Por la tarde y justo entrada la noche.', label: 'Por la tarde y justo entrada la noche.'
        },
        {
            value: 'De noche.', label: 'De noche.'
        }
    ];
    const opcionesP2 = [
        {
            value: 'Tienes los brazos cruzados.', label: 'Tienes los brazos cruzados.'
        },
        {
            value: 'Tienes las manos juntas.', label: 'Tienes las manos juntas.'
        },
        {
            value: 'Tienes una o ambas manos en las caderas.', label: 'Tienes una o ambas manos en las caderas.'
        },
        {
            value: 'Juegas con tu oreja, tocas tu mentón o acaricias tu pelo.', label: 'Juegas con tu oreja, tocas tu mentón o acaricias tu pelo.'
        }
    ];
    const opcionesP3 = [
        {
            value: 'Las rodillas dobladas y las piernas muy juntas.', label: 'Las rodillas dobladas y las piernas muy juntas.'
        },
        {
            value: 'Las piernas cruzadas.', label: 'Las piernas cruzadas.'
        },
        {
            value: 'Las piernas extendidas o rectas.', label: 'Las piernas extendidas o rectas.'
        },
        {
            value: 'Una pierna doblada hacia atras.', label: 'Una pierna doblada hacia atras.'
        }
    ];
    const opcionesP4 = [
        {
            value: 'Haces una entrada ruidosa para que todo el mundo te vea.', label: 'Haces una entrada ruidosa para que todo el mundo te vea.'
        },
        {
            value: 'Haces una entrada discreta, buscando un conocido.', label: 'Haces una entrada discreta, buscando un conocido.'
        },
        {
            value: 'Haces una entrada muy discreta, tratando de pasar desapercibido.', label: 'Haces una entrada muy discreta, tratando de pasar desapercibido.'
        }
    ];
    const opcionesP5 = [
        {
            value: 'Agradeces el descanso.', label: 'Agradeces el descanso.'
        },
        {
            value: 'Te sientes extremadamente irritado.', label: 'Te sientes extremadamente irritado.'
        },
        {
            value: 'Alternas entre estos dos extremos.', label: 'Alternas entre estos dos extremos.'
        }
    ];
    
    
    let selectedP1 = null;
    let selectedP2 = null;
    let selectedP3 = null;
    let selectedP4 = null;
    let selectedP5 = null;

    //Enviar cuestionario Psicologo
    const enviarCuestionario = async (emailUsuario, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5) =>{
        try {
            const res = await enviarCuestionarioRequest(emailUsuario, respuesta1, respuesta2, respuesta3, respuesta4, respuesta5);
            
            console.log(res);
        } catch (error) {
            setErrors([error.response.data.message]);
            document.getElementById("cuestionario").reset();
            console.log(error);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user.email, selectedP1, selectedP2, selectedP3, selectedP4, selectedP5)
        if (user.email && selectedP1 && selectedP2 && selectedP3 && selectedP4 && selectedP5) {
            console.log(user.email, selectedP1, selectedP2, selectedP3, selectedP4, selectedP5)
            enviarCuestionario(user.email, selectedP1, selectedP2, selectedP3, selectedP4, selectedP5);
            document.getElementById("cuestionario").reset();
            if(!errors){
                navigate('/');
            }
            
        }
    }
    const selectChange = (selectedOption,question) => {
        if(question === 1){
            selectedP1 = selectedOption.value
            console.log(selectedP1);
        }
        if(question === 2){
            selectedP2 = selectedOption.value
            console.log(selectedP2);
        }
        if(question === 3){
            selectedP3 = selectedOption.value
            console.log(selectedP3);
        }
        if(question === 4){
            selectedP4 = selectedOption.value
            console.log(selectedP4);
        }
        if(question === 5){
            selectedP5 = selectedOption.value
            console.log(selectedP5);
        }   
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-primary p-3 rounded w-75 ">
                <h2 className='text-center fs-1'>Cuestionario Psicología</h2>
                {
                      errors.map((error, i) => (
                        <div className='bg-danger text-white p-2 rounded' key={i}>
                          {error}
                        </div>

                      ))
                }
                
                <form onSubmit={onSubmit} id='cuestionario'>
                    <div className="mb-5">
                        <label htmlFor="P1" className='fs-4'>
                            <strong>1. ¿Cuándo te sientes mejor?</strong>
                        </label>
                        <Select className="p-2 fs-4 rounded w-100 " placeholder="Seleccionar opción" 
                        options={opcionesP1}  onChange={(e)=>selectChange(e,1)} ></Select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="P2" className='fs-4'>
                            <strong>2. Cuándo hablas con personas, generalmente:</strong>
                        </label>
                        <Select className="p-2 fs-4 rounded w-100 " placeholder="Seleccionar opción"
                         options={opcionesP2} onChange={(e)=>selectChange(e,2)}></Select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="P3" className='fs-4'>
                            <strong>3. Cuándo te relajas, te sientas con:</strong>
                        </label>
                        <Select className="p-2 fs-4 rounded w-100 " placeholder="Seleccionar opción"
                         options={opcionesP3} onChange={(e)=>selectChange(e,3)}></Select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="P4" className='fs-4'>
                            <strong>4. Cuando vas a una fiesta o reunión social:</strong>
                        </label>
                        <Select className="p-2 fs-4 rounded w-100 " placeholder="Seleccionar opción"
                         options={opcionesP4} onChange={(e)=>selectChange(e,4)}></Select>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="P5" className='fs-4'>
                            <strong>5. Estás muy concentrado y trabajando muy duro, pero te interrumpen, ¿Comó reaccionas?</strong>
                        </label>
                        <Select className="p-2 fs-4 rounded w-100 " placeholder="Seleccionar opción"
                         options={opcionesP5} onChange={(e)=>selectChange(e,5)}></Select>
                    </div>
                    <button type="submit" className="btn btn-light w-100 rounded-50">
                        Guardar Respuestas
                    </button>

                </form>
            </div>
        </div>
    )
}

export default cuestionarioPPage
