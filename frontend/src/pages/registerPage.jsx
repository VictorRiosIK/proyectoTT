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
            navigate("/");
        }
    },[isAuthenticated])

    //EVENTO SUBMIT
    const onSubmit =  handleSubmit(async (values)=>{
        signup(values);
    });

    //PAGINA HTML
    return (
        <div className='grid md:grid-cols-7 sm:grid-cols-3 w-full container-md   '>
            <div className='md:col-start-3 col-span-3 bg-[--GUINDA-PRIMARIO] p-10 rounded-md gap-4'>
            <h1>Registrarse</h1>
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
                className='w-full bg-[--GUINDA-SECUNDARIO] text-white px-4 py-2 rounded-md my-2' />
                {
                    errors.username && (
                        <p className='text-red-500'>Usuario requerido</p>
                    )
                }
            <input type="email" placeholder='Correo'
                {...register("email",{required: true})} 
                className='w-full bg-[--GUINDA-SECUNDARIO] text-white px-4 py-2 rounded-md my-2'/>
                {
                    errors.email && (
                        <p className='text-red-500'>Email requerido</p>
                    )
                }
            <input type="password" placeholder='Contraseña'
                {...register("password",{required: true})} 
                className='w-full bg-[--GUINDA-SECUNDARIO] text-white px-4 py-2 rounded-md my-2'/>
                {
                    errors.password && (
                        <p className='text-red-500'>Contraseña requerida</p>
                    )
                }
            <button type='submit' className='bg-[--GUINDA-SECUNDARIO] w-full rounded-md my-4 py-2'>
                Registrar
            </button>

            </form>
            <p className='flex gap-2 bg-[--GUINDA-SECUNDARIO] rounded-md p-2'>
                    ¿Ya estas registrado?
                    <Link to="/login" className="text-sky-600">Ingresar</Link>
                </p>
            </div>
            
        </div>
    )
}

export default RegisterPage