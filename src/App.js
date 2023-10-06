import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './routes/Home';

import Login from './routes/Login';
import Signup from './routes/Signup';
// import Admin from './routes/Admin';
import Dashboard from './routes/Dashboard';
import Patient from './routes/Patient';
import Doctor from './routes/Doctor';
import AllPatients from './routes/AllPatients';
import AllDoctors from './routes/AllDoctors';
import Packages from './routes/Packages';
import FormPackage from './routes/FormPackage';
import EditPackage from './routes/EditPackage';
import EditPatients from './routes/EditPatients';
import DashboardDetails from './routes/DashboardDetails';
import EditDoctors from './routes/EditDoctors';

function App() {

  const authToken = localStorage.getItem('authToken');
  console.log(authToken);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Enrollment" element={<Dashboard />} />
        <Route path="/Patient" element={<Patient />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/AllPatients" element={<AllPatients />} />
        <Route path="/AllDoctors" element={<AllDoctors />} />
        <Route path="/Packages" element={<Packages />} />
        <Route path="/Form" element={<FormPackage/>} />
        <Route path="/EditPackage" element={<EditPackage/>} />
        <Route path="/EditPatients" element={<EditPatients/>} />
        <Route path="/EditDoctors" element={<EditDoctors/>} />
        <Route path="/DashboardDetails" element={<DashboardDetails/>} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        draggable
      />
    </Router>
  );
}

export default App;
