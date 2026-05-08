import styled from "styled-components";

export const RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;
`;

export const RegisterForm = styled.form`
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    @media (max-width: 400px) {
        width: 100%;
    }
`;

export const RegisterTitle = styled.h2`
    margin-bottom: 1rem;
    color:#131313;
`;

export const RegisterInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
`;

export const RegisterButton = styled.button`
    width: 100%;
    height: 2.5rem;
    padding: 0.5rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;


export const LoginLink = styled.p`
    margin-top: 1rem;
    color:#333;
    a {
        color: #007bff;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 400px) {
            font-size: 0.9rem;
        }
    }

    @media (max-width: 400px) {
        font-size: 0.9rem;
    }
    
    @media (max-width: 300px) {
        font-size: 0.8rem;  
    }
    
`;

export const LoadingMessage = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    
    
    @media (max-width: 400px) {
        font-size: 0.9rem;
    }
    @media (max-width: 300px) {
        font-size: 0.8rem;
    }
`;

export const Label = styled.label`
    align-self: flex-start;
    margin-bottom: 0.25rem;
    font-weight: bold;
    color:#131313;
    @media (max-width: 400px) {
        font-size: 0.9rem;
    }
    @media (max-width: 300px) {
        font-size: 0.8rem;
    }
`;

export const InputGroup = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 400px) {
        width: 100%;
    }
`;

export const AuthCard = styled.div`
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    @media (max-width: 400px) {
        width: 100%;
    }
`;

export const AuthTitle = styled.h2`
    margin-bottom: 1rem;
    @media (max-width: 400px) {
        font-size: 1.5rem;
    }
    @media (max-width: 300px) {
        font-size: 1.2rem;
    }
`;

export const AuthButton = styled.button`
    width: 100%;
    padding: 0.5rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;    
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
    @media (max-width: 400px) {
        font-size: 0.9rem;
    }
    @media (max-width: 300px) {
        font-size: 0.8rem;
    }
`;


