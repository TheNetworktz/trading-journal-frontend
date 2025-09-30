// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Must import from 'react-dom/client'
import './index.css';
import App from './App'; // This MUST import App.js, our router

// 1. Get the root DOM element
const rootElement = document.getElementById('root');

// 2. Create a root.
const root = ReactDOM.createRoot(rootElement);

// 3. Render our main App component (the router) into the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
