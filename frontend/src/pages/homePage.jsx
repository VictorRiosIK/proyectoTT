//Importar componente de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faEnvelope, faStaffSnake,faComments,faTooth } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function homePage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="flex justify-center font-bold pb-2">Servicios Estudiantiles de ESCOM</h1>
      <p className="py-4">Su objetivo es proporcionar a la comunidad estudiantil, los servicios complementarios de Servicio Médico, Servicio Odontológico, Orientación Educativa, Biblioteca, Cultura y Deporte; basándose en las herramientas tecnológicas de la información y comunicación, a través de los ejes fundamentales, que promuevan autoconocimiento, desarrollo integral, trayectoria y permanencia escolar.</p>
      <hr className="flex align-middle justify-center my-4 h-2 border-transparent bg-[--GUINDA-PRIMARIO] rounded-md"/>

      <div className='grid md:grid-cols-6 sm:grid-cols-4  gap-6'>

          <div className='md:col-span-2 sm:col-span-4 self-center '>
            <div className='bg-[--GUINDA-PRIMARIO] w-full rounded-lg py-2 ' >
              <h2 className="flex justify-center text-xl font-bold ">Orientación Educativa</h2>
              <div className='flex justify-center'>
                <FontAwesomeIcon className=' text-9xl' icon={faComments} />
              </div>
            </div>
            <button onClick={()=> navigate('/tasks')}
             className='w-full flex self-center justify-center bg-[--GUINDA-PRIMARIO] hover:bg-[--GUINDA-SECUNDARIO] rounded-md my-2 p-2'>
              Agendar cita
            </button>
          </div>
          <div className='md:col-span-4 sm:col-span-4 mb-4'>
            <p>Tiene el propósito de crear y fomentar en el estudiante politécnico una cultura de salud mental para contribuir a la generación de conocimientos, conductas y actitudes de responsabilidad y autocuidado que se proyecten en una mejor calidad de vida y apoyar a la comunidad estudiantil en su desempeño académico, desarrollo humano e integración social.
            Si requieres orientación acerca de problemas de índole: personal, de pareja, autoestima, familiar, rendimiento escolar, o si decides resolver dudas acerca de: adicciones, sexualidad, relaciones humanas, hábitos de estudio.
            El Servicio de Orientación Juvenil te atenderá de manera GRATUITA y totalmente CONFIDENCIAL.</p>
          </div>

          <hr className="md:col-span-6 sm:col-span-4 flex align-middle justify-center my-4 h-2 border-transparent bg-[--GUINDA-PRIMARIO] rounded-md"/>

          <div className='md:col-span-4 sm:col-span-4'>
          <p>El Servicio Odontológico trabaja con el compromiso de fomentar y preservar tu salud bucal, a través de servicios con cuotas de recuperación asequibles. Se ubica en la planta baja del Edificio de Gobierno, a un costado de Gestión Escolar.</p>
          </div>

          
          
          <div className='md:col-span-2 sm:col-span-4 mb-4 self-center'>
            <div className='bg-[--GUINDA-PRIMARIO] rounded-lg py-2'>
              <h2 className="flex justify-center text-xl font-bold">Odontología</h2>
              <div className='flex justify-center'>
                <FontAwesomeIcon className=' text-9xl' icon={faTooth} /> 
              </div>
            </div>
            <button onClick={()=> navigate('/tasks')}
             className='w-full flex self-center justify-center bg-[--GUINDA-PRIMARIO] hover:bg-[--GUINDA-SECUNDARIO] rounded-md my-2 p-2'>
              Agendar cita
            </button>
          </div>
          <hr className="md:col-span-6 sm:col-span-4 flex align-middle justify-center my-4 h-2 border-transparent bg-[--GUINDA-PRIMARIO] rounded-md"/>
          
          <div className='md:col-span-2 sm:col-span-4 self-center'>
          <div className='bg-[--GUINDA-PRIMARIO] rounded-lg py-2'>
            <h2 className="flex justify-center text-xl font-bold">Área de Servicio Médico</h2>
              <div className='flex justify-center'>
                <FontAwesomeIcon className=' text-9xl' icon={faStaffSnake} /> 
              </div>
            </div>
          </div>
          
          <div className='md:col-span-4 sm:col-span-4 mb-4'>
            <p>El área médica se ubica en la planta baja del Edificio de Gobierno, a un costado de Gestión Escolar. Brinda atención de primer contacto, es decir, una primera consulta en caso de sentir alguna molestia o síntoma que pueda estar relacionada con alguna enfermedad. En caso de requerir atención de los servicios de medicina del deporte, rehabilitación o nutrición, se puede acudir a la Unidad de Servicios Integrales de Salud Escolar Zacatenco.
              Para atención especializada (cirugía general, ginecología y urgencias) hacer válido el seguro facultativo (IMSS).</p>
          </div>
        </div>
      
      
     

      
     

      
      
    </div>
  )
}

export default homePage
