import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import Forgot from './pages/auth/Forgot';
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true; //Anytime a request is made with axios we can save credentials


function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route path="/forgot" element={<Forgot />} />

        <Route path="/dashboard" element={
          <Sidebar>
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
