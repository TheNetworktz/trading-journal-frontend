// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Trading Journal</Link>
    </nav>
  );
}

export default Navbar;
