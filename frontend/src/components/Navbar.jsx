import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


function Navbar() {
    const {isAuthenticated, logout,user} = useAuth();
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
            <Link to={'/'}>
                <h1 className=" text-black  p-1">Servicios Estudiantiles</h1>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="d-flex" id="navbarNavAltMarkup">
                <div className="navbar-nav gap-4">
                    <Link className='text-black' to={'/login'}>Ingresar</Link>
                    <Link className='text-black' to={'/register'}>Registrar</Link>
                </div>
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
