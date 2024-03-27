import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';



function LoginPage(){

    const {register, 
        handleSubmit,
        formState:{errors}
    } = useForm();
    const {signin, errors: signinErrors} = useAuth();

    const onSubmit = handleSubmit(data =>{
        signin(data);
    }) 



    return (
        <div className='container-md bg-zinc-800 max-w-md p-10 rounded-md gap-4'>
            <h1>Login Page</h1>
            {
                
                signinErrors.map((error, i) =>(
                    <div className='bg-red-500 text-white' key={i}>
                        {error}
                    </div>
                    
                ))
            }
            <form 
                onSubmit={onSubmit}>
            <input type="email" placeholder='email'
                {...register("email",{required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
                {
                    errors.email && (
                        <p className='text-red-500'>Email is required</p>
                    )
                }
            <input type="password" placeholder='password'
                {...register("password",{required: true})} 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
                {
                    errors.password && (
                        <p className='text-red-500'>Password is required</p>
                    )
                }
            <button type='submit' className='bg-zinc-600 w-full rounded-md my-4 py-2'>
                Login
            </button>

            </form>
        </div>
    )
}

export default LoginPage