import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {
  RegisterContainer,
  RegisterForm,
  RegisterTitle,
  RegisterInput,
  RegisterButton,
  LoginLink,
  Label,
  InputGroup,
} from "./styledComponents";
import toast from "react-hot-toast"

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password dosen't match. please try again");
      return;
    }

    
    setLoading(true);

    try {
      const url = 'https://event.backendportfolio.xyz/api/auth/register';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        toast.error(data.message || "Registration Failed");
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
     
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    // only redirect if already logged in
    if (token) {
      navigate('/events');
    }
  }, [navigate]);

  return (
    <RegisterContainer>
      <InputGroup>
        <RegisterForm onSubmit={handleSubmit}>
          <RegisterTitle>Create account</RegisterTitle>

          <Label htmlFor="username">Name</Label>
          <RegisterInput
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />

          <Label htmlFor="email">Email</Label>
          <RegisterInput
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <Label htmlFor="password">Password</Label>
          <RegisterInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <RegisterInput
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            required
          />

          <RegisterButton type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </RegisterButton>

          <LoginLink>
            Already have an account? <Link to="/login">Log in</Link>
          </LoginLink>
        </RegisterForm>
      </InputGroup>
    </RegisterContainer>
  );
};

export default Register;