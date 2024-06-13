import { useEffect, useState } from 'react';
import { getMisCitasRequest, cancelCitaRequest, reagendarCitaRequest, getSeguimientoRequest } from '../api/citas.js'
//Importar componente de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faTrash, faCalendarMinus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

function misCitasDentista() {
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [citas, setCitas] = useState([]);
  const [showError, setShowError] = useState(false);
  const [seguimiento, setSeguimiento] = useState([]);
  let cita = []
  const getMisCitas = async () => {
    try {
      //setCitas([]);
      const res = await getMisCitasRequest(user.email, 'Dentista');
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

  const calcularDiferenciaHoras = (fecha, horario) => {

    const anio = fecha.substring(6, 10);
    const mes = fecha.substring(3, 5);
    const mesZ = parseInt(mes) - 1;

    const dia = fecha.substring(0, 2);
    const hora = horario.substring(0, 2);
    const minuto = horario.substring(3, 5);
    const fechaCita = new Date(anio, mesZ.toString(), dia, hora, minuto)

    const hoy = new Date();

    let diferencia = (fechaCita.getTime() - hoy.getTime()) / 1000 / 3600;
    return (Math.abs(Math.round(diferencia)))
  }

  //CANCELAR CITA
  const cancelarCita = async (fecha, horario) => {
    //console.log(user);
    //console.log(fecha);
    const restan = calcularDiferenciaHoras(fecha, horario);
    //console.log(restan);
    if (restan > 24) {
      const res = await cancelCitaRequest(fecha, user.email, 'Dentista');
      console.log(res);
      getMisCitas();
    } else {
      setShowError(true);
    }
  }

  //REAGENDAR CITA
  const reagendarCita = (fecha, horario) => {
    //console.log(fecha, horario);
    const restan = calcularDiferenciaHoras(fecha, horario);
    //console.log(restan);
    if (restan > 24) {
      navigate(`/agendar-dentista/${fecha.split('/')}/${horario}`)
    } else {
      setShowError(true);
    }
  }

  //Seguimiento
  const getSeguimiento = async () => {
    if (user) {
      try {
        const res = await getSeguimientoRequest(user.email, 'Dentista');
        console.log(res.data);
        setSeguimiento(res.data.users);
        //console.log(seguimiento);
      } catch (error) {
        console.log(error);
        setErrors([error.response.data.message]);
      }
    }

  }

  useEffect(() => {
    getMisCitas();
    getSeguimiento();
  }, []);

  //funcion para eliminar los mensajes pasados un tiempo
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false)
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showError])

  return (
    <div className='bg-[#800040] rounded px-2 py-4'>

<div className='w-100 rounded px-2 py-2 text-xs'>


<h1 className='text-center w-100 bg-white rounded p-2 text-[#800040]'>Cita activa con el dentista</h1>
      <div className='w-100 my-4'>
        <h5 className='text-white'>
          {
            showError &&
            <FontAwesomeIcon className='fs-2 mx-2 text-yellow-400' icon={faTriangleExclamation} />
          }
          NOTA: No se puede cancelar ni reagendar una cita faltando 24 horas para la cita.
        </h5>
        {/* <button className='btn btn-outline-dark w-25 rounded-75' onClick={()=>{alert("Hola")}}>
        <FontAwesomeIcon className='fs-3 icon-link icon-link-hover' icon={faQuestion} />
      </button> */}
      </div>
      <div className='flex w-100 md:gap-5'>
        <ul className="list-group w-100">
          <li className="list-group-item text-center md:font-bold md:text-xl">Fecha</li>
        </ul>
        <ul className="list-group w-100">
          <li className="list-group-item text-center md:font-bold md:text-xl">Horario</li>
        </ul>
        <ul className="list-group w-100">
          <li className="list-group-item text-center md:font-bold md:text-xl">Acciones</li>
        </ul>
      </div>
      {
        citas.length !== 0 ?
          citas.map(e => (
            <div key={e.fecha} className='flex w-100 md:gap-3 my-2'>
              <ul className="list-group w-100">
                <li className="list-group-item text-center md:font-bold md:text-xl h-[7rem]">
                  <p className='my-4 w-100'>{e.fecha}</p>
                </li>
              </ul>
              <ul className="list-group w-100">
                <li className="list-group-item text-center md:font-bold md:text-xl h-[7rem]">
                  <p className='my-4 w-100'>{e.horario}</p>
                </li>
              </ul>
              <ul className="list-group w-100">
                <li className="list-group-item text-center md:font-bold md:text-xl h-[7rem]">
                  <button className='btn btn-danger w-100 rounded-50 text-center fw-bold my-1' onClick={() => { cancelarCita(e.fecha, e.horario) }}>
                    <FontAwesomeIcon className='fs-5 mx-2' icon={faTrash} />
                    <any className='max-md:hidden'>Cancelar</any>
                  </button>
                  <button className='btn btn-warning w-100 rounded-50 fw-bold my-1' onClick={() => { reagendarCita(e.fecha, e.horario) }}>
                    <FontAwesomeIcon className='fs-5 mx-2' icon={faCalendarMinus} />
                    <any className='max-md:hidden'>Reagendar</any>
                  </button>
                </li>
              </ul>
            </div>
          ))
          :
          <div className='text-center fw-bold fs-4 text-white'> <br /> Sin citas</div>
      }


</div>



      <div className='w-100 rounded px-2 py-2 text-xs'>
        <h1 className='text-center w-100 bg-white rounded p-2 mt-5 text-[#800040]'>Mis citas con el dentista </h1>
        <div className=" text-center mb-2 w-100 my-4">
          <div className="row align-items-start ">
            <div className="col max-md:p-0 ">
              <ul className="list-group w-100 ">
                <li className="list-group-item text-center md:font-bold md:text-xl bg-white text-[#800040]">Fecha</li>
              </ul>
            </div>
            <div className="col max-md:p-0">
              <ul className="list-group w-100">
                <li className="list-group-item text-center md:font-bold md:text-xl bg-white text-[#800040]">Horario</li>
              </ul>
            </div>
            <div className="col max-md:p-0">
              <ul className="list-group w-100">
                <li className="list-group-item text-center md:font-bold md:text-xl bg-white text-[#800040]">Comentario</li>
              </ul>
            </div>
          </div>
        </div>
        {
          seguimiento.length !== 0 ?
            seguimiento.map(e => (
              <div key={e._id} className="row align-items-start my-2">
                <div className="col max-md:p-0">
                  <ul className="list-group w-100 ">
                    <li className="list-group-item text-center content-center md:font-bold md:text-xl bg-white text-[#800040] h-[6rem]">{e.fechaCita}</li>
                  </ul>
                </div>
                <div className="col max-md:p-0">
                  <ul className="list-group w-100">
                    <li className="list-group-item text-center content-center md:font-bold md:text-xl bg-white text-[#800040] h-[6rem]">{e.horarioCita}</li>
                  </ul>
                </div>
                <div className="col max-md:p-0">
                  <ul className="list-group w-100">
                    <li className="list-group-item text-center md:font-bold   bg-white text-[#800040] h-[6rem]">{e.comentario}</li>
                  </ul>
                </div>

              </div>
            ))
            :
            <div className='text-center text-white fw-bold fs-4'>Sin citas</div>
        }
      </div>


    </div>
  )
}

export default misCitasDentista
