import { useEffect, useState } from 'react';
import { getMisCitasProRequest } from '../api/citas.js'


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
        <div>
            <h1 className='text-center'>Mis citas con el dentista</h1>

            <div className='d-flex w-100 gap-3'>
                <ul className="list-group w-100">
                    <li className="list-group-item text-center fw-bold fs-4">Fecha</li>
                </ul>
                <ul className="list-group w-100">
                    <li className="list-group-item text-center fw-bold fs-4">Horario</li>
                </ul>
                <ul className="list-group w-100">
                    <li className="list-group-item text-center fw-bold fs-4">Correo</li>
                </ul>
            </div>
            {
                citas.length !== 0 ?
                    citas.map(e => (
                        <div key={e.fecha} className='d-flex w-100 gap-3 my-4'>
                            <ul className="list-group w-100">
                            <li className="list-group-item text-center fw-bold fs-4">{e.fecha}</li>
                            </ul>
                                <ul className="list-group w-100">
                                    {
                                        e.primerHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">09:00 - 10:30</li>
                                    }{
                                        e.segundoHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">10:30 - 12:00</li>
                                    }{
                                        e.tercerHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">12:00 - 13:30</li>
                                    }{
                                        e.cuartoHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">13:30 - 15:00</li>
                                    }{
                                        e.quintoHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">15:00 - 16:30</li>
                                    }{
                                        e.sextoHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">16:30 - 18:00</li>
                                    }
                                </ul>
                                <ul className=" list-group w-100">
                                    {
                                        e.primerHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">{e.primerHorario}</li>
                                    }{
                                        e.segundoHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">{e.segundoHorario}</li>
                                    }{
                                        e.tercerHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">{e.tercerHorario}</li>
                                    }{
                                        e.cuartoHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">{e.cuartoHorario}</li>
                                    }{
                                        e.quintoHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">{e.quintoHorario}</li>
                                    }{
                                        e.sextoHorario &&
                                        <li className="list-group-item text-center fw-bold fs-4">{e.sextoHorario}</li>
                                    }

                                </ul>
                            </div>
                    ))
                    :
                    <div className='text-center fw-bold fs-4'>Sin citas</div>
            }


        </div>
    )
}

export default allCitasProfesional
