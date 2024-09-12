import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Hero from "./pages/Hero";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <div className='bg-main min-h-screen text-white'>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
