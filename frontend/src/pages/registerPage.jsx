import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext.jsx'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage(){
    const {register, handleSubmit, formState:{
        errors
    }} = useForm();
    const {signup, isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate();
    
    
    useEffect(()=>{
        if(isAuthenticated){
            navigate("/tasks");
        }
    },[isAuthenticated])

    //EVENTO SUBMIT
    const onSubmit =  handleSubmit(async (values)=>{
        signup(values);
    });

    //PAGINA HTML
    return (
        <div className='grid grid-cols-6 container-md mt-[25vh]  '>
            <div className='col-start-2 col-span-4 bg-zinc-800 p-10 rounded-md gap-4'>
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
                        <p className='text-red-500'>Username is required</p>
                    )
                }
            <input type="email" placeholder='Correo'
                {...register("email",{required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
                {
                    errors.email && (
                        <p className='text-red-500'>Email is required</p>
                    )
                }
            <input type="password" placeholder='Contraseña'
                {...register("password",{required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
                {
                    errors.password && (
                        <p className='text-red-500'>Password is required</p>
                    )
                }
            <button type='submit' className='bg-zinc-600 w-full rounded-md my-4 py-2'>
                Register
            </button>

            </form>
            </div>
            
        </div>
    )
}

export default RegisterPage