import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TasksContext';

function taskFormPage() {
    const {register, handleSubmit} = useForm();//react-hook-form doc

    const {createTask,tasks} = useTasks()
    // console.log(tasks,"Tareas");
    // console.log(createTask(1));

    const onSubmit = handleSubmit((data) =>{
        createTask(data);
    })
  return (
    <div className='grid grid-cols-7 w-full container-md mt-[25vh]  '>
      <div className='col-start-3 col-span-3 bg-zinc-800 p-10 rounded-md gap-4'>
      <h1>Nueva tarea</h1>
        <form onSubmit={onSubmit}>
          <input {...register("title")}//Debe ser igual que el modelo del servidor para no tener errores en la peticion
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          type="text"  placeholder="Titulo" 
          autoFocus/>

          <textarea {...register("description")}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          rows="3" placeholder="Descripcion"></textarea>

          <button className='bg-zinc-600 w-full rounded-md my-4 py-2'
           type="submit">Guardar</button>
        </form>
      </div>
    </div>
    
  )
}

export default taskFormPage
