import {useState,useEffect} from "react";
import {Eye,EyeOff} from "lucide-react";
import {
    LoginContainer,
    LoginButton,
    LoginCard,
    LoginFooter,
    LoginForm,
    LoginHeader,
    LoginSubtitle,
    LoginTitle,
    LoginWrapper,
    PasswordWrapper,
    ForgotPassword,
    PasswordToggle,
    FormInput,
    FormGroup,
    FormLabel,
    BackgroundDecorationBottom,
    BackgroundDecorationTop,
} from "./styledComponents";
import { persistUserFromToken } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword,setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();
        
        try {
            const url = 'https://event.backendportfolio.xyz/api/auth/login';
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
               
                navigate('/events');
            } else {
                throw new Error(data.message || 'Login failed');
            }

        }
        catch (err) {
           console.log(err.message)
        }

    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/events');
    }, [navigate]);


    const renderUsernameInput = () => (
        
        <FormInput
            type="email"
            id="email"
            value={email}
            
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
        />
    );
    
    return (
       <LoginContainer>
      <BackgroundDecorationTop />
      <BackgroundDecorationBottom />

      <LoginWrapper>
        <LoginCard>
          <LoginHeader>
            <LoginTitle>Welcome back</LoginTitle>
            <LoginSubtitle>Please enter your credentials to sign in</LoginSubtitle>
          </LoginHeader>

          <LoginForm onSubmit={handleSubmit}>

            <FormGroup>
              <FormLabel>Email</FormLabel>
              {renderUsernameInput()}
            </FormGroup>

            <FormGroup>
              <FormLabel>Password</FormLabel>
              <PasswordWrapper>
                <FormInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  style={{ paddingRight: '3rem' }}
                  onChange={e  => setPassword(e.target.value)}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </PasswordToggle>
              </PasswordWrapper>
            </FormGroup>

            <ForgotPassword>
              <Link to="/forgot-password" style={{textDecoration:"none"}}>
              Forgot Passoword
              </Link>
            </ForgotPassword>

            <LoginButton type="submit">
              Login
            </LoginButton>
          </LoginForm>

          <LoginFooter>
           
            <p>
              Don't have an account? 
              <Link to="/register" style={{textDecoration:"none"}}>
              Register
              </Link>
            </p>
            
          </LoginFooter>
            
        </LoginCard>
      </LoginWrapper>
    </LoginContainer>
    );


}


export default Login;