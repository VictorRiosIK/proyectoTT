import { createContext, useContext, useState, useEffect } from "react";
import {registerRequest, loginRequest, verifyTokenRequest} from '../api/auth.js'
import {getHorariosRequest,agendarCitaRequest} from '../api/citas.js'
import Cookies from 'js-cookie'


export const AuthContext = createContext();


export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth deberia estar en un AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) =>{
    //Usuario
    const [user, setUser]= useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    //Citas
    const [horariosSelect, setHorariosSelect] = useState([]);


    const setLocalStorage = value => {
        try {
            if(value === null){
                window.localStorage.clear()
                return;
            }    

            setUser(value);
            window.localStorage.setItem("user",JSON.stringify(value));
            
        } catch (error) {
            console.log(error)
        }
    }

    //SIGNUP Estudiante
    const signupEstudiante = async(name, boleta, email, password, rol) =>{
        try{
            const res = await registerRequest(name, boleta, email, password, rol);
            console.log(res.data);
            setUser(res.data);
            console.log(user)
            setLocalStorage(res.data);
            setIsAuthenticated(true);
             //TIEMPO DE EXPIRACION EN x MINUTOS
             const x = 60;
             let inXMinutes = new Date(new Date().getTime() + x * 60 * 1000);

             //Crea el token en el dominio actual para que sea posible acceder a otras paginas
             Cookies.set('token',res.data.token, { expires: inXMinutes })
             const cookies = Cookies.get();
             //console.log(cookies);
        }catch(error){
            setErrors(error.response);
        }
    }

    const signinEstudiante = async(email, password) =>{
        //return new Promise(async(resolve,reject)=>{
            try{
                //Envia una peticion a back para verificar el ususario
                const res = await loginRequest(email, password);
                console.log(res.data);
                //Autentica al usuario
                setIsAuthenticated(true);
                //Guarda los datos del usuario en user
                setUser(res.data);
                console.log(user);
                setLocalStorage(res.data);
                //console.log("Autenticado");
                //TIEMPO DE EXPIRACION EN x MINUTOS
                const x = 60;
                let inXMinutes = new Date(new Date().getTime() + x * 60 * 1000);

                //Crea el token en el dominio actual para que sea posible acceder a otras paginas
                Cookies.set('token',res.data.token, { expires: inXMinutes })
                const cookies = Cookies.get();
                //console.log(cookies);
                return true;
            }catch(error){
                console.log(error);
                if(Array.isArray(error.response.data)){
                    setErrors(error.response.data);
                }            
                else{
                    setErrors([error.response.data.message]);
                }
                return false;
            }
        //});
        
    }

    //Cerrar sesion
    const logout = ()=>{
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
        setLocalStorage(null)
    }
    
    //*********************  CITAS  *********************

    //GetHorariosCitas
    const getHorariosCitas = async(fecha) =>{
        try {
            const res = await getHorariosRequest(fecha);
            console.log(res.data.availableSlots);
            const horarios = [];
            const aux = res.data.availableSlots;
            aux.map(e=>{
                horarios.push(e.startTime+ ' - ' + e.endTime);
            })
            //console.log(horarios);
            setHorariosSelect(horarios);
            //console.log(horariosSelect);
        } catch (error) {
            
        }
    }

    //AgendarCita
    const agendarCitaDentista = async(fecha, horario, correo) =>{
        try {
            const res = await agendarCitaRequest(fecha, horario, correo);
            console.log(res);
        } catch (error) {
            
        }
    }


    //funcion para eliminar los mensajes pasados un tiempo
    //useEffect(() =>{
        // if(errors.length > 0){
        //    const timer = setTimeout(()=>{
        //         setErrors([])
        //     },5000);
        //     return () => clearTimeout(timer);
        // }
    //},[errors])

    //Cuando carge la aplicacion, comprobar que existe la cookie
    useEffect(() =>{
        async function checkLogin () {
            const cookies = Cookies.get();
            //console.log(cookies);
            if(!cookies.token){
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null)
            }else{
                 
                setIsAuthenticated(true);
                //setUser(res.data);
                setLoading(false);
            }

            // try{
            //     console.log(cookies.token);
            //     const res = await verifyTokenRequest(cookies.token);
            //     console.log(res);
            //     if(!res.data){
            //         setIsAuthenticated(false);
            //         setLoading(false);
            //         return;
            //     }
                
            //     setIsAuthenticated(true);
            //     setUser(res.data);
            //     setLoading(false);
            // }catch(error){
            //     console.log(error)
            //     setIsAuthenticated(false);
            //     setUser(null);
            //     setLoading(false);
            // }   
        }
        checkLogin();
    },[])

    return (
        <AuthContext.Provider value={{
            signupEstudiante,
            signinEstudiante,
            logout,
            getHorariosCitas,
            agendarCitaDentista,
            loading,
            user,
            isAuthenticated,
            horariosSelect,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}