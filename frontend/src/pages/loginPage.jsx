import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect } from 'react';

function LoginPage(){

    const {register, 
        handleSubmit,
        formState:{errors}
    } = useForm();
    const {signin, errors: signinErrors, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(data =>{
        signin(data).then(val =>{
            console.log(val)
            if(val){
                //Ir a la pagina de las tareas
                //navigate('/tasks/new');
            }
        } );
        // if(login){
        //     console.log("RESPUESTA",login)
        // }
        
        
    });

    //Si esta autenticado cambia de pagina
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/tasks');
        }
        
    }, [isAuthenticated])

    const verCookies = ()=>{
        const cookies = Cookies.get();
        console.log(cookies);
    }
    return (
        <div className='grid grid-cols-7 w-full container-md mt-[25vh]  '>
            <div className='col-start-3 col-span-3 bg-zinc-800 p-10 rounded-md gap-4'>
                <h1>Ingresar</h1>
                {
                    
                    signinErrors.map((error, i) =>(
                        <div className='bg-red-500 text-white' key={i}>
                            {error}
                        </div>
                        
                    ))
                }
                <form 
                    onSubmit={onSubmit}>
                <input type="email" placeholder='Correo'
                    {...register("email",{required: true})} 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
                    {
                        errors.email && (
                            <p className='text-red-500'>Correo requerido</p>
                        )
                    }
                <input type="password" placeholder='Contraseña'
                    {...register("password",{required: true})} 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
                    {
                        errors.password && (
                            <p className='text-red-500'>Contraseña requerida</p>
                        )
                    }
                <button type='submit' className='bg-zinc-600 w-full rounded-md my-4 py-2'>
                    Ingresar
                </button>

                </form>
                <p className='flex gap-2 bg-zinc-900 rounded-md p-2'>
                    ¿Aún no te has registrado?
                    <Link to="/register" className="text-sky-600">Registrarse</Link>
                </p>
                {/* <button onClick={verCookies} className='bg-zinc-600 w-full rounded-md my-4 py-2'>
                    VERCOOKIES
                </button> */}
            </div>
        </div>
    )
}

export default LoginPage