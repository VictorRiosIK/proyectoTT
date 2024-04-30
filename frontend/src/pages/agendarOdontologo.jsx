import React, { useState, useReducer, useEffect } from "react";
import {useAuth} from '../context/AuthContext.jsx'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import {getHorariosRequest,agendarCitaRequest} from '../api/citas.js'
import { useNavigate } from 'react-router-dom'

function agendarOdontologo() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [touched, setTouched] = useState(false);
  const [horarioSelect, sethorarioSelect ] = useState(null);
  const [opcionesS, setOpciones ] = useState([]);
  const user = JSON.parse(window.localStorage.getItem('user'));
  const { horariosSelect: horarioS,agendarCitaDentista} = useAuth();
  //console.log(user.email); getHorariosCitas,
  
  //console.log(user);
  let selectedH = '';
  let opciones = [];
  
  const handleChange = (selectedOption) => {
    selectedH = selectedOption
    console.log(selectedH)
  }
  const AgendarCita = () => {
    if(selectedH !== ''){
      console.log(startDate.toLocaleString('en-GB').substring(0,10),selectedH.value)
      console.log(user.email)
      const fecha = startDate.toLocaleString('en-GB').substring(0,10);
      
      const horario = selectedH.value;
      const correo = user.email;
      agendarCitaDentista(fecha, horario, correo,'Dentista');
      navigate('/citas-dentista')
    }
    
  }



  const getHorariosCitas = async(fecha) =>{
    try {
        const res = await getHorariosRequest(fecha,'Dentista');
        console.log(res.data.availableSlots);
        const horarios = [];
        const aux = res.data.availableSlots;
        aux.map(e=>{
            horarios.push(e.startTime+ ' - ' + e.endTime);
        })
        //console.log(horarios);
        //opciones=horarios;
        horarios.map((e)=>{
          if(e === '09:00 - 10:30'){
            opciones.push({value:1, label:e})
          }
          if(e === '10:30 - 12:00'){
            opciones.push({value:2, label:e})
          }
          if(e === '12:00 - 13:30'){
            opciones.push({value:3, label:e})
          }
          if(e === '13:30 - 15:00'){
            opciones.push({value:4, label:e})
          }
          if(e === '15:00 - 16:30'){
            opciones.push({value:5, label:e})
          }
          if(e === '16:30 - 18:00'){
            opciones.push({value:6, label:e})
          }
         
        });
  
        setOpciones(opciones);
        console.log(opcionesS);
    } catch (error) {
        
    }
}




  useEffect(() => {
    setOpciones([]);
    if (touched) {
      //console.log("Cambio la fecha", startDate.toLocaleString('en-GB').substring(0,10))
      getHorariosCitas(startDate.toLocaleString('en-GB').substring(0,10));
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-primary p-3 rounded w-50">
          <h2 className="text-center fw-bold mb-4 text-white">Agendar cita con dentista</h2>
          <div className="mb-3 text-center w-100">
            <label className="text-center w-100 fw-bold fs-4" htmlFor="day">
              Selecciona el día:
            </label>
          </div>
          <div className="mb-3 text-center w-100 ">
            <FontAwesomeIcon className='fs-1 mx-2 text-white' icon={faCalendarDays} />
            <DatePicker className="p-3 fs-4 rounded  " selected={startDate} onChange={(date) => {
              setStartDate(date)
              setTouched(true);
            }} />
          </div>
          <div className="mb-3 text-center w-100 ">
            <label className="text-center w-100 fw-bold fs-4" htmlFor="day">
              Selecciona el horario:
            </label>
          </div>
          <div className="d-flex justify-content-center align-items-center mb-3 text-center w-100 ">
            <FontAwesomeIcon className='fs-1 mx-2 text-white' icon={faClock} />
            <Select className="p-2  fs-4 rounded w-75 " placeholder="HH:MM - HH:MM" options={opcionesS} onChange={handleChange}></Select>

            {/* <select className="p-3 fs-4 rounded w-50 " defaultValue={null} > 
              {
                opciones.length === 0 ?
                <option disabled value={null}>Sin horarios</option> : <option></option>
              }
            </select> */}
          </div>
          <div className="mt-4 mb-2 text-center w-100 ">
            <button onClick={AgendarCita} className="btn btn-outline-light w-100 rounded-50">
              Agendar
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default agendarOdontologo
