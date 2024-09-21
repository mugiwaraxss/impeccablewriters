// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';  // Import Tailwind styles
import './styles/index.css';     // Import your custom styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);