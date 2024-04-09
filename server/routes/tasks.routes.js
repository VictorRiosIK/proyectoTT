import {Router} from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import {
    getTasks,
    getTask,
    createTask, 
    deleteTask, 
    updateTask
} from '../controllers/tasks.controller.js'
import {createTaskSchema} from '../schemas/task.schema.js'
import { validateSchema } from '../middlewares/validatorMiddleware.js';



const router = Router();
//authRequired valida el token de quien esta haciendop la peticion
//Obtener notas
router.get('/tasks', authRequired,getTasks);
//Obtener nota
router.get('/tasks/:id', authRequired,getTask);
//Crear nota
router.post('/tasks', authRequired,validateSchema(createTaskSchema),createTask);
//Eliminar nota
router.delete('/tasks/:id', authRequired,deleteTask);
//Editar nota
router.put('/tasks/:id', authRequired,updateTask);




export default router