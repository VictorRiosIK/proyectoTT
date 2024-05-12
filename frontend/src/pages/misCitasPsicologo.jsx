import { useEffect, useState } from 'react';
import { getMisCitasRequest, cancelCitaRequest, reagendarCitaRequest } from '../api/citas.js'
//Importar componente de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faTrash, faCalendarMinus } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

function misCitasPsicologo() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [citas, setCitas] = useState([]);
  let cita = []
  const navigate = useNavigate();
  //OBTENER LA CITAS DEL ALUMNO
  const getMisCitas = async () => {
    try {
      //setCitas([]);
      const res = await getMisCitasRequest(user.email, 'Psicologo');
      console.log(res);
      cita = [];
      res.data.slots.forEach(e => {
        if (e.primerHorario) {
          //console.log(e.primerHorario)
          cita.push({ fecha: e.fecha, horario: '09:00 - 10:30' });
        }
        if (e.segundoHorario) {
          //console.log(e.segundoHorario);
          cita.push({ fecha: e.fecha, horario: '10:30 - 12:00' });
        }
        if (e.tercerHorario) {
          //console.log(e.tercerHorario);
          cita.push({ fecha: e.fecha, horario: '12:00 - 13:30' });
        }
        if (e.cuartoHorario) {
          //console.log(e.cuartoHorario);
          cita.push({ fecha: e.fecha, horario: '13:30 - 15:00' });
        }
        if (e.quintoHorario) {
          //console.log(e.quintoHorario);
          cita.push({ fecha: e.fecha, horario: '15:00 - 16:30' });
        }
        if (e.sextoHorario) {
          //console.log(e.sextoHorario);
          cita.push({ fecha: e.fecha, horario: '16:30 - 18:00' });
        }
      })
      setCitas(cita);
      //console.log(cita);

    } catch (error) {
      console.log(error);
    }
  }

  //CANCELAR CITA
  const cancelarCita = async (fecha) => {
    console.log(user);
    console.log(fecha);
    const res = await cancelCitaRequest(fecha, user.email, 'Psicologo');
    console.log(res);
    getMisCitas();
  }
  //REAGENDAR CITA
  const reagendarCita = (fecha, horario) => {
    console.log(fecha,horario);
    navigate(`/agendar-psicologo/${fecha}/${horario}`)
  }

  useEffect(() => {
    getMisCitas();
  }, []);

  return (
    <div className='bg-[#800040] rounded px-2 py-4'>
      <h1 className='text-center w-100 bg-white rounded p-2 text-[#800040]'>Mis citas con el psicologo </h1>
      <div className='w-100 my-4'>
        <h5 className='text-white'>*NOTA: No se puede cancelar ni reagendar una cita faltando 24 horas para la cita.</h5>
        {/* <button className='btn btn-outline-dark w-25 rounded-75' onClick={()=>{alert("Hola")}}>
        <FontAwesomeIcon className='fs-3 icon-link icon-link-hover' icon={faQuestion} />
      </button> */}
      </div>
      <div className='flex w-[100%] gap-3'>
        <ul className="list-group w-100">
          <li className="list-group-item text-center fw-bold fs-4">Fecha</li>
        </ul>
        <ul className="list-group w-100">
          <li className="list-group-item text-center fw-bold fs-4">Horario</li>
        </ul>
        <ul className="list-group w-100">
          <li className="list-group-item text-center fw-bold fs-4">Acciones</li>
        </ul>
      </div>
      {
        citas.length !== 0 ?
          citas.map(e => (
            <div key={e.fecha} className='flex w-100 gap-3 my-2'>
              <ul className="list-group w-100">
                <li className="list-group-item text-center fw-bold fs-4 h-[7rem]">
                  <p className='my-4 w-100'>{e.fecha}</p>
                </li>
              </ul>
              <ul className="list-group w-100">
                <li className="list-group-item text-center fw-bold fs-4 h-[7rem]">
                  <p className='my-4 w-100'>{e.horario}</p>
                </li>
              </ul>
              <ul className="list-group w-100">
                <li className="list-group-item text-center fw-bold fs-4 h-[7rem]">
                  <div className='d-flex gap-4 '>
                    <button className='btn btn-danger w-100 rounded-50 text-center fw-bold my-1' onClick={() => { cancelarCita(e.fecha) }}>
                      <FontAwesomeIcon className='fs-5 mx-2' icon={faTrash} />
                      Cancelar
                    </button>
                  </div>
                  <button className='btn btn-warning w-100 rounded-50 fw-bold my-1' onClick={() => { reagendarCita(e.fecha.split('/'),e.horario) }}>
                  <FontAwesomeIcon className='fs-5 mx-2' icon={faCalendarMinus} />
                  Reagendar
                </button>
              </li>

            </ul>
            </div>
  ))
          :
  <div className='text-center text-white fw-bold fs-4'>Sin citas</div>
}
    </div >
  )
}

export default misCitasPsicologo
