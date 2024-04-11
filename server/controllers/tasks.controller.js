import Task from '../models/task.model.js'
//Obtiene las tareas que ha creado solo el ususario que esta logeado
export const getTasks = async (req,res)=>{
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user');//Concatena la informacion de la task con la del ususario para mostrarla en al respuesta
        res.json(tasks);
    } catch (error) {
         //console.log(err);
     return res.status(500).json(
        {message:"Algo esta mal"}
    )
    }
}
//Crea nota
export const createTask = async (req,res)=>{
  try {
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
  } catch (error) {
     //console.log(err);
     return res.status(500).json(
        {message:"Algo esta mal"}
    )
  }
}

export const getTask = async (req,res)=>{
   try{
    const task = await Task.findById(req.params.id)
    .populate('user');
    if(!task)
     return res.status(404).json({
         message: "Task not found"
     });
 
     res.json(task);
   }catch(err){
    //console.log(err);
    return res.status(404).json(
        {message:"Task not found"}
    )
   }
}

export const deleteTask = async (req,res)=>{
   try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task){
        return res.status(404).json({
            message: "Task not found"
        })
    }
     return res.sendStatus(204);
   } catch (error) {
    //console.log(err);
    return res.status(404).json(
        {message:"Task not found"}
    )
   }

}

export const updateTask = async (req,res)=>{
   try {
    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    });
    if(!task)
     return res.status(404).json({
        message: "Task not found"
    });
 
     res.json(task);
   } catch (error) {
    //console.log(err);
    return res.status(404).json(
        {message:"Task not found"}
    )
   }
}

