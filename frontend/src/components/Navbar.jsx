import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function Navbar() {
    const {isAuthenticated, logout} = useAuth();
    const user = JSON.parse(window.localStorage.getItem('user'));
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
            <Link className='text-decoration-none' to={'/'}>
                <h1 className=" text-black p-1">Servicios Estudiantiles</h1>
            </Link>
            <div className="d-flex" >
                {
                    isAuthenticated && user.rol === 'Alumno' ? //Si esta autenticado y tiene rol de alumno
                    (
                        <div className="navbar-nav gap-4">
                            <Link className='p-2 btn btn-outline-light ' to={'/citas-psicologo'}>Psicologo</Link>
                            <Link className='p-2 btn btn-outline-light ' to={'/citas-dentista'}>Dentista</Link>
                            <Link className='p-2 btn btn-outline-light ' to={'/recordatorio'}>Recordatorio</Link>
                            {/* <Link className='p-2 btn btn-outline-light ' onClick={()=>{console.log(user);}}>Perfil</Link> */}
                            <Link className='p-2 btn btn-light disabled'>{user.rol}</Link>
                            <Link className='p-2 btn btn-outline-light ' to={'/login'} onClick={()=> {
                            logout();
                            }}>Cerrar sesión</Link>
                        </div>
                    )
                    : isAuthenticated && user.rol === 'Psicologo' ? 
                    (
                        <div className="navbar-nav gap-4">
                            <Link className='p-2 btn btn-outline-light' to={'/login'}>Citas pendientes</Link>
                            
                            <Link className='p-2 btn btn-light disabled '>{user.rol}</Link>
                            <Link className='p-2 btn btn-outline-light ' to={'/login'} onClick={()=> {
                            logout();
                            }}>Cerrar sesión</Link>
                        </div>

                        
                    )
                    : isAuthenticated && user.rol === 'Dentista' ? 
                    (
                        <div className="navbar-nav gap-4">
                            <Link className='p-2 btn btn-outline-light' to={'/login'}>Citas pendientes</Link>
                            
                            <Link className='p-2 btn btn-light disabled '>{user.rol}</Link>
                            <Link className='p-2 btn btn-outline-light ' to={'/login'} onClick={()=> {
                            logout();
                            }}>Cerrar sesión</Link>
                        </div>

                        
                    ): isAuthenticated && user.rol === 'Admin' ? 
                    (
                        <div className="navbar-nav gap-4">
                            
                            <Link className='p-2 btn btn-outline-light' to={'/register'}>Registrar profesional</Link>
                            <Link className='p-2 btn btn-light disabled '>{user.rol}</Link>
                            <Link className='p-2 btn btn-outline-light ' to={'/login'} onClick={()=> {
                            logout();
                            }}>Cerrar sesión</Link>
                        </div>

                        
                    )
                    :
                    (
                        <div className="navbar-nav gap-4">
                            <Link className='p-2 btn btn-outline-light' to={'/login'}>Ingresar</Link>
                            <Link className='p-2 btn btn-outline-light' to={'/register'}>Registrar</Link>
                        </div>
                    )
                }

                
            </div>
        </div>
    </nav>
  )
}

export default Navbar
