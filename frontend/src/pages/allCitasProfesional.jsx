import { useEffect, useState } from 'react';
import { getMisCitasProRequest } from '../api/citas.js'
import { Link, useNavigate } from 'react-router-dom'


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
        <div className='w-100'>
            <h1 className='text-center'>Ver citas pendientes</h1>
            <div className=" text-center mb-2">
                <div className="row align-items-start">
                    <div className="col">
                        <ul className="list-group w-100">
                            <li className="list-group-item text-center fw-bold fs-4">Fecha</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-group w-100">
                            <li className="list-group-item text-center fw-bold fs-4">Horario</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-group w-100">
                            <li className="list-group-item text-center fw-bold fs-4">Correo</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-group w-100">
                            <li className="list-group-item text-center fw-bold fs-4">Acciones</li>
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
                                        <li className="list-group-item text-center fw-bold fs-5">{e.fecha}</li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <ul className="list-group w-100">
                                        {
                                            e.primerHorario &&
                                            <li className="list-group-item text-center fw-bold fs-5">09:00 - 10:30</li>
                                        }{
                                            e.segundoHorario &&
                                            <li className="list-group-item text-center fw-bold fs-5">10:30 - 12:00</li>
                                        }{
                                            e.tercerHorario &&
                                            <li className="list-group-item text-center fw-bold fs-5">12:00 - 13:30</li>
                                        }{
                                            e.cuartoHorario &&
                                            <li className="list-group-item text-center fw-bold fs-5">13:30 - 15:00</li>
                                        }{
                                            e.quintoHorario &&
                                            <li className="list-group-item text-center fw-bold fs-5">15:00 - 16:30</li>
                                        }{
                                            e.sextoHorario &&
                                            <li className="list-group-item text-center fw-bold fs-5">16:30 - 18:00</li>
                                        }
                                    </ul>
                                </div>
                                <div className="col">
                                    <ul className=" list-group w-100">
                                        {
                                            e.primerHorario &&
                                            <li className="list-group-item text-center fw-bold fs-6">{e.primerHorario}</li>
                                        }{
                                            e.segundoHorario &&
                                            <li className="list-group-item text-center fw-bold fs-6">{e.segundoHorario}</li>
                                        }{
                                            e.tercerHorario &&
                                            <li className="list-group-item text-center fw-bold fs-6">{e.tercerHorario}</li>
                                        }{
                                            e.cuartoHorario &&
                                            <li className="list-group-item text-center fw-bold fs-6">{e.cuartoHorario}</li>
                                        }{
                                            e.quintoHorario &&
                                            <li className="list-group-item text-center fw-bold fs-6">{e.quintoHorario}</li>
                                        }{
                                            e.sextoHorario &&
                                            <li className="list-group-item text-center fw-bold fs-6">{e.sextoHorario}</li>
                                        }

                                    </ul>
                                </div>
                                <div className="col">
                                    <ul className=" list-group w-100">
                                        <li className="list-group-item text-center fw-bold fs-6">
                                            {
                                                e.primerHorario &&
                                                <Link to={`/detalles-cita/${e.primerHorario}/09:00 - 10:30/${e.fecha.split('/')}`}>
                                                    <button className='btn btn-warning w-100 rounded-50 fw-bold'>Detalles</button>
                                                </Link>
                                            }
                                            {
                                                e.segundoHorario &&
                                                <Link to={`/detalles-cita/${e.segundoHorario}/10:30 - 12:00/${e.fecha.split('/')}`}>
                                                    <button className='btn btn-warning w-100 rounded-50 fw-bold'>Detalles</button>
                                                </Link>
                                            }{
                                                e.tercerHorario &&
                                                <Link to={`/detalles-cita/${e.tercerHorario}/12:00 - 13:30/${e.fecha.split('/')}`}>
                                                    <button className='btn btn-warning w-100 rounded-50 fw-bold'>Detalles</button>
                                                </Link>
                                            }{
                                                e.cuartoHorario &&
                                                <Link to={`/detalles-cita/${e.curatoHorario}/13:30 - 15:00/${e.fecha.split('/')}`}>
                                                    <button className='btn btn-warning w-100 rounded-50 fw-bold'>Detalles</button>
                                                </Link>
                                            }{
                                                e.quintoHorario &&
                                                <Link to={`/detalles-cita/${e.quintoHorario}/15:00 - 16:30/${e.fecha.split('/')}`}>
                                                    <button className='btn btn-warning w-100 rounded-50 fw-bold'>Detalles</button>
                                                </Link>
                                            }{
                                                e.sextoHorario &&
                                                <Link to={`/detalles-cita/${e.sextoHorario}/16:30 - 18:00/${e.fecha.split('/')}`}>
                                                    <button className='btn btn-warning w-100 rounded-50 fw-bold'>Detalles</button>
                                                </Link>
                                            }
                                        </li>
                                        {
                                                (!e.primerHorario && !e.segundoHorario && !e.tercerHorario &&
                                                 !e.cuartoHorario && !e.quintoHorario && !e.sextoHorario) &&
                                                <li className="list-group-item text-center fw-bold fs-6">Sin acciones</li>
                                            }
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
