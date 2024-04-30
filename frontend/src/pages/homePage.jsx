//Importar componente de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faStaffSnake, faComments, faTooth } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function homePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const user = JSON.parse(window.localStorage.getItem('user')) ?? {rol:'Undefined'};
  
  return (
    <div >
      <h1 className="text-center">Servicios Estudiantiles de ESCOM</h1>
      <p className="">Su objetivo es proporcionar a la comunidad estudiantil, los servicios complementarios de Servicio Médico, Servicio Odontológico, Orientación Educativa, Biblioteca, Cultura y Deporte; basándose en las herramientas tecnológicas de la información y comunicación, a través de los ejes fundamentales, que promuevan autoconocimiento, desarrollo integral, trayectoria y permanencia escolar.</p>
      <hr className="" />
      <div className="container text-center">
        <div className="row gap-2">
          <div className="col bg-primary rounded-top " >
            <h2 className="text-white">Orientación Educativa</h2>
            <div className='text-white mb-4'>
              <FontAwesomeIcon className='fs-1' icon={faComments} />
            </div>
            <div>
              <p className=''>Tiene el propósito de crear y fomentar en el estudiante politécnico una cultura de salud mental para contribuir a la generación de conocimientos, conductas y actitudes de responsabilidad y autocuidado que se proyecten en una mejor calidad de vida y apoyar a la comunidad estudiantil en su desempeño académico, desarrollo humano e integración social.
                Si requieres orientación acerca de problemas de índole: personal, de pareja, autoestima, familiar, rendimiento escolar, o si decides resolver dudas acerca de: adicciones, sexualidad, relaciones humanas, hábitos de estudio.
                El Servicio de Orientación Juvenil te atenderá de manera GRATUITA y totalmente CONFIDENCIAL.</p>
            </div>

          </div>



          <div className="col bg-primary rounded-top ">
            <h2 className="text-white">Odontología</h2>
            <div className='text-white mb-4'>
              <FontAwesomeIcon className='fs-1' icon={faTooth} />
            </div>
            <div className=''>
              <p>El Servicio Odontológico trabaja con el compromiso de fomentar y preservar tu salud bucal, a través de servicios con cuotas de recuperación asequibles. Se ubica en la planta baja del Edificio de Gobierno, a un costado de Gestión Escolar.</p>
            </div>


          </div>



          <div className="col bg-primary rounded-top ">
            <h2 className="text-white">Área de Servicio Médico</h2>
            <div className='text-white mb-4'>
              <FontAwesomeIcon className='fs-1' icon={faStaffSnake} />
            </div>
            <div className=''>
              <p>El área médica se ubica en la planta baja del Edificio de Gobierno, a un costado de Gestión Escolar. Brinda atención de primer contacto, es decir, una primera consulta en caso de sentir alguna molestia o síntoma que pueda estar relacionada con alguna enfermedad. En caso de requerir atención de los servicios de medicina del deporte, rehabilitación o nutrición, se puede acudir a la Unidad de Servicios Integrales de Salud Escolar Zacatenco.
                Para atención especializada (cirugía general, ginecología y urgencias) hacer válido el seguro facultativo (IMSS).</p>
            </div>


          </div>
        </div>
        <div className='row gap-2'>
          <div className='col bg-primary rounded-bottom pb-2'>
            {
              user.rol === 'Alumno' || user.rol === 'Undefined' &&
              <button onClick={() => {
                if (isAuthenticated) {
                  navigate('/agendar-psicologo')
                } else {
                  navigate('/login')
                }

              }}
                className='btn btn-outline-light'>
                Agendar cita
              </button>
            }
          </div>
          <div className='col bg-primary rounded-bottom pb-2'>
            {
              user.rol === 'Alumno' || user.rol === 'Undefined' &&
              <button onClick={() => {
                if (isAuthenticated) {
                  navigate('/agendar-dentista')
                } else {
                  navigate('/login')
                }

              }}
                className='btn btn-outline-light'>
                Agendar cita
              </button>
            }
          </div>
          <div className='col bg-primary rounded-bottom pb-2'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default homePage
