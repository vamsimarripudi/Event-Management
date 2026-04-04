import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard" className="navbar-logo">
          Eventify
        </Link>
      </div>
      <ul className="navbar-links">
        
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        
      </ul>
      <button className="navbar-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
