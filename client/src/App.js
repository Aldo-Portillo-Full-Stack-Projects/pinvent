import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import Forgot from './pages/auth/Forgot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
