import { createContext, useContext, useState } from "react";
import {createTaskRequest, getTasksRequest} from '../api/tasks.js'

const TaskContext = createContext();

export const useTasks = () =>{
    const context = useContext(TaskContext);

    if(!context){
        throw new Error("useTasks debe ser usado con un TaskProvider");
    }
    return context;

}
export function TaskProvider ({children}){

    const [tasks,setTasks] = useState([]);


    const getTasks = async () =>{
        try{
            const res = await getTasksRequest();
            console.log(res);
            setTasks(res.data)
        }catch(err){
            console.log(err)
        }
    }


    const createTask = async(task)=>{
        const res = await createTaskRequest(task);
        console.log(res);
    }


    return(
        //Exporta el valor de las tareas
        <TaskContext.Provider 
        value={{
            tasks,
            createTask,
            getTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}
