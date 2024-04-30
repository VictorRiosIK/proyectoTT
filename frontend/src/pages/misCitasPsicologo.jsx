import { useEffect, useState } from 'react';
import { getMisCitasRequest } from '../api/citas.js'

function misCitasPsicologo() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [citas,setCitas] = useState([]);
  let cita = []
  const getMisCitas = async () => {
    try {
      //setCitas([]);
      const res = await getMisCitasRequest(user.email,'Psicologo');
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


  useEffect(() => {
    getMisCitas();
  }, []);

  return (
    <div>
      <h1 className='text-center'>Mis citas con el psicologo</h1>

      <div className='d-flex w-100 gap-3'>
        <ul class="list-group w-100">
          <li class="list-group-item text-center fw-bold fs-4">Fecha</li>
        </ul>
        <ul class="list-group w-100">
          <li class="list-group-item text-center fw-bold fs-4">Horario</li>
        </ul>
      </div>
      {
        citas.length !== 0 ?
        citas.map(e => (
          <div key={e.fecha} className='d-flex w-100 gap-3'>
            <ul class="list-group w-100">
              <li class="list-group-item text-center fw-bold fs-4">{e.fecha}</li>
            </ul>
            <ul class="list-group w-100">
              <li class="list-group-item text-center fw-bold fs-4">{e.horario}</li>
            </ul>
          </div>
      ))
      : 
      <div className='text-center fw-bold fs-4'>Sin citas</div>
      }
    </div>
  )
}

export default misCitasPsicologo
