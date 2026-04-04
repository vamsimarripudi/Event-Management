import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      setShowMessage(true);
      navigate('/events');
    } catch (err) {
      setError(err.message);
      setShowMessage(true);
    }
  }
  


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="primary-btn">
            Log in
          </button>
        </form>
        <p className="toggle-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        {showMessage && <p className={`message ${error ? 'error' : 'success'}`}>{error || "Login successful!"}</p>}
      </div>
    </div>
  );
};

export default Login;
