import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { buscarPorEmailRequest, getRespuestasCuestionarioRequest, guardarSeguimientoRequest, getSeguimientoRequest } from '../api/citas.js';
//Importar componente de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faEye, faClipboardQuestion, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'


function detallesCitaPro() {
    const params = useParams();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [datosAlumno, setDatosAlumno] = useState([]);
    const [cuestionario, setCuestionario] = useState([]);
    const [seguimiento, setSeguimiento] = useState([]);
    const [coment, setComent] = useState('');
    const [fecha, setFecha] = useState('');
    const [showCuestionario, setShowCuestionario] = useState(false);
    const [showSeguimiento, setShowSeguimiento] = useState(false);
    const rol = user.rol;
    const [errors, setErrors] = useState([]);

    const getFecha = () => {
        let fechaa = '';
        if (params.fecha) {
            for (let l = 0; l < params.fecha.length; l++) {
                if (params.fecha[l] === ",") {
                    fechaa += "/"
                } else {
                    fechaa += params.fecha[l]
                }
            }
            setFecha(fechaa);
        }
    }

    const getDatosAlumno = async () => {
        if (params.id) {
            console.log(params);
            const res = await buscarPorEmailRequest(params.id, 'Alumno');
            console.log(res);
            setDatosAlumno(res.data.user);
        }
    }

    const getCuestionario = async () => {
        if (params.id) {
            try {
                const res = await getRespuestasCuestionarioRequest(params.id);
                console.log(res);
                setCuestionario(res.data);
                setShowCuestionario(true);
                setShowSeguimiento(false);
            } catch (error) {
                console.log(error);
                setErrors([error.response.data.message]);
            }

        }

    }

    const getSeguimiento = async () => {
        if (params.id) {
            try {
                const res = await getSeguimientoRequest(params.id, rol);
                console.log(res.data.users);
                setSeguimiento(res.data.users);
                setShowSeguimiento(true);
                setShowCuestionario(false);
                console.log(seguimiento);
            } catch (error) {
                console.log(error);
                setErrors([error.response.data.message]);
            }
        }

    }

    const terminarCita = async () => {
        //REVISAR
        if (coment === '') {
            const error = 'Ingresar un comentario de seguimiento';
            setErrors([error])
            //console.log("Error", errors)
        } else {
            if (params.id && fecha && params.horario && rol) {
                console.log(params.id, coment, fecha, params.horario, rol);
                await guardarSeguimientoReq(params.id, coment, fecha, params.horario, rol);
            }
        }
    }

    const guardarSeguimientoReq = async (email, comentario, fechaCita, horarioCita, tipo) => {
        try {
            const res = await guardarSeguimientoRequest(email, comentario, fechaCita, horarioCita, tipo);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
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

    useEffect(() => {
        getFecha();
        getDatosAlumno();

    }, []);

    return (
        <div className='bg-white rounded p-4 my-4'>
            <h1 className='text-center fw-bold bg-sky-700 rounded py-1 text-white'>Detalles de la cita</h1>
            {
                errors.map((error, i) => (
                    <div className='bg-danger text-white p-2 fs-4 fw-bold rounded my-2' key={i}>
                        {error}
                    </div>

                ))
            }
            <div className=" text-center">
                <div className="row align-items-start">
                    <div className="col ">
                        <ul className="list-group w-100 bg-sky-700 p-2">
                            <li className="list-group-item text-start fw-bold fs-5 bg-transparent">
                                <div className="container text-center">
                                    <div className="row align-items-start fs-3">
                                        <div className="col text-end text-white">
                                            Nombre:
                                        </div>
                                        <div className="col text-start text-white">
                                            {datosAlumno.name}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item text-start fw-bold fs-5 bg-transparent">
                                <div className="container text-center">
                                    <div className="row align-items-start fs-3">
                                        <div className="col text-end text-white">
                                            Email:
                                        </div>
                                        <div className="col text-start text-white">
                                            {datosAlumno.email}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item text-start fw-bold fs-5 bg-transparent">
                                <div className="container text-center">
                                    <div className="row align-items-start fs-3">
                                        <div className="col text-end text-white">
                                            Fecha de la cita:
                                        </div>
                                        <div className="col text-start text-white">
                                            {fecha && <>{fecha}</>}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item text-start fw-bold fs-5 bg-transparent">
                                <div className="container text-center">
                                    <div className="row align-items-start fs-3">
                                        <div className="col text-end text-white">
                                            Horario de la cita:
                                        </div>
                                        <div className="col text-start text-white">
                                            {params.horario && <>{params.horario}</>}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item text-start fw-bold fs-5 bg-transparent">
                                <div className="container text-center">
                                    <div className="row align-items-start fs-3">
                                        <div className="col text-end text-white">
                                            Boleta:
                                        </div>
                                        <div className="col text-start text-white">
                                            {datosAlumno.boleta}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="text-center my-2">

                            <div className="row align-items-start">
                                <div className="col ">
                                    <div className='bg-sky-700 p-3 rounded'>
                                        <label className="form-label fw-bold fs-4 text-white">Comentario de seguimiento</label>
                                        <textarea className="form-control" required rows="4" maxLength={115} onChange={(e) => setComent(e.target.value)}></textarea>

                                    </div>
                                </div>
                                <div className="col gap-2 w-100">
                                    <button className='btn btn-outline-success w-100 rounded-50 fw-bold my-2 fs-5' onClick={getSeguimiento}>
                                        <FontAwesomeIcon className='fs-5 mx-2' icon={faEye} />
                                        Seguimiento
                                    </button>
                                    {
                                        rol === 'Psicologo' &&
                                        <button className='btn btn-outline-primary w-100 rounded-50 fw-bold my-2 fs-5' onClick={getCuestionario}>
                                            <FontAwesomeIcon className='fs-5 mx-2' icon={faClipboardQuestion} />
                                            Ver Cuestionario
                                        </button>
                                    }
                                    <button className='btn btn-outline-danger w-100 rounded-50 fw-bold my-2 fs-5' type='submit' onClick={terminarCita}>
                                        <FontAwesomeIcon className='fs-5 mx-2' icon={faFlagCheckered} />
                                        Terminar cita
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        showCuestionario &&
                        <div className='text-start'>
                            <h3 className='fw-bold fs-3 bg-sky-500 rounded p-2 text-white'>Cuestionario</h3>
                            <ol className="list-group list-group-numbered bg-sky-500 p-1">
                                <li className="list-group-item d-flex fs-3 justify-content-between align-items-start bg-transparent text-white">
                                    <div className="ms-2 me-auto ">
                                        <div className="fw-bold ">¿Cuándo te sientes mejor?</div>
                                        <p className='fs-4 m-0'>{cuestionario.respuesta1}</p>
                                    </div>

                                </li>
                                <li className="list-group-item d-flex fs-3 justify-content-between align-items-start bg-transparent text-white">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold  ">Cuándo hablas con personas, generalmente:</div>
                                        <p className='fs-4 m-0'>{cuestionario.respuesta2}</p>
                                    </div>

                                </li>
                                <li className="list-group-item d-flex fs-3 justify-content-between align-items-start bg-transparent text-white">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold  ">Cuándo te relajas, te sientas con:</div>
                                        <p className='fs-4 m-0'>{cuestionario.respuesta3}</p>
                                    </div>

                                </li>
                                <li className="list-group-item d-flex fs-3 justify-content-between align-items-start bg-transparent text-white">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold  ">Cuando vas a una fiesta o reunión social:</div>
                                        <p className='fs-4 m-0'>{cuestionario.respuesta4}</p>
                                    </div>

                                </li>
                                <li className="list-group-item d-flex fs-3 justify-content-between align-items-start bg-transparent text-white">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold  ">Estás trabajando muy duro, estás muy concentrado y te interrumpen, ¿Comó reaccionas?</div>
                                        <p className='fs-4 m-0'>{cuestionario.respuesta5}</p>
                                    </div>

                                </li>
                            </ol>
                        </div>
                    }
                    {
                        showSeguimiento &&
                        <div>
                            <h3 className='flex fw-bold fs-3 bg-emerald-700 rounded p-2 text-white'>Seguimiento</h3>
                            <div className=" text-center mb-2 w-100 my-4">
                                <div className="row align-items-start ">
                                    <div className="col ">
                                        <ul className="list-group w-100 ">
                                            <li className="list-group-item text-center fw-bold fs-4 bg-emerald-700 text-white">Fecha</li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul className="list-group w-100">
                                            <li className="list-group-item text-center fw-bold fs-4 bg-emerald-700 text-white">Horario</li>
                                        </ul>
                                    </div>
                                    <div className="col">
                                        <ul className="list-group w-100">
                                            <li className="list-group-item text-center fw-bold fs-4 bg-emerald-700 text-white">Comentario</li>
                                        </ul>
                                    </div>
                                </div>
                                {
                                    seguimiento.length !== 0 &&
                                    seguimiento.map(e => (
                                        <div className="row align-items-start my-1">
                                            <div className="col ">
                                                <ul className="list-group w-100 ">
                                                    <li className="list-group-item text-center content-center fw-bold fs-4 bg-emerald-700 text-white h-[6rem]">{e.fechaCita}</li>
                                                </ul>
                                            </div>
                                            <div className="col">
                                                <ul className="list-group w-100">
                                                    <li className="list-group-item text-center content-center fw-bold fs-4 bg-emerald-700 text-white h-[6rem]">{e.horarioCita}</li>
                                                </ul>
                                            </div>
                                            <div className="col">
                                                <ul className="list-group w-100">
                                                    <li className="list-group-item text-center fw-bold  bg-emerald-700 text-white h-[6rem]">{e.comentario}</li>
                                                </ul>
                                            </div>

                                        </div>
                                    ))

                                }

                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default detallesCitaPro
