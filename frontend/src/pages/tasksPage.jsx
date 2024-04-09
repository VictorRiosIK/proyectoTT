//rfce
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import { useTasks } from "../context/TasksContext";

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
    <div>
      <h1>Tareas</h1>
      <br />
      {
        

        tasks.map(task =>(
          <div key={task._id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </div>
        ))
      }
    </div>
  )
}

export default tasksPage
