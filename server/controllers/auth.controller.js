import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {createAccesToken} from '../libs/jwt.js'

export const register = async (req,res) =>{
    //Recibe parametros
    const {email,password,username} = req.body;

    try{

        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(["Email already exists"])
        //Encripta contraseña
        const passwordHash = await bcrypt.hash(password,10);
        //Crea el modelo del usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });
        //Guarda al usuario
        const userSaved = await newUser.save();
        //Crea un token
        const token = await createAccesToken({id:userSaved._id});
        //Guarda el token en una cookie
        res.cookie('token',token);
        //responde con lso datos del usuario
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    }catch (error){
        res.status(500).json({message: error.message})
    }
}
export const login = async(req,res) =>{
    //Recibe datos
    const {email,password} = req.body;

    try{
        //Busca si el usuario con ese correo existe
        const userFound = await User.findOne({email});
        if(!userFound){
            return res.status(400).json({message: "User not found"});
        }

        //Compara las contraseñas ingresadas con la de la base de datos
        const isMatch = await bcrypt.compare(password,userFound.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect password"});
        }
        const token = await createAccesToken({id: userFound._id})

        res.cookie('token',token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

export const logout = (req,res) =>{
    res.cookie('token',"",{
        expires: new Date(0)
    });
    return res.sendStatus(200)
}

export const profile = async(req,res)=>{
    const userFound = await User.findById(req.user.id);
    if(!userFound){
        return res.status(400).json({
            message: "User not found"
        })
    }
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}