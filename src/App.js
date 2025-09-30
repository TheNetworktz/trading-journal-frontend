// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GroupPage from './pages/GroupPage';
import TraderPage from './pages/TraderPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        {/* Routes will render the FIRST path that matches the URL */}
        <Routes>
          {/* Path for the specific trader page. */}
          <Route 
            path="/groups/:groupId/traders/:traderId" 
            element={<TraderPage />} 
          />
          
          {/* Path for the group page. */}
          <Route 
            path="/groups/:groupId" 
            element={<GroupPage />} 
          />
          
          {/* Path for the homepage. This MUST be last. */}
          <Route 
            path="/" 
            element={<HomePage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
