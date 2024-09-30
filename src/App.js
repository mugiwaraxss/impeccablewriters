// src/App.js
import React from 'react';
import './styles/index.css';  // Corrected import path
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AllServices from './pages/AllServices';  // Import the services page
import SamplesPage from './pages/SamplesPage';  // Import the samples page
import LoginSignup from './pages/SignUpLogin';  // Import the login/signup page
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/samples" element={<SamplesPage />} />
          <Route path="/login" element={<LoginSignup />} />  {/* New login/signup route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
