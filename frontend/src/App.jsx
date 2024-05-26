import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import HomePage from './pages/homePage.jsx'
import ProfilePage from './pages/profilePage.jsx'
import AgendarOdontologo from "./pages/agendarOdontologo.jsx";
import AgendarOrientacion from "./pages/agendarOrientacion.jsx";
import MisCitasDentista from "./pages/misCitasDentista.jsx"
import MisCitasPsicologo from "./pages/misCitasPsicologo.jsx"
import AllCitasProfesional from "./pages/allCitasProfesional.jsx";
import DetallesCitaPro from "./pages/detallesCitaPro.jsx";
import CuestionarioPPage from "./pages/cuestionarioPPage.jsx";
import Recordatorio from "./pages/recordatorio.jsx";
import RegisterPage from './pages/registerPage'
import RegisterProPage from "./pages/registerProPage.jsx";
import CambiarContra from "./pages/cambiarContra.jsx";
import LoginPage from './pages/loginPage'
import Navbar from './components/Navbar.jsx'
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Verificacion from "./pages/verificacion.jsx";
import RecuperarCon from "./pages/recuperarCon.jsx";
import EnviarRecuperacion from "./pages/enviarRecuperacion.jsx";


function App() {

  return (
    <div className="abel-regular">
      <AuthProvider>
        <BrowserRouter>
          <Navbar></Navbar>
          <div className="px-4">
            <Routes>
              {/* Rutas publicas */}
              <Route path='/' element={<HomePage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/register' element={<RegisterPage />}></Route>
              <Route path='/verificacion' element={<Verificacion />}></Route>
              <Route path='/recuperar/:token/:correo' element={<RecuperarCon/>}></Route>
              <Route path='/enviar' element={<EnviarRecuperacion/>}></Route>

              {/* Rutas privadas */}
              <Route element={<ProtectedRoute />}>
                <Route path='/agendar-dentista' element={<AgendarOdontologo />}></Route>
                <Route path='/agendar-dentista/:fecha/:horario' element={<AgendarOdontologo />}></Route>
                <Route path='/agendar-psicologo/' element={<AgendarOrientacion />}></Route>
                <Route path='/agendar-psicologo/:fecha/:horario' element={<AgendarOrientacion />}></Route>
                <Route path='/citas-dentista' element={<MisCitasDentista />}></Route>
                <Route path='/citas-psicologo' element={<MisCitasPsicologo />}></Route>
                <Route path='/all-citas' element={<AllCitasProfesional />}></Route>
                <Route path='/detalles-cita/:id/:horario/:fecha' element={<DetallesCitaPro />}></Route>
                <Route path='/recordatorio' element={<Recordatorio />}></Route>
                <Route path='/register-pro' element={<RegisterProPage />}></Route>
                <Route path='/cuestionario' element={<CuestionarioPPage />}></Route>
                <Route path='/cambiar-contrasena' element={<CambiarContra />}></Route>
                <Route path='/profile' element={<ProfilePage />}></Route>
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
