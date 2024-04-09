import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage(){
    const {register, handleSubmit, formState:{
        errors
    }} = useForm();
    const {signup, isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate();
    
    
    useEffect(()=>{
        if(isAuthenticated){
            //REDIRECCIONA A LA URL
            navigate("/tasks");
        }
    },[isAuthenticated])

    //EVENTO SUBMIT
    const onSubmit =  handleSubmit(async (values)=>{
        signup(values);
    });

    //PAGINA HTML
    return (
        <div className='grid grid-cols-7 w-full container-md mt-[25vh]  '>
            <div className='col-start-3 col-span-3 bg-zinc-800 p-10 rounded-md gap-4'>
            <h1>Registrar usuario</h1>
            {
                
                registerErrors.map((error, i) =>(
                    <div className='bg-red-500 text-white' key={i}>
                        {error}
                    </div>
                    
                ))
            }
            <form 
                onSubmit={onSubmit}>
            <input type="text" placeholder='Usuario'
                {...register("username",{required:true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                {
                    errors.username && (
                        <p className='text-red-500'>Usuario requerido</p>
                    )
                }
            <input type="email" placeholder='Correo'
                {...register("email",{required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
                {
                    errors.email && (
                        <p className='text-red-500'>Email requerido</p>
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
                Registrar
            </button>

            </form>
            <p className='flex gap-2 bg-zinc-900 rounded-md p-2'>
                    ¿Ya estas registrado?
                    <Link to="/login" className="text-sky-600">Ingresar</Link>
                </p>
            </div>
            
        </div>
    )
}

export default RegisterPage