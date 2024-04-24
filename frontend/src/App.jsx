import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import HomePage from './pages/homePage.jsx'
import ProfilePage from './pages/profilePage.jsx'
import RegisterPage from './pages/registerPage'
import LoginPage from './pages/loginPage'
import Navbar from './components/Navbar.jsx'
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  
  return (
    <div>
       <AuthProvider>
        <BrowserRouter>
          <Navbar></Navbar>
          <div className="px-4">
          <Routes>
              {/* Rutas publicas */}
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/register' element={<RegisterPage/>}></Route>

              {/* Rutas privadas */}
            <Route element={<ProtectedRoute/>}>
              <Route path='/profile' element={<ProfilePage/>}></Route>
            </Route>
          </Routes>  
          </div>
          <div className="d-flex w-100">
            <Footer></Footer> 
          </div>
          
        </BrowserRouter>
       </AuthProvider>
       
      
    </div>  
  );
}

export default App;
