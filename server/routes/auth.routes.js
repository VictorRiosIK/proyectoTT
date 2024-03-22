import { Router } from "express";
import {login, register,logout,profile} from '../controllers/auth.controller.js'
import {authRequired} from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validatorMiddleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router();

router.post('/register',validateSchema(registerSchema),register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);
//Para proteger las rutas solo hay que colocar la funcion authRequired antes de su funcion principal
router.get('/profile', authRequired, profile);

export default router