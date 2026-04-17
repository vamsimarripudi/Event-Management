import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;
`;

export const LoginForm = styled.form`
  background-color: #fff;
    padding: 2rem;  
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
`;

export const Input = styled.input`
  width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 0.75rem;
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

export const ToggleText = styled.p`
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #555;
    a {
        color: #007bff;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

export const Message = styled.p`
    margin-top: 1rem;
    font-size: 0.9rem;
    color: ${props => (props.error ? 'red' : 'green')};
`;  

export const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #333;
`;
