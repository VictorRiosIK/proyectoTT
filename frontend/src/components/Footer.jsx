import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//Importar el icono
import { faHouse, faUser, faUserPlus, faUserTie, faRightFromBracket, faAddressBook, faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../context/AuthContext'


function Footer() {
    const { isAuthenticated, logout } = useAuth();
    const user = JSON.parse(window.localStorage.getItem('user'));
    return (
        <footer className="w-100 text-center mt-5 bg-primary">
            <div className="flex justify-center pt-5 pb-2 ">
                <span className=" text-sm text-white sm:text-center ">© 2024 TT2024-A062. Todos los derechos reservados.
                </span>
            </div>
            {/* <div className="flex w-100 justify-end self-center text-center mb-4 ">
                <Link className='flex p-2 btn justify-center  btn-outline-dark w-25 mx-4' to={'/citas-psicologo'}>
                    <FontAwesomeIcon className='flex  p-1 text-center' icon={faRectangleList} />
                    Cambiar contraseña
                </Link>
            </div> */}
        </footer>
    )
}

export default Footer
