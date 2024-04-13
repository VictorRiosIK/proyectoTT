import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/registerPage'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage.jsx'
import TasksPage from './pages/tasksPage.jsx'
import TaskFormpage from './pages/taskFormPage.jsx'
import ProfilePage from './pages/profilePage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './ProtectedRoute'
import { TaskProvider } from './context/TasksContext.jsx'
import Navbar from './components/Navbar.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Footer from './components/footer.jsx'

function App() {
  return (
    <div >
      <AuthProvider>
        <TaskProvider>
        <BrowserRouter>
        <Navbar></Navbar>
            <div className='px-10'>
            <Routes>
              {/* Rutas publicas */}
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/register' element={<RegisterPage/>}></Route>

              {/* Rutas privadas */}
            <Route element={<ProtectedRoute/>}>
              <Route path='/tasks' element={<TasksPage/>}></Route>
              <Route path='/tasks/new' element={<TaskFormpage/>}></Route>
              <Route path='/tasks/:id' element={<TaskFormpage/>}></Route>
              <Route path='/profile' element={<ProfilePage/>}></Route>
            </Route>
            
            </Routes>
            </div>
          <Footer></Footer>
        </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </div>  
  )
}

export default App


// import { useState } from "react";
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from 'axios'

// function App() {
//   const [name, setName] = useState()
//   const [email, setEmail] = useState()
//   const [password, setPassword] = useState()
// axios.defaults.withCredentials = true;
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('https://proyecto-tt-api.vercel.app/register', {name, email, password})
//     .then(result => console.log(result))
//     .catch(err => console.log(err))
//   }
//   return (
//     <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
//       <div className="bg-white p-3 rounded w-25">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Name</strong>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Name"
//               autoComplete="off"
//               name="email"
//               className="form-control rounded-0"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               autoComplete="off"
//               name="email"
//               className="form-control rounded-0"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               name="password"
//               className="form-control rounded-0"
//               onChange={(e) => setPassword(e.target.value)}          
//             />
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">
//             Register
//           </button>
//           <p>Already Have an Account</p>
//           <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;