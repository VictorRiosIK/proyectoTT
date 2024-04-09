import { useAuth } from "./context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"


//Componente que permite redireccional al login 
//a los usuarios que no se han logeado
function ProtectedRoute() {

    const {loading, isAuthenticated} = useAuth();
    //console.log(loading, isAuthenticated);
    if(loading){
      return <h1>Loading...</h1>
    }
    if(!loading && !isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    
  return <Outlet />;
}

export default ProtectedRoute
