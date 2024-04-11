import { createContext, useContext, useState } from "react";
import {createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest} from '../api/tasks.js'


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

    const deleteTask = async(id)=>{
        try{
            const res = await deleteTaskRequest(id);
            //console.log(res)
            if(res.status === 204){
                setTasks(
                    tasks.filter(task =>
                        task._id !== id
                    )
                )
            }
        }catch(err){
            console.log(err);
        }
    }

    const getTask = async(id) =>{
       try {
        const res = await getTaskRequest(id)
        //console.log(res);
        return res.data;
       } catch (error) {
        console.log(error)
       }
    }

    const updateTask = async(id, task) =>{
        try {
            const res = await updateTaskRequest(id, task);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    return(
        //Exporta el valor de las tareas
        <TaskContext.Provider 
        value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}
