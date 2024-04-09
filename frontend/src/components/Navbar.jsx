import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function Navbar() {
    const {isAuthenticated, logout,user} = useAuth();
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10">
        <Link to={'/'}>
            <h1 className="text-2xl font-bold">Task Manager</h1>
        </Link>
        <ul className="flex gap-x-2">
            {
                isAuthenticated ? //SI ESTA AUTENTICADO MUESTRA LOS ELEMENTOS EN EL NAVBAR
                ( <>
                    <li>
                        Bienvenido {user.username}
                    </li>
                    <li>
                        <Link to={'/tasks'}>Ver tareas</Link>
                    </li>
                    <li>
                        <Link to={'/tasks/new'}>Nueva tarea</Link>
                    </li>
                    <li>
                        <Link to={'/'} onClick={()=> {logout();}}>Cerrar sesión</Link>
                    </li>
                   </>)
                :
                (
               <>
                <li>
                    <Link to={'/login'}>Ingresar</Link>
                </li>
                <li>
                    <Link to={'/register'}>Registrar</Link>
                </li>
               </>
                )
            }
            
        </ul>
    </nav>
  )
}

export default Navbar
