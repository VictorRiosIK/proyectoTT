import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
       await mongoose.connect('mongodb+srv://vrios718:s1FPobKWDOAjPH6c@cluster0.696magv.mongodb.net/test?retryWrites=true&w=majority');
       console.log("DB CONNECTED");
    }catch(error){
        console.log(error);
    }
}