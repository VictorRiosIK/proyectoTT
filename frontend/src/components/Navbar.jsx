import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faHouse, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const user = JSON.parse(window.localStorage.getItem('user'));


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary font-serif">
                <div className="container-fluid">
                    <Link className='btn btn-outline-dark text-decoration-none  text-center' to={'/'}>
                        <FontAwesomeIcon className='d-flex  p-1 text-center fs-1' icon={faHouse} />
                    </Link>
                    <div className="d-flex" >
                        {
                            isAuthenticated && user.rol === 'Alumno' ? //Si esta autenticado y tiene rol de alumno
                                (
                                    <div className="navbar-nav gap-4">
                                        <Link className='p-2 btn btn-outline-dark ' to={'/citas-psicologo'}>Psicologo</Link>
                                        <Link className='p-2 btn btn-outline-dark ' to={'/citas-dentista'}>Dentista</Link>
                                        <Link className='p-2 btn btn-outline-dark ' to={'/recordatorio'}>Recordatorio</Link>
                                        {/* <Link className='p-2 btn btn-outline-light ' onClick={()=>{console.log(user);}}>Perfil</Link> */}
                                        <Link className='p-2 btn btn-dark disabled'>{user.rol}</Link>
                                        <Link className='p-2 btn btn-outline-dark ' to={'/login'} onClick={() => {
                                            logout();
                                        }}>Cerrar sesión</Link>
                                    </div>
                                )
                                : isAuthenticated && user.rol === 'Psicologo' ?
                                    (
                                        <div className="navbar-nav gap-4">
                                            <Link className='p-2 btn btn-outline-light' to={'/all-citas'}>Citas pendientes</Link>

                                            <Link className='p-2 btn btn-light disabled '>{user.rol}</Link>
                                            <Link className='p-2 btn btn-outline-light ' to={'/login'} onClick={() => {
                                                logout();
                                            }}>Cerrar sesión</Link>
                                        </div>


                                    )
                                    : isAuthenticated && user.rol === 'Dentista' ?
                                        (
                                            <div className="navbar-nav gap-4">
                                                <Link className='p-2 btn btn-outline-light' to={'/all-citas'}>Citas pendientes</Link>

                                                <Link className='p-2 btn btn-light disabled '>{user.rol}</Link>
                                                <Link className='p-2 btn btn-outline-light ' to={'/login'} onClick={() => {
                                                    logout();
                                                }}>Cerrar sesión</Link>
                                            </div>


                                        ) : isAuthenticated && user.rol === 'Admin' ?
                                            (
                                                <div className="navbar-nav gap-4">

                                                    <Link className='p-2 btn btn-outline-light' to={'/register-pro'}>Registrar profesional</Link>
                                                    <Link className='p-2 btn btn-light disabled '>{user.rol}</Link>
                                                    <Link className='p-2 btn btn-outline-light ' to={'/login'} onClick={() => {
                                                        logout();
                                                    }}>Cerrar sesión</Link>
                                                </div>


                                            )
                                            :
                                            (
                                                <div className="navbar-nav gap-4">
                                                    <Link className='flex p-2 btn btn-outline-light' to={'/login'}>
                                                    <FontAwesomeIcon className='flex  p-1 text-center' icon={faUser} />
                                                        Ingresar
                                                    </Link>
                                                    <Link className='flex p-2 btn btn-outline-light' to={'/register'}>
                                                    <FontAwesomeIcon className='flex  p-1 text-center' icon={faUserPlus} />
                                                        Registrar
                                                        </Link>
                                                </div>
                                            )
                        }
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Navbar
