import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error:'Usuario requerido'
    }),
    email: z.string({
        required_error: 'Email requerido'
    }).email({
        message:'Email invalido'
    }),
    password: z.string({
        required_error: 'Contraseña requerida'
    }).min(6,{
        message: 'Contraseña con minimo 6 caracteres'
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error:'Email requerido'
    }).email({
        message:'Email invalido'
    }),
    password: z.string({
        required_error: 'Contraseña requerida'
    }).min(6,{
        message: 'Contraseña con minimo 6 caracteres'
    })
});