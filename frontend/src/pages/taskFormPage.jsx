import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TasksContext';
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from 'react';


function taskFormPage() {
    const {register, handleSubmit, setValue} = useForm();//react-hook-form doc

    const {createTask,tasks, getTask, updateTask} = useTasks()
    const navigate = useNavigate();
    const params = useParams();
    // console.log(tasks,"Tareas");
    // console.log(createTask(1));

  useEffect(()=>{
    //console.log(params);
    async function loadTask() {
      if(params.id){
        const task = await getTask(params.id);
        //console.log(task)
        setValue('title',task.title);
        setValue('description',task.description);
      }
    }
    loadTask();
  },[])


    const onSubmit = handleSubmit((data) =>{
        if(params.id){
          updateTask(params.id, data)
        }else{
          createTask(data);
        }
        navigate('/tasks');
    })
  return (
    <div className='grid md:grid-cols-7 sm:grid-cols-3 w-full container-md self-center  '>
      <div className='md:col-start-3 col-span-3 bg-[--GUINDA-PRIMARIO] p-10 rounded-md gap-4'>
      <h1>Nueva tarea</h1>
        <form onSubmit={onSubmit}>
          <input {...register("title")}//Debe ser igual que el modelo del servidor para no tener errores en la peticion
          className='w-full bg-[--GUINDA-SECUNDARIO] text-white px-4 py-2 rounded-md my-2'
          type="text"  placeholder="Titulo" 
          autoFocus/>

          <textarea {...register("description")}
          className='w-full bg-[--GUINDA-SECUNDARIO] text-white px-4 py-2 rounded-md my-2'
          rows="3" placeholder="Descripcion"></textarea>

          <button className='bg-cyan-600 w-full rounded-md my-4 py-2'
           type="submit">Guardar</button>
        </form>
      </div>
    </div>
    
  )
}

export default taskFormPage
