// src/App.js
import React from 'react';
import './styles/index.css';  // Corrected import path
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AllServices from './pages/AllServices';  // Import the new services page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<AllServices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
