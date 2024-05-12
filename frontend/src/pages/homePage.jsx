//Importar componente de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faStaffSnake, faComments, faTooth, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import portada from '../assets/portada.jpg'

function homePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const user = JSON.parse(window.localStorage.getItem('user')) ?? { rol: 'Undefined' };
  
  return (
    <div className='abel-regular' >
      {/* <h1 className="text-center">Servicios Estudiantiles de ESCOM</h1> */}

      <div className='mb-5 bg-white p-2 rounded'>
        <header className='header align-middle rounded'>
          {/* <p className="text-white opacity-100 p-5 fs-3">Su objetivo es proporcionar a la comunidad estudiantil, los servicios complementarios de Servicio Médico, Servicio Odontológico, Orientación Educativa, Biblioteca, Cultura y Deporte; basándose en las herramientas tecnológicas de la información y comunicación, a través de los ejes fundamentales, que promuevan autoconocimiento, desarrollo integral, trayectoria y permanencia escolar.</p> */}
          <div className="text-white text-center content-center fw-bold  w-100 h-[15rem] opacity-100 text-6xl m-0">
            Servicios Estudiantiles de la ESCOM
            <p className='m-4 text-3xl'>Proporcionando servicios y herramientas para el desarrollo de la ESCOMUNIDAD</p>
          </div>
        </header>
      </div>

      <div className="text-center w-100 bg-white p-4 rounded ">
        <div className="row gap-4">
          <div className="col bg-sky-700 rounded-top pt-4" >
            <h2 className="text-white fw-bold text-4xl">Orientación Educativa</h2>
            <div className='text-white mb-4 '>
              <FontAwesomeIcon className='text-4xl' icon={faComments} />
            </div>
            <div>
              <p className='text-white text-2xl'>Fomenta en el estudiante una cultura de salud mental y asi proyecten en una mejor calidad de vida, apoyando en su desempeño académico, desarrollo humano e integración social.
                El Servicio se da de manera GRATUITA y totalmente CONFIDENCIAL.</p>
            </div>

          </div>



          <div className="col bg-[#800040] rounded-top pt-4">
            <h2 className="text-white fw-bold text-4xl">Odontología</h2>
            <div className='text-white mb-4'>
              <FontAwesomeIcon className='fs-1' icon={faTooth} />
            </div>
            <div className='text-white text-2xl '>
              <p>El Servicio Odontológico trabaja con el compromiso de fomentar y preservar tu salud bucal, a través de servicios con cuotas de recuperación asequibles. Se ubica en la planta baja del Edificio de Gobierno, a un costado de Gestión Escolar.</p>
            </div>

          </div>

          <div className="col bg-slate-100 rounded-top pt-4">
            <h2 className="text-[#800040] fw-bold text-4xl">Área de Servicio Médico</h2>
            <div className='text-[#800040] mb-4'>
              <FontAwesomeIcon className='fs-1' icon={faStaffSnake} />
            </div>
            <div className='text-2xl text-[#800040]'>
              <p>Ubicada en la planta baja del Edificio de Gobierno, a un costado de Gestión Escolar. Brinda atención en caso de sentir alguna molestia o síntoma que pueda estar relacionada con alguna enfermedad.
              </p>
            </div>


          </div>
        </div>
        <div className='row gap-4'>
          <div className='col bg-sky-700  rounded-bottom pb-2'>
            {
              (user.rol === 'Alumno' || user.rol === 'Undefined') &&
              <button onClick={() => {
                if (isAuthenticated) {
                  if (user.evaluacionP === 0) {
                    navigate('/cuestionario')
                  } else {
                    navigate('/agendar-psicologo')
                  }
                } else {
                  navigate('/login')
                }
              }}
                className='btn btn-outline-light'>
                <FontAwesomeIcon className='mx-2' icon={faCalendarCheck} />
                Agendar cita
              </button>
            }
          </div>
          <div className='col bg-[#800040] rounded-bottom pb-2'>
            {
              (user.rol === 'Alumno' || user.rol === 'Undefined') &&
              <button onClick={() => {
                if (isAuthenticated) {
                  navigate('/agendar-dentista')
                } else {
                  navigate('/login')
                }

              }}
                className='btn btn-outline-light '>
                <FontAwesomeIcon className='mx-2' icon={faCalendarCheck} />
                Agendar cita
              </button>
            }
          </div>
          <div className='col bg-slate-100 rounded-bottom pb-2'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default homePage
