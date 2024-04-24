import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function Navbar() {
    const {isAuthenticated, logout,user} = useAuth();
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
            <Link className='text-decoration-none' to={'/'}>
                <h1 className=" text-black p-1">Servicios Estudiantiles</h1>
            </Link>
            <div className="d-flex" >
                {
                    isAuthenticated ? //Si esta autenticado
                    (
                        <div className="navbar-nav gap-4">
                            <Link className='p-2 btn btn-outline-light ' to={'/'}>Agendar OE</Link>
                            <Link className='p-2 btn btn-outline-light ' to={'/'}>Agendar O</Link>
                            <Link className='p-2 btn btn-outline-light ' to={'/'}>Libros</Link>
                            <Link className='p-2 btn btn-outline-light ' to={'/profile'}>Perfil</Link>
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


    // <nav className="bg-[--GUINDA-PRIMARIO] my-3 flex justify-between py-5 px-10">
    //     <Link to={'/'}>
    //         <h1 className="text-2xl font-bold hover:bg-[--GUINDA-SECUNDARIO] rounded-md p-1">Servicios Estudiantiles</h1>
    //     </Link>
    //     <ul className="flex gap-x-2">
    //         {
    //             isAuthenticated ? //SI ESTA AUTENTICADO MUESTRA LOS ELEMENTOS EN EL NAVBAR
    //             ( <>
    //                 <li className='hover:bg-[--GUINDA-SECUNDARIO] rounded-md p-2'>
    //                     <Link to={'/tasks'}>Ver tareas</Link>
    //                 </li>
    //                 <li className='hover:bg-[--GUINDA-SECUNDARIO] rounded-md p-2'>
    //                     <Link to={'/tasks/new'}>Nueva tarea</Link>
    //                 </li>
    //                 <li className='p-2' >
    //                     Bienvenido {user.username}
    //                 </li>
    //                 <li  className='hover:bg-[--GUINDA-SECUNDARIO] rounded-md p-2'>
    //                     <Link to={'/login'} onClick={()=> {
    //                         logout();
                            
    //                         }}>Cerrar sesión</Link>
    //                 </li>
    //                </>)
    //             :
    //             (
    //            <>
    //             <li  className='hover:bg-[--GUINDA-SECUNDARIO] rounded-md p-2'>
    //                 <Link to={'/login'}>Ingresar</Link>
    //             </li>
    //             <li className='hover:bg-[--GUINDA-SECUNDARIO] rounded-md p-2'>
    //                 <Link to={'/register'}>Registrar</Link>
    //             </li>
    //            </>
    //             )
    //         }
            
    //     </ul>
    // </nav>
  )
}

export default Navbar
