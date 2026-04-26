import {useState,useEffect} from "react";
import {
    LoginContainer,
    LoginForm,
    Input,
    Button,
    ToggleText,
    Message,
    Label
} from "./styledComponents";
import { persistUserFromToken } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";


const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();
        setApiStatus(apiStatusConstants.inProgress);
        try {
            const url = 'https://backend.vamsimarripudi.tech/api/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                localStorage.setItem('token', data.jwtToken);
                persistUserFromToken()
                setApiStatus(apiStatusConstants.success);
                navigate('/events');
            } else {
                throw new Error(data.message || 'Login failed');
            }

        }
        catch (err) {
            setApiStatus(apiStatusConstants.failure);
        }

    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/events');
    }, [navigate]);


    const renderUsernameInput = () => (
        
        <Input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder=" "
            required
        />
    );
    const renderPasswordInput = () => (
        
        <Input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder=" "
            required
        />
    );


    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <h2>Welcome back</h2>
                <div className="input-group">
                    <Label htmlFor="email">Email</Label>
                    {renderUsernameInput()}
                    
                </div>  
                <div className="input-group">
                    <Label htmlFor="password">Password</Label>
                    {renderPasswordInput()}
                    
                </div>
                <Button type="submit" className="primary-btn">
                    Login
                </Button>
            </LoginForm>
            <ToggleText>
                Don't have an account? <Link to="/register">Register</Link>
            </ToggleText>
            {apiStatus === apiStatusConstants.failure && <Message className="error">Login failed. Please try again.</Message>}
            {apiStatus === apiStatusConstants.success && <Message className="success">Login successful! Redirecting...</Message>}
        </LoginContainer>
    );


}


export default Login;