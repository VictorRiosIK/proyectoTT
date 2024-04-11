//rfce
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

function tasksPage() {

  //Datos del usuario conectado disponibles
  const {getTasks,tasks} = useTasks();

  useEffect(()=>{
    getTasks();
  },[]);

  if(tasks.length === 0){
    return (<h1>No hay tareas</h1> )
  }
  return (
    <div >
      <h1>Tareas</h1>
      <br />

      <div className="grid grid-cols-3 gap-4">
      {
        tasks.map(task =>(
            <TaskCard task={task} key={task._id}/>
         //Se muestra el componente enviando los datos de cada tarea
        ))
      }
      </div>
    </div>
  )
}

export default tasksPage
