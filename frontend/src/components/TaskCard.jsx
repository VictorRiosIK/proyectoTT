//Componente para mostrar los datos de una tarea

import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";

function TaskCard({task}) {
    const {deleteTask} = useTasks();


  return (
    <div className="col-span-1 bg-[--GUINDA-PRIMARIO]  w-full p-10 rounded-md">
        <header className="flex justify-between">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <div className="flex gap-x-2 items-center">
                <button onClick={()=>{
                    deleteTask(task._id);
                }}>Eliminar</button>
                <Link to={`/tasks/${task._id}`}>Editar</Link>
            </div>
        </header>
        <p className="text-slate-300">{task.description}</p>
        <p>{new Date(task.date).toLocaleDateString()}</p>
    </div>
  )
}

export default TaskCard
