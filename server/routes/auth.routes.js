import { Router } from "express";
import {login, register,logout,profile, verifyToken} from '../controllers/auth.controller.js'
import {authRequired} from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validatorMiddleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router();
//http://localhost:3001/api/register
router.post('/register',validateSchema(registerSchema),register);

//http://localhost:3001/api/login
router.post('/login', validateSchema(loginSchema), login);

//http://localhost:3001/api/logout
router.post('/logout', logout);

//http://localhost:3001/api/auth/verify
router.get('/verify', verifyToken);

//http://localhost:3001/api/profile
//Para proteger las rutas solo hay que colocar la funcion authRequired antes de su funcion principal
router.get('/profile', authRequired, profile);


export default router