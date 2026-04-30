import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f7fa;
`;

export const Card = styled.div`
  width: 340px;
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #111;
  }
`;

export const Button = styled.button`
  background: #111;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #333;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SuccessContainer = styled.div`
  text-align: center;
`;

export const FailureContainer = styled.div`
  text-align: center;
`;

export const Heading = styled.h2`
  margin-top: 10px;
`;

export const Message = styled.p`
  color: #555;
  font-size: 14px;
`;

export const RetryButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  background: red;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: darkred;
  }
`;