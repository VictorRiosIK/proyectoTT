import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { buscarPorEmailRequest, getRespuestasCuestionarioRequest, guardarSeguimientoRequest } from '../api/citas.js';



function detallesCitaPro() {
    const params = useParams();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [datosAlumno, setDatosAlumno] = useState([]);
    const [cuestionario, setCuestionario] = useState([]);
    const [coment, setComent] = useState('');
    const [fecha, setFecha] = useState('');
    const [showCuestionario, setShowCuestionario] = useState(false);
    const rol = user.rol;
    const [errors, setErrors] = useState([]);
    const getFecha = ()=>{
        let fechaa='';
        if(params.fecha){
            for(let l = 0; l <params.fecha.length; l++){ 
                if(params.fecha[l] === ","){
                    fechaa +="/"
                }else{
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
            const res = await getRespuestasCuestionarioRequest(params.id);
            console.log(res);
            setCuestionario(res.data);
            setShowCuestionario(true);

        }

    }

    const terminarCita = () =>{
        //REVISAR
        if (params.id && coment !== '' && fecha && params.horario && rol) {
            console.log(params.id, coment,fecha, params.horario, rol)
            //guardarSeguimientoRequest(, comentario, fechaCita, horarioCita,tipo)
        }
        if(coment === ''){
            const error = 'Ingresar un comentario de seguimiento';
            setErrors([error])
            console.log(errors)
        }
        
    }
    //funcion para eliminar los mensajes pasados un tiempo
    useEffect(() =>{
        if(errors.length > 0){
           const timer = setTimeout(()=>{
                setErrors([])
            },6000);
            return () => clearTimeout(timer);
        }
    },[errors])

    useEffect(() => {
        getFecha();
        getDatosAlumno();
        
    }, []);

    return (
        <div>
            <h1 className='text-center'>Detalles de la cita</h1>
            <div className="container text-center">
                <div className="row align-items-start">
                    <div className="col ">
                        <ul className="list-group w-100 bg-primary bg-opacity-50 p-1">
                            <li className="list-group-item text-start fw-bold fs-5 bg-transparent">
                                <div className="container text-center">
                                    <div className="row align-items-start">
                                        <div className="col text-end">
                                            Nombre:
                                        </div>
                                        <div className="col text-start">
                                            {datosAlumno.name}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item text-start fw-bold fs-5 bg-transparent">
                                <div className="container text-center">
                                    <div className="row align-items-start">
                                        <div className="col text-end">
                                            Email:
                                        </div>
                                        <div className="col text-start">
                                            {datosAlumno.email}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item text-start fw-bold fs-5 bg-transparent">
                                <div className="container text-center">
                                    <div className="row align-items-start">
                                        <div className="col text-end">
                                            Fecha de la cita:
                                        </div>
                                        <div className="col text-start">
                                            {fecha && <>{fecha}</>}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item text-start fw-bold fs-5 bg-transparent">
                                <div className="container text-center">
                                    <div className="row align-items-start">
                                        <div className="col text-end">
                                            Horario de la cita:
                                        </div>
                                        <div className="col text-start">
                                            {params.horario && <>{params.horario}</>}
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item text-start fw-bold fs-5 bg-transparent">
                                <div className="container text-center">
                                    <div className="row align-items-start">
                                        <div className="col text-end">
                                            Boleta:
                                        </div>
                                        <div className="col text-start">
                                            {datosAlumno.boleta}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="text-center my-2">
                            
                                <div className="row align-items-start">
                                    <div className="col ">
                                        <div className='bg-primary p-3 rounded'>
                                            <label className="form-label fw-bold fs-5">Comentario de seguimiento</label>
                                            <textarea className="form-control"  required rows="3" onChange={(e) => setComent(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    <div className="col gap-2 ">
                                        <button className='btn btn-success w-100 rounded-50 fw-bold m-2'>Seguimiento</button>
                                        {
                                            rol === 'Psicologo' &&
                                            <button className='btn btn-primary w-100 rounded-50 fw-bold m-2' onClick={getCuestionario}>Ver Cuestionario</button>
                                        }
                                        <button className='btn btn-danger w-100 rounded-50 fw-bold m-2' type='submit' onClick={terminarCita}>Terminar cita</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                    {
                        showCuestionario &&
                        <div className='text-start'>
                            <h3>Cuestionario</h3>
                            <ol className="list-group list-group-numbered bg-opacity-50 bg-success p-1">
                                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">¿Cuándo te sientes mejor?</div>
                                        {cuestionario.respuesta1}
                                    </div>

                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Cuándo hablas con personas, generalmente:</div>
                                        {cuestionario.respuesta2}
                                    </div>

                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Cuándo te relajas, te sientas con:</div>
                                        {cuestionario.respuesta3}
                                    </div>

                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Cuando vas a una fiesta o reunión social:</div>
                                        {cuestionario.respuesta4}
                                    </div>

                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-start bg-transparent">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Estás trabajando muy duro, estás muy concentrado y te interrumpen, ¿Comó reaccionas?</div>
                                        {cuestionario.respuesta5}
                                    </div>

                                </li>
                            </ol>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default detallesCitaPro
