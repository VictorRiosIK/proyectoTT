import React, { useState, useReducer, useEffect } from "react";
import { useAuth } from '../context/AuthContext.jsx'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import { getHorariosRequest, agendarCitaRequest, reagendarCitaRequest } from '../api/citas.js'
import { useNavigate } from 'react-router-dom'
import image from '../assets/denti.png'
import { useParams } from 'react-router-dom';

function agendarOdontologo() {
  const navigate = useNavigate();
  const params = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [touched, setTouched] = useState(false);
  const [horarioSelect, sethorarioSelect] = useState(null);
  const [opcionesS, setOpciones] = useState([]);
  const user = JSON.parse(window.localStorage.getItem('user'));
  const { horariosSelect: horarioS } = useAuth();
  const [Titulo, setTitulo] = useState('Agendar cita con dentista');
  const [errors, setErrors] = useState([]);
  let fechaR = '';
  let horarioR = '';

  const isWeekday = (date) => {
    //console.log(date)
    const dates = new Date(date);
    const day = dates.getDay()
    //const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  //console.log(user.email); getHorariosCitas,

  //console.log(user);
  let selectedH = '';
  let opciones = [];


  const getCita = () => {
    if (params.fecha && params.horario) {
      //console.log(params);
      let fechaa = '';
      for (let l = 0; l < params.fecha.length; l++) {
        if (params.fecha[l] === ",") {
          fechaa += "/"
        } else {
          fechaa += params.fecha[l]
        }
      }
      fechaR = fechaa;
      horarioR = params.horario;
      //console.log(fechaR, horarioR);
      setTitulo('Reagendar cita con dentista');
    }
  }

  const handleChange = (selectedOption) => {
    selectedH = selectedOption
    console.log(selectedH)
  }

  //AgendarCitaRequest
  const agendarCitaReq = async (fecha, horario, correo, tipo) => {
    try {
      const res = await agendarCitaRequest(fecha, horario, correo, tipo);
      console.log(res);
      navigate('/citas-dentista');
    } catch (error) {
      console.log(error.response);
      setErrors([error.response.data.message])
    }
  }


  const AgendarCita = async () => {
    if (selectedH !== '') {
      if (params.fecha && params.horario) {
        //console.log(startDate.toLocaleString('en-GB').substring(0, 10), selectedH.value)
        //console.log(user.email);
        //console.log(fechaR, horarioR);
        const fecha = startDate.toLocaleString('en-GB').substring(0, 10);
        const horario = selectedH.value;
        const correo = user.email;
        await reagendarCita(fecha, horario, correo)

      } else {
        //console.log(startDate.toLocaleString('en-GB').substring(0, 10), selectedH.value)
        //console.log(user.email)
        const fecha = startDate.toLocaleString('en-GB').substring(0, 10);

        const horario = selectedH.value;
        const correo = user.email;
        await agendarCitaReq(fecha, horario, correo, 'Dentista');

      }

    }

  }

  const reagendarCita = async (fecha, horario, correo) => {
    try {
      getCita();
      if (fechaR) {
        //console.log(fecha, horario, correo, 'Psicologo', fechaR);
        const res = await reagendarCitaRequest(fecha, horario, correo, 'Dentista', fechaR);
        console.log(res);
        navigate('/citas-dentista')
      }
    } catch (error) {
      console.log(error);
    }
  }



  const getHorariosCitas = async (fecha) => {
    try {
      const res = await getHorariosRequest(fecha, 'Dentista');
      console.log(res);
      const horarios = [];
      const aux = res.data.availableSlots;
      aux.map(e => {
        horarios.push(e.startTime + ' - ' + e.endTime);
      })
      //console.log(horarios);
      //opciones=horarios;
      horarios.map((e) => {
        if (e === '09:00 - 10:30') {
          opciones.push({ value: 1, label: e })
        }
        if (e === '10:30 - 12:00') {
          opciones.push({ value: 2, label: e })
        }
        if (e === '12:00 - 13:30') {
          opciones.push({ value: 3, label: e })
        }
        if (e === '13:30 - 15:00') {
          opciones.push({ value: 4, label: e })
        }
        if (e === '15:00 - 16:30') {
          opciones.push({ value: 5, label: e })
        }
        if (e === '16:30 - 18:00') {
          opciones.push({ value: 6, label: e })
        }

      });

      setOpciones(opciones);
      //console.log(opcionesS);
    } catch (error) {

    }
  }


  useEffect(() => {
    getCita();
  }, []);

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
    setOpciones([]);
    if (touched) {
      //console.log("Cambio la fecha", startDate.toLocaleString('en-GB').substring(0,10))
      getHorariosCitas(startDate.toLocaleString('en-GB').substring(0, 10));
      //console.log(horarioS);
      // opciones = [];
      // horarioS.map((e)=>{
      //   if(e === '09:00 - 10:30'){
      //     opciones.push({value:1, label:e})
      //   }
      //   if(e === '10:30 - 12:00'){
      //     opciones.push({value:2, label:e})
      //   }
      //   if(e === '12:00 - 13:30'){
      //     opciones.push({value:3, label:e})
      //   }
      //   if(e === '13:30 - 15:00'){
      //     opciones.push({value:4, label:e})
      //   }
      //   if(e === '15:00 - 16:30'){
      //     opciones.push({value:5, label:e})
      //   }
      //   if(e === '16:30 - 18:00'){
      //     opciones.push({value:6, label:e})
      //   }

      // });

      // setOpciones(opciones);
      //console.log(opcionesS);

      // setHorarios(opciones.map(e => {
      //   return (
      //     <option key={e} value={e}>{e}</option>
      //   )
      // }))

    }
  }, [startDate])

  return (
    <div>
      <div className=" text-center">
        <div className="row align-items-start m-1 bg-[#800040] rounded">
          <div className="col self-center h-[30rem] w-[100%] content-center  rounded m-0 ">
            <div className="bg-white rounded w-100 h-[90%] content-center">
              <h1 className='mb-4 mx-2 text-[#800040] '>{Titulo}</h1>
              <img src={image} alt="" className='max-w-[300px] min-w-[100px] w-100' />
              {/* <p className='mt-4 mb-0 fs-4 text-sky-700'>¿No tienes cuenta?</p> */}
            </div>
          </div>
          <div className="col self-center h-[30rem] w-[100%] content-center  rounded m-0 ">
            <div className="d-flex justify-content-center align-items-center">
              <div className="bg-white p-3 rounded w-100">
                {
                  errors.map((error, i) => (
                    <div className='bg-danger text-white p-2 rounded' key={i}>
                      {error}
                    </div>

                  ))
                }
                <h2 className="text-center fw-bold mb-4 "></h2>
                <div className="mb-3 text-center w-100">
                  <label className="text-center w-100 fw-bold fs-4 text-[#800040]" htmlFor="day">
                    Selecciona el día:
                  </label>
                </div>
                <div className="mb-3 text-center w-100 ">
                  <FontAwesomeIcon className='fs-1 mx-2 text-[#800040]' icon={faCalendarDays} />
                  <DatePicker className="p-3 fs-4 rounded" dateFormat="dd/MM/yyyy" filterDate={isWeekday} minDate={new Date()} selected={startDate} onChange={(date) => {
                    setStartDate(date)
                    setTouched(true);
                  }} />
                </div>
                <div className="mb-3 text-center w-100 ">
                  <label className="text-center w-100 fw-bold fs-4 text-[#800040]" htmlFor="day">
                    Selecciona el horario:
                  </label>
                </div>
                <div className="d-flex justify-content-center align-items-center mb-3 text-center w-100 ">
                  <FontAwesomeIcon className='fs-1 mx-2 text-[#800040]' icon={faClock} />
                  <Select className="p-2  fs-4 rounded w-75 " placeholder="HH:MM - HH:MM" options={opcionesS} onChange={handleChange}></Select>

                  {/* <select className="p-3 fs-4 rounded w-50 " defaultValue={null} > 
              {
                opciones.length === 0 ?
                <option disabled value={null}>Sin horarios</option> : <option></option>
              }
            </select> */}
                </div>
                <div className="mt-4 mb-2 text-center w-100 ">
                  <button onClick={AgendarCita} className="btn btn-outline-dark w-100 rounded-50 fw-bold fs-5">
                    Agendar
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default agendarOdontologo
