import styled from "styled-components";

/* ---------- Main Container ---------- */

export const ForgotPasswordContainer = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;

  background: ${({ theme }) => theme.bg};
`;

/* ---------- Form ---------- */

export const Form = styled.form`
  width: 100%;
  max-width: 380px;

  display: flex;
  flex-direction: column;

  padding: 24px;

  border-radius: 20px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  @media screen and (max-width: 480px) {
    padding: 20px;
  }
`;

/* ---------- Typography ---------- */

export const Heading = styled.h2`
  margin-bottom: 10px;

  color: ${({ theme }) => theme.text};

  font-size: 24px;
`;

export const Message = styled.p`
  margin-bottom: 18px;

  color: ${({ theme }) => theme.mutedText};

  font-size: 14px;
  line-height: 1.6;
`;

export const Label = styled.label`
  margin-bottom: 6px;

  color: ${({ theme }) => theme.text};

  font-size: 14px;
  font-weight: 500;
`;

/* ---------- Input ---------- */

export const Input = styled.input`
  width: 100%;

  padding: 12px 14px;

  margin-bottom: 16px;

  border-radius: 10px;

  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.bg};

  color: ${({ theme }) => theme.text};

  font-size: 14px;

  outline: none;

  transition: 0.2s ease;

  &:focus {
    border-color: #6366f1;
  }
`;

/* ---------- Buttons ---------- */

export const Button = styled.button`
  border: none;
  outline: none;

  cursor: pointer;

  padding: 12px;

  border-radius: 10px;

  background: #6366f1;

  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const RetryButton = styled.button`
  margin-top: 14px;

  border: none;
  outline: none;

  cursor: pointer;

  padding: 10px 14px;

  border-radius: 10px;

  background: #ef4444;

  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

/* ---------- States ---------- */

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 200px;
`;

export const SuccessContainer = styled.div`
  text-align: center;

  padding: 20px;
`;

export const FailureContainer = styled.div`
  text-align: center;

  padding: 20px;
`;