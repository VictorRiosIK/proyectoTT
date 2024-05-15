//Importar componente de iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faStaffSnake, faComments, faTooth, faCalendarCheck, faPhone } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import escom from '../assets/EscudoESCOM.png'
import logo from '../assets/logo.png'


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
          <div className=" text-white text-center content-center fw-bold  w-100 h-[15rem] opacity-100 text-6xl m-0 ">

            <div className="text-center w-100 ">
              <div className="row p-0">

                <div className="col  rounded-top " >
                  <img src={logo} alt="" className='max-w-[200px] min-w-[50px] w-100 rounded-3xl' />
                </div>
                <div className="col  rounded-top content-center  p-0" >
                  <p className=' text-3xl'>Proporcionando servicios y herramientas para el desarrollo de la ESCOMUNIDAD</p>
                </div>
                <div className="col content-center" >
                  <img src={escom} alt="" className='max-w-[300px] min-w-[50px] w-100 bg-white p-2 rounded-3xl' />
                </div>
              </div>
            </div>



          </div>
        </header>
      </div>
      <h2 className='bg-white rounded p-2 fs-1 fw-bold text-sky-700'>Información</h2>
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

          <div className="col bg-slate-300 rounded-top pt-4">
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
          <div className='col bg-sky-700  rounded-bottom pb-4'>
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
                className='btn btn-outline-light px-4 fs-5'>
                <FontAwesomeIcon className='mx-2' icon={faCalendarCheck} />
                Agendar cita
              </button>
            }
          </div>
          <div className='col bg-[#800040] rounded-bottom pb-4'>
            {
              (user.rol === 'Alumno' || user.rol === 'Undefined') &&
              <button onClick={() => {
                if (isAuthenticated) {
                  navigate('/agendar-dentista')
                } else {
                  navigate('/login')
                }

              }}
                className='btn btn-outline-light px-4 fs-5'>
                <FontAwesomeIcon className='mx-2' icon={faCalendarCheck} />
                Agendar cita
              </button>
            }
          </div>
          <div className='col bg-slate-300 rounded-bottom pb-4'></div>
        </div>

        <div className="row gap-4 my-2">
          <div className="col bg-sky-700 rounded pt-4 fs-5" >
            <div className='grid grid-cols-2  gap-2'>
              <div className='text-center text-white border  px-2 rounded'>
                <p className=''>- Lic. Paola Celeste Montes de Oca Gómez</p>
              </div>
              <div className='text-white border  px-2 rounded'>
                <p className='text-center'>- Lic. Estefania Castro Burgos</p>
              </div>
            </div>
            <div className='mt-2 text-white'>De Lunes a Viernes</div>
            <div className='grid md:grid-cols-2 gap-2'>
              <div className='text-center text-white '>
                <div className='my-2'>Mat. 8:00 - 15:00 hrs</div>
              </div>
              <div className='text-center text-white'>
                <div className='my-2'>Vesp. 15:00 - 21:00 hrs</div>
              </div>
            </div>
            <div className='text-white my-2 flex-col'>
              
              <FontAwesomeIcon className='text-4xl' icon={faPhone} />
              <div>Tel: 55-57-29-60-00 Ext. 52080</div>
              <div>orientacion_educativa_escom@ipn.mx</div>
            </div>
          </div>


          <div className="col bg-[#800040] rounded pt-4 fs-5" >

            <div className='grid grid-cols-2 gap-2'>
              <div className='text-white border px-2 rounded'>
                <p className='text-center'>- C. D. Rocío Gómez Ruíz</p>
              </div>
              <div className='text-white border px-2 rounded'>
                <p className='text-center'>- C. D. Gabriela Sanabria Paredes</p>
              </div>
            </div>
            <div className='mt-2 text-white'>De Lunes a Viernes</div>
            <div className='grid grid-cols-2 gap-2'>
              <div className='text-white'>
                <div className='text-center my-2'>Mat. 8:00 - 15:00 hrs</div>
              </div>
              <div className='text-white'>
                <div className='text-center my-2'>Vesp. 15:00 - 21:00 hrs</div>
              </div>
            </div>
            <div className='text-white my-2 flex-col'>
              <FontAwesomeIcon className='text-4xl' icon={faPhone} />
              <div>Tel: xx-xx-xx-xx-xx Ext. xxxxx</div>
              <div>xxx@xxx</div>
            </div>
          </div>


          <div className="col bg-slate-300 rounded pt-4 text-[#800040] fs-5" >
            <div className='grid grid-cols-2 gap-2'>
              <div className='text-[#800040] border px-2 rounded'>
                <p className=' text-center'>- Dra. Aideé Lizbeth Galván Zermeño</p>
                <p className=' text-center'>- Dr. Daniel Mauricio Temozihui Trejo</p>
              </div>
              <div className='text-[#800040] border px-2 rounded'>
                <p className=' text-center'>- Dr. Óscar Cortés Jiménez</p>
                <p className=' text-center'>- Dr. Cuauhtémoc García Hidalgo</p>
              </div>
            </div>
            <div className='mt-2 text-[#800040]'>De Lunes a Viernes</div>
            <div className='grid grid-cols-2 gap-2'>
              <div className=''>
                <div className='my-2 text-center'>Mat. 8:00 - 15:00 hrs</div>
              </div>
              <div className=''>
                <div className='my-2 text-center'>Vesp. 15:00 - 21:00 hrs</div>
              </div>
            </div>
            <div className=' my-2 flex-col'>
              <FontAwesomeIcon className='text-4xl' icon={faPhone} />
              <div>Tel: 57-29-60-00 Ext. 52014</div>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default homePage
