import styled from "styled-components"

export  const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eff6ff 0%, #eef2ff 50%, #faf5ff 100%);
`;

export  const BackgroundDecorationTop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, rgba(147, 197, 253, 0.4) 0%, rgba(196, 181, 253, 0.4) 100%);
  border-radius: 50%;
  filter: blur(80px);
`;

export  const BackgroundDecorationBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 400px;
  height: 400px;
  background: linear-gradient(45deg, rgba(165, 180, 252, 0.4) 0%, rgba(251, 207, 232, 0.4) 100%);
  border-radius: 50%;
  filter: blur(80px);
`;

export  const LoginWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 28rem;
  margin: 0 1rem;
`;

export  const LoginCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 2rem;
  border: 1px solid #f3f4f6;
`;

export  const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export  const LoginTitle = styled.h1`
  font-size: 1.875rem;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export  const LoginSubtitle = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
`;

export  const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export  const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export  const FormLabel = styled.label`
  font-size: 0.875rem;
  color: #374151;
`;

export  const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  color: #111827;
  font-size: 1rem;
  transition: all 0.2s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export  const PasswordWrapper = styled.div`
  position: relative;
`;

export  const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;

  &:hover {
    color: #4b5563;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export  const ForgotPassword = styled.div`
  display: flex;
  justify-content: flex-end;

  a {
    font-size: 0.875rem;
    color: #2563eb;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #1d4ed8;
    }
  }
`;

export  const LoginButton = styled.button`
  width: 100%;
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #1d4ed8;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export  const LoginFooter = styled.div`
  margin-top: 1.5rem;
  text-align: center;

  p {
    color: #4b5563;
    font-size: 0.875rem;
  }

  a {
    color: #2563eb;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #1d4ed8;
    }
  }
`;
