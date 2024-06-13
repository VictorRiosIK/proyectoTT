import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faHouse, faUser, faUserPlus, faUserTie, faRightFromBracket, faAddressBook, faRectangleList } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const user = JSON.parse(window.localStorage.getItem('user'));


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary ">
                <div className="container-fluid">
                    <Link className='btn btn-outline-dark text-decoration-none  text-center' to={'/'}>
                        <FontAwesomeIcon className='d-flex  p-1 text-center fs-2' icon={faHouse} />
                    </Link>
                    <div className="d-flex" >
                        {
                            isAuthenticated && user.rol === 'Alumno' ? //Si esta autenticado y tiene rol de alumno
                                (
                                    <div className="navbar-nav gap-4">
                                        <Link className='flex p-2 btn btn-outline-dark ' to={'/citas-psicologo'}>
                                            <FontAwesomeIcon className='flex  p-1 text-center' icon={faRectangleList} />
                                            Psicologo
                                        </Link>
                                        <Link className='flex p-2 btn btn-outline-dark ' to={'/citas-dentista'}>
                                            <FontAwesomeIcon className='flex  p-1 text-center' icon={faRectangleList} />
                                            Dentista
                                        </Link>
                                        {/* <Link className='flex p-2 btn btn-outline-dark ' to={'/recordatorio'}>Recordatorio</Link> */}
                                        {/* <Link className='p-2 btn btn-outline-light ' onClick={()=>{console.log(user);}}>Perfil</Link> */}
                                        <Link className='flex p-2 btn btn-dark' to={'/cambiar-contrasena'}>{user.rol}</Link>
                                        <Link className='flex p-2 btn btn-outline-dark ' to={'/login'} onClick={() => {
                                            logout();
                                        }}>
                                            <FontAwesomeIcon className='flex  p-1 text-center' icon={faRightFromBracket} />
                                            Cerrar sesión
                                        </Link>
                                    </div>
                                )
                                : isAuthenticated && user.rol === 'Psicologo' ?
                                    (
                                        <div className="navbar-nav gap-4">
                                            <Link className='flex p-2 btn btn-outline-dark' to={'/all-citas'}>
                                                <FontAwesomeIcon className='flex  p-1 text-center' icon={faAddressBook} />
                                                Citas pendientes
                                            </Link>

                                            <Link className='flex p-2 btn btn-dark' to={'/cambiar-contrasena'}>{user.rol}</Link>
                                            <Link className='flex p-2 btn btn-outline-dark ' to={'/login'} onClick={() => {
                                                logout();
                                            }}>
                                                <FontAwesomeIcon className='flex  p-1 text-center' icon={faRightFromBracket} />
                                                Cerrar sesión
                                            </Link>
                                        </div>


                                    )
                                    : isAuthenticated && user.rol === 'Dentista' ?
                                        (
                                            <div className="navbar-nav gap-4">
                                                <Link className='flex p-2 btn btn-outline-dark' to={'/all-citas'}>
                                                    <FontAwesomeIcon className='flex  p-1 text-center' icon={faAddressBook} />
                                                    Citas pendientes
                                                </Link>

                                                <Link className='flex p-2 btn btn-dark' to={'/cambiar-contrasena'}>{user.rol}</Link>
                                                <Link className='flex p-2 btn btn-outline-dark ' to={'/login'} onClick={() => {
                                                    logout();
                                                }}>
                                                    <FontAwesomeIcon className='flex  p-1 text-center' icon={faRightFromBracket} />
                                                    Cerrar sesión
                                                </Link>
                                            </div>


                                        ) : isAuthenticated && user.rol === 'Admin' ?
                                            (
                                                <div className="navbar-nav gap-4">

                                                    <Link className='flex p-2 btn btn-outline-dark' to={'/register-pro'}>
                                                        <FontAwesomeIcon className='flex  p-1 text-center' icon={faUserTie} />
                                                        Registrar profesional
                                                    </Link>
                                                    <Link className='flex p-2 btn btn-dark' to={'/cambiar-contrasena'}>{user.rol}</Link>
                                                    <Link className='flex p-2 btn btn-outline-dark ' to={'/login'} onClick={() => {
                                                        logout();
                                                    }}>
                                                        <FontAwesomeIcon className='flex  p-1 text-center' icon={faRightFromBracket} />
                                                        Cerrar sesión
                                                    </Link>
                                                </div>


                                            )
                                            :
                                            (
                                                <div className="navbar-nav gap-4">
                                                    <Link className='flex p-2 btn btn-outline-dark' to={'/login'}>
                                                        <FontAwesomeIcon className='flex  p-1 text-center' icon={faUser} />
                                                        Ingresar
                                                    </Link>
                                                    <Link className='flex p-2 btn btn-outline-dark' to={'/register'}>
                                                        <FontAwesomeIcon className='flex  p-1 text-center' icon={faUserPlus} />
                                                        Registrar
                                                    </Link>
                                                </div>
                                            )
                        }
                    </div>
                </div>
            </nav>
            <hr className=' border-1 m-0 p-0  mb-3 opacity-100' style={{border: '10px solid #005F7A'}}></hr>
        </div>
        

    )
}

export default Navbar
