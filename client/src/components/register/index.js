import {useState,useEffect} from 'react';

import {useNavigate} from 'react-router-dom';
import {
    RegisterContainer,
    RegisterForm,
    RegisterTitle,
    RegisterInput,  
    RegisterButton,
    ErrorMessage,
    SuccessMessage,
    LoginLink,
    
    Label,
    InputGroup,
    

} from "./styledComponents";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const url = 'https://backend.vamsimarripudi.tech/api/auth/register';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name:name,  email: email, password }),
            });
            const data = await response.json();
            if (data.token) {
                setSuccess('Registration successful. You can now log in.');
                navigate('/login');
                setError('');
            } else {
                setError(data.message || 'Registration failed.');
                setSuccess('');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/events');
    }
    , [navigate]);

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
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter name"
                    required
                />
                <Label htmlFor="username">Email</Label>
                <RegisterInput
                    type="text"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                />
            <Label htmlFor="password">Password</Label>
             
                <RegisterInput
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                />
            <Label htmlFor="confirmPassword">Confirm Password</Label>
                <RegisterInput
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                />
                
                <RegisterButton type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </RegisterButton>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
                <LoginLink>
                    Already have an account? <a href="/login">Log in</a>
                </LoginLink>
            </RegisterForm>
            </InputGroup>
        </RegisterContainer>
    );
}

export default Register;

