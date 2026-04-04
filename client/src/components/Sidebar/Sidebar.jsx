import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Eventify</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard" className="sidebar-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/events" className="sidebar-link">
            Events
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;