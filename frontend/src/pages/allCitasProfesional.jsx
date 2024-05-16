import { useEffect, useState } from 'react';
import { getMisCitasProRequest } from '../api/citas.js'
import { Link, useNavigate } from 'react-router-dom'
//Importar componente de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

function allCitasProfesional() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [citas, setCitas] = useState([]);
    const getAllCitas = async () => {
        try {
            const res = await getMisCitasProRequest(user.rol);
            console.log(res);
            setCitas(res.data.slots);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllCitas();
    }, []);

    return (
        <div className='w-100 bg-white rounded px-4 py-4 '>
            <h1 className='text-center w-100 bg-sky-700 rounded p-2 text-white'>Ver citas pendientes</h1>
            <div className=" text-center mb-2 w-100 my-4">
                <div className="row align-items-start ">
                    <div className="col ">
                        <ul className="list-group w-100 ">
                            <li className="list-group-item text-center fw-bold fs-4 bg-sky-700 text-white">Fecha</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-group w-100">
                            <li className="list-group-item text-center fw-bold fs-4 bg-sky-700 text-white">Horario</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-group w-100">
                            <li className="list-group-item text-center fw-bold fs-4 bg-sky-700 text-white">Correo</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-group w-100">
                            <li className="list-group-item text-center fw-bold fs-4 bg-sky-700 text-white">Acciones</li>
                        </ul>
                    </div>
                </div>
            </div>

            {
                citas.length !== 0 ?
                    citas.map(e => (
                        <div key={e.fecha} className=" text-center">
                            <div className="row row-cols-4 align-items-start">
                                <div className="col">
                                    <ul className="list-group w-100">
                                        <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-5  bg-sky-700 text-white">{e.fecha}</li>
                                    </ul>
                                </div>
                                <div className="col  ">
                                    <ul className="list-group w-100">
                                        {
                                            e.primerHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-5  bg-sky-700 text-white">09:00 - 10:30</li>
                                        }{
                                            e.segundoHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-5  bg-sky-700 text-white">10:30 - 12:00</li>
                                        }{
                                            e.tercerHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-5  bg-sky-700 text-white">12:00 - 13:30</li>
                                        }{
                                            e.cuartoHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-5  bg-sky-700 text-white">13:30 - 15:00</li>
                                        }{
                                            e.quintoHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-5  bg-sky-700 text-white">15:00 - 16:30</li>
                                        }{
                                            e.sextoHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-5  bg-sky-700 text-white">16:30 - 18:00</li>
                                        }
                                    </ul>
                                </div>
                                <div className="col">
                                    <ul className=" list-group w-100">
                                        {
                                            e.primerHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">{e.primerHorario}</li>
                                        }{
                                            e.segundoHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">{e.segundoHorario}</li>
                                        }{
                                            e.tercerHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">{e.tercerHorario}</li>
                                        }{
                                            e.cuartoHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">{e.cuartoHorario}</li>
                                        }{
                                            e.quintoHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">{e.quintoHorario}</li>
                                        }{
                                            e.sextoHorario &&
                                            <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">{e.sextoHorario}</li>
                                        }

                                    </ul>
                                </div>
                                <div className="col">
                                    <ul className=" list-group w-100">
                                        {/* <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white"> */}
                                            {
                                                e.primerHorario &&
                                                <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">
                                                    <Link to={`/detalles-cita/${e.primerHorario}/09:00 - 10:30/${e.fecha.split('/')}`}>
                                                        <button className='btn btn-outline-light w-100 rounded-50 fw-bold fs-5'>
                                                            <FontAwesomeIcon className='fs-5 mx-2' icon={faCircleInfo} />
                                                            Detalles
                                                        </button>
                                                    </Link>
                                                </li>

                                            }
                                            {
                                                e.segundoHorario &&
                                                <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">
                                                    <Link to={`/detalles-cita/${e.segundoHorario}/10:30 - 12:00/${e.fecha.split('/')}`}>
                                                        <button className='btn btn-outline-light w-100 rounded-50 fw-bold fs-5'>
                                                            <FontAwesomeIcon className='fs-5 mx-2' icon={faCircleInfo} />
                                                            Detalles</button>
                                                    </Link>
                                                </li>

                                            }{
                                                e.tercerHorario &&
                                                <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">
                                                    <Link to={`/detalles-cita/${e.tercerHorario}/12:00 - 13:30/${e.fecha.split('/')}`}>
                                                        <button className='btn btn-outline-light w-100 rounded-50 fw-bold fs-5'>
                                                            <FontAwesomeIcon className='fs-5 mx-2' icon={faCircleInfo} />
                                                            Detalles</button>
                                                    </Link>
                                                </li>

                                            }{
                                                e.cuartoHorario &&
                                                <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">
                                                    <Link to={`/detalles-cita/${e.curatoHorario}/13:30 - 15:00/${e.fecha.split('/')}`}>
                                                        <button className='btn btn-outline-light w-100 rounded-50 fw-bold fs-5'>
                                                            <FontAwesomeIcon className='fs-5 mx-2' icon={faCircleInfo} />
                                                            Detalles</button>
                                                    </Link>
                                                </li>

                                            }{
                                                e.quintoHorario &&
                                                <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">
                                                    <Link to={`/detalles-cita/${e.quintoHorario}/15:00 - 16:30/${e.fecha.split('/')}`}>
                                                        <button className='btn btn-outline-light w-100 rounded-50 fw-bold fs-5'>
                                                            <FontAwesomeIcon className='fs-5 mx-2' icon={faCircleInfo} />
                                                            Detalles</button>
                                                    </Link>
                                                </li>

                                            }{
                                                e.sextoHorario &&
                                                <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">
                                                    <Link to={`/detalles-cita/${e.sextoHorario}/16:30 - 18:00/${e.fecha.split('/')}`}>
                                                        <button className='btn btn-outline-light w-100 rounded-50 fw-bold fs-5'>
                                                            <FontAwesomeIcon className='fs-5 mx-2' icon={faCircleInfo} />
                                                            Detalles</button>
                                                    </Link>
                                                </li>

                                            }

                                            {
                                                (!e.primerHorario && !e.segundoHorario && !e.tercerHorario &&
                                                    !e.cuartoHorario && !e.quintoHorario && !e.sextoHorario) &&
                                                <li className="list-group-item text-center content-center h-[4rem] mb-1 fw-bold fs-6 bg-sky-700 text-white">
                                                    <p className='m-0 p-0'>Sin acciones</p>
                                                </li>


                                            }
                                        {/* </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    ))
                    :
                    <div className='text-center fw-bold fs-4'>Sin citas</div>
            }


        </div>
    )
}

export default allCitasProfesional
