import Task from '../models/task.model.js'
//Obtiene las tareas que ha creado solo el ususario que esta logeado
export const getTasks = async (req,res)=>{
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user');//Concatena la informacion de la task con la del ususario para mostrarla en al respuesta
    res.json(tasks);
}
//Crea nota
export const createTask = async (req,res)=>{
    //Obtiene los datos de la peticion
    const {title, description, date} = req.body;
    //Crea la nueva nota
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    });
    //Envia la peticion a la BD
    const savedTask = await newTask.save();
    res.json(savedTask);
}

export const getTask = async (req,res)=>{
   const task = await Task.findById(req.params.id)
   .populate('user');
   if(!task)
    return res.status(404).json({
        message: "Task not found"
    });

    res.json(task);
}

export const deleteTask = async (req,res)=>{
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task){
        return res.status(404).json({
            message: "Task not found"
        })
    }
     return res.sendStatus(200);

}

export const updateTask = async (req,res)=>{
    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    });
    if(!task)
     return res.status(404).json({
        message: "Task not found"
    });
 
     res.json(task);
}

